#!/bin/bash


#set user password, this is a temporary solution

echo 'admin:hello' | chpasswd

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
#/bin/bash

#docker run -d -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_with_seed_data.sh

#debugging: run the following command and uncomment /bin/bash above

#docker run -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_with_seed_data.sh
