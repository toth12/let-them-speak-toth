#!/usr/bin/env bash
# 3_start_app.sh - install app software, bootstrap with data, and serve

sudo service tomcat restart
sudo service mongod restart

# port forwarding
# forward requests to 80 to 7082
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 7082

###### PART 2 

# install Node dependencies
cd let-them-speak
npm i -g yarn
yarn install

# install Python dependencies
sudo easy_install pip
pip install -r requirements.txt --user

# build Blacklab
git clone git://github.com/INL/BlackLab.git --branch v1.7.3 && cd BlackLab
# ensure maven version is 1.8+
mvn -v
# install BlackLab
mvn install

# fetch production data
#aws configure
#sed -i -e 's/\[default\]/\[lab-secrets\]/g' ~/.aws/credentials
yarn fetch-data
yarn build-db
yarn build
yarn serve-gunicorn
