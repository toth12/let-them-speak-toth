# Let Them Speak

> A database of Holocaust survivor testimonies.

[![Build Status](https://travis-ci.org/YaleDHLab/let-them-speak.svg?branch=master)](https://travis-ci.org/YaleDHLab/let-them-speak)

## Dependencies

To install the app dependencies, you can run:

```bash
git clone https://github.com/YaleDHLab/let-them-speak
cd let-them-speak
npm install --no-optional
pip install -r requirements.txt
npm run seed
```

## Quickstart

Once the dependencies are installed, you can start the api with the following command:

```bash
npm run production
```

That will start the server on port 7082. To run the development server with hot module reloading, run:

```bash
npm run start
```

That will start the webpack dev server on port 7081.

## Working with BlackLab Indices

This application uses BlackLab for running searches against input documents. To use BlackLab, you'll need to create a BlackLab index then set up a web service to query the index.

### Building a Blacklab Index

To build a Blacklab index, you'll need to install maven and tomcat:

```
brew install maven tomcat
```

Then you'll need to clone and compile the BlackLab source:

```
# acquire and build source
git clone git://github.com/INL/BlackLab.git
cd Blacklab
mvn install
```

Next you'll need to convert your documents into the folia XML format [[sample folia files](https://gist.github.com/duhaime/15bfe72412bc9decc309c941d523957e)]. Place those files in `../inputs`, then run the following command to generate an index named `output-index`

```
java -cp "core/target/blacklab-1.6.0.jar:core/target/lib/*" \
nl.inl.blacklab.tools.IndexTool create ../output-index ../inputs/ folia
```

To test the generated index using BlackLab's built-in CLI, you can run:

```
java -cp core/target/blacklab-1.6.0.jar nl.inl.blacklab.tools.QueryTool \
../output-index/
```

### Configuring the Blacklab Server

To configure a Tomcat server to query your BlackLab index, you need to create a JSON file that identifies the name of your index and the path to the index file. The following JSON file names the generated index `output-index`, and it specifies the fully-qualified path to that index on the filesystem:

```
{
  "indices": {
    "output-index": {
      "dir": "/usr/local/Cellar/tomcat/9.0.5/libexec/webapps/output-index/"
    }
  }
}
```

That JSON file should be written to your Tomcat's `webapps` directory (which should be created when you install Tomcat). If you installed Tomcat with Homebrew, the path will be:

```
/usr/local/Cellar/tomcat/{{ TOMCAT_VERSION }}/libexec/webapps
```

Next copy the blacklab-server.war file from the BlackLab source to the Tomcat webapps directory:

```
cp BlackLab/server/target/blacklab-server-1.6.0.war \
/usr/local/Cellar/tomcat/{{ TOMCAT_VERSION }}/libexec/webapps/
```

Then you can restart the Tomcat server:

```
brew services restart tomcat
```

### Querying the Tomcat Server

By default Tomcat runs on 8080, and serves the content of its `webapps` directory. When you copied your `blacklab-server.war` file to the webapps directory, that process should have copied a directory with the same name as the .war file into the `webapps` directory. So your `webapps` directory should look something like this:


```
cd webapps && tree

.
├── ROOT
│   ├── RELEASE-NOTES.txt
│   └── ...
├── blacklab-server-1.6.0
│   ├── META-INF
│   └── WEB-INF
├── blacklab-server-1.6.0.war
├── blacklab-server.json
├── host-manager
│   ├── META-INF
│   └── ...
├── manager
│   ├── META-INF
│   └── ...
└── output-index
    ├── _0.cfe
    └── ...
```

Given that setup, you should be able to query BlackLab on the default Tomcat port:

```
curl http://localhost:8080/BlackLab-server-1.6.0/
```

In the returned output, you should see the name of the index you provided above in your `blacklab-server.json` file:

```
<blacklabResponse>
  <blacklabBuildTime>2018-01-20 20:19:56</blacklabBuildTime>
  <blacklabVersion>1.6.0</blacklabVersion>
  <indices>
    <index name="folia_index">
    ...
  </indices
</blacklabResponse>
```

If you see your index in there, you should be all set to run queries against the server, using [BlackLab's query syntax](http://inl.github.io/BlackLab/blacklab-server-overview.html#installation).

## Deployment on Amazon Linux

```
# update server
sudo yum udpdate -y

# get dev tools
sudo yum groupinstall "Development Tools" -y

##
# Mongo
##

# install mongo
sudo vim /etc/yum.repos.d/mongodb-org-3.6.repo

# paste the following
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/3.6/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-3.6.asc

# install mongo
sudo yum install -y mongodb-org -y

# start mongo
sudo service mongod start

##
# Install Node
##

# get nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# activate nvm
. ~/.nvm/nvm.sh

# install a recent node
nvm install 9.2.0

##
# Install Anaconda
##

# accept defaults when prompted
wget https://repo.continuum.io/archive/Anaconda3-5.1.0-Linux-x86_64.sh
bash Anaconda3-5.1.0-Linux-x86_64.sh

# ensure the following is in your bash profile
PATH=$PATH:$HOME/bin

# source the bash profile
source ~/.bash_profile

##
# Let Them Speak
##

# clone source
git clone https://github.com/YaleDHLab/let-them-speak

# install app deps
cd let-them-speak
npm install
sudo pip install -r requirements.txt --user

# seed the db
npm run seed

# set the deployment host in src/config/client.js
let config = {
  api: {
    protocol: 'http',
    host: '34.214.7.94',
    port: 80,
    prefix: 'api'
  },
};

# build source
npm run build

# make logs dir
mkdir logs

# start production server
sudo -s
gunicorn -b 0.0.0.0:80 server.app:app --access-logfile logs/access.log --error-logfile logs/err.log

# forward requests from 80 to 8000
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8000

# check iptable forwarding rules
iptables -t nat -L --line-numbers

# delete rules from PREROUTING if necessary
iptables -t nat -D PREROUTING 1
```

## Docker Usage

Install Docker and Docker Compose, then in the root directory, start the Mongo service and app with `docker-compose up`

## Tests

To run the Javascript tests (located in `src/tests/`), run:

```bash
npm run jest
```

To run the Python tests (located in `server/tests/`), run:

```bash
pytest
```

## Linting

To lint the Javascript files (located in `src`), run:

```bash
npm run lint-js
```

To lint the Python files (located in `server`), run:

```bash
npm run lint-py
```