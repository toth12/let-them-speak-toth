#!/bin/bash

#start tomcat

bash /usr/local/tomcat/bin/catalina.sh start

#start mongo

mongod --fork --logpath /var/log/mongodb.log

#start ssh service

openrc boot

openrc -s sshd start

#seed the data
cd /lts-app/ && npm run seed

#start the production
npm run production

#start bash
/bin/bash