# Let Them Speak

> A database of Holocaust survivor testimonies.

## Dependencies

First you'll need to install the JDK-1.8+, Maven, Tomcat, and Node.js:

```bash
brew cask install java
brew install maven tomcat node
```

Then to install the app dependencies, you can run:

```bash
git clone https://github.com/YaleDHLab/let-them-speak
cd let-them-speak
npm install --no-optional
pip install -r requirements.txt
```

Next you'll need to clone and compile the BlackLab source:

```bash
# acquire and build source
git clone git://github.com/INL/BlackLab.git
cd BlackLab
# ensure maven was compiled with the JDK 1.8
mvn -v
# install BlackLab
mvn install
```

Finally, store the Tomcat webapps directory, the host addresses for both Mongo and Tomcat, and the production AWS credentials in your environment variables (update paths as necessary):

```bash
export MONGO_HOST="localhost"
export TOMCAT_HOST="localhost"
export TOMCAT_WEBAPPS="/usr/local/Cellar/tomcat/9.0.5/libexec/webapps/"
```

## Running the Server

Once the dependencies are settled, you can seed the db and start the server with:

```bash
npm run seed
npm run production
```

That will start the server on port 7082. To run the development server with hot module reloading, run:

```bash
npm run start
```

That will start the webpack dev server on port 7081. Note that you will need to have a BlackLab server running to generate the seed data or run text queries. See below for getting started with BlackLab.

## New docker usage

Pre-requesites: Install docker, awscli, and add credentials to ~/.aws/credentials

Then to fetch the production data, run:

```bash
npm run fetch-data
```

Now we're ready to build the app in Docker! In the root directory of this repo,
build the image with:

```bash
bash server/docker/2019/build-image.sh
```

Then you have to seed the database. This step will take a while! Copy production
server/inputs/ folder into the server folder in this repo and run:


```bash
bash server/docker/2019/build-container.sh
```

When that completes, Blacklab and the mongodb should be properly set up. You
should be able to browse to https://localhost:7082 to interactive with the app.

To stop and start the container without redoing the previous slow process, use

## Docker Usage - old - deprecated

THIS SECTION IS DEPRECATED AND WILL BE REMOVED. SEE ABOVE FOR CURRENT DOCKER USAGE.

Install Docker, then in the root directory, build the container with:

```bash
bash server/docker/build.sh
```

Once the container is built, you can seed the database and start the server with:

```bash
bash server/docker/run_with_seed_data.sh
```

If you have the production database credentials in your host's `~/.aws/credentials` file, you can start the app with production data by running:

```bash
bash server/docker/run_with_prod_data.sh
```

To ssh into container (see `chpasswd` line in ./Dockerfile), run:

```bash
bash server/docker/ssh.sh
```

To stop the container, run:

```bash
bash server/docker/stop.sh
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

## Tests

To run the Javascript tests (located in `src/tests/`), run:

```bash
npm run jest
```

To run the Python tests (located in `server/tests/`), run:

```bash
pytest
```

## Deploying to EC2 with Docker

Configure the AWS CLI

```bash
# install the CLI
pip install awscli --upgrade --user

# configure the CLI (provide production credentials when prompted)
aws configure
```

Install docker:

```bash
# install docker
sudo yum install docker -y

# start docker
sudo service docker start

# allow ec2-user to run docker
sudo usermod -a -G docker ec2-user
```

To apply the group changes, log out then log back in. Next, build the app:

```bash
# install dependencies
sudo yum install git -y

# get the app source
git clone https://github.com/YaleDHLab/let-them-speak

# start a screen to hold the server process
screen -S server

# cd into the app source
cd let-them-speak

# run the Docker commands above to build and start the container
```

Then, from another ssh session, detach your screen:

```
screen -D
```

## Deploying to EC2 without Docker

If Docker is using too much instance RAM, one can deploy to Amazon Linux without Docker with the following:

```
sudo yum install mlocate && sudo updatedb

# install Oracle JDK 1.8
wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" http://download.oracle.com/otn-pub/java/jdk/8u141-b15/336fa29ff2bb4ef291e347e091f7f4a7/jdk-8u141-linux-x64.rpm
sudo yum install -y jdk-8u141-linux-x64.rpm

# install OpenJDK
sudo yum install -y java-1.8.0-openjdk-devel
sudo yum remove java-1.7.0-openjdk
sudo wget http://repos.fedorapeople.org/repos/dchen/apache-maven/epel-apache-maven.repo -O /etc/yum.repos.d/epel-apache-maven.repo
sudo sed -i s/\$releasever/6/g /etc/yum.repos.d/epel-apache-maven.repo
sudo yum install -y apache-maven

# specify java version [/usr/java/jdk1.8.0_141/bin/java{c}]
sudo update-alternatives --config java
sudo update-alternatives --config javac

# install Tomcat
sudo yum install tomcat tomcat-webapps
sudo service tomcat restart
# tomcat webapps in /var/lib/tomcat/webapps/

# install Node
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 8.11.2

# install Mongo
sudo vim  /etc/yum.repos.d/mongodb-org-4.0.repo
# paste:
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
# install
sudo yum install -y mongodb-org

# start services
sudo service tomcat restart
sudo service mongod restart

# port forwarding
# forward requests to 80 to 7082
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 7082
```

Then clone, install dependencies, build bundle, and serve with gunicorn:

```
# clone the repo
sudo yum groupinstall "Development Tools"
git clone https://github.com/YaleDHLab/let-them-speak

# install Node dependencies
cd let-them-speak
npm i -g yarn
yarn install

# install Python dependencies
sudo easy_install pip
pip install -r requirements.txt --user

# build Blacklab
git clone git://github.com/INL/BlackLab.git && cd BlackLab
# ensure maven version is 1.8+
mvn -v
# install BlackLab
mvn install

# fetch production data
aws configure
sed -i -e 's/\[default\]/\[lab-secrets\]/g' ~/.aws/credentials
yarn fetch-data
yarn build-db
yarn build
yarn serve-gunicorn
```

**Important: src/config/client.js: ** this file needs to be modified when run
remotely, to contain the public IP address of the server in production. If
running on EC2, you can obtain this with the following command:

    curl http://169.254.169.254/latest/meta-data/public-ipv4

(Documentation on the AWS instance metadata server [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-data-retrieval).)

