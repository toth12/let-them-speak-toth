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