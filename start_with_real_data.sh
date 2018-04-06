#!/bin/bash

#start tomcat

bash /usr/local/tomcat/bin/catalina.sh start

#start mongo

mongod --fork --logpath /var/log/mongodb.log

#start ssh service

openrc boot

openrc -s sshd start

#seed the data
cd /lts-app/ && npm run build-db

#start the production
npm run production

#start bash
/bin/bash

#docker run -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_with_real_data.sh