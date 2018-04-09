#!/bin/bash




#chmod project directory

chmod -R 777 /lts-app/

#change ownership of project folder

chown -RP admin lts-app/

#chmod Tomcat web library

chmod -R 777 /usr/local/tomcat/webapps

#link blacklab to project folder

ln -s /home/admin/BlackLab /lts-app/

#start tomcat

bash /usr/local/tomcat/bin/catalina.sh start

#start mongo

mongod --fork --logpath /var/log/mongodb.log

#start ssh service

openrc boot

openrc -s sshd start

#create a python virtual environment

cd /lts-app/ && virtualenv env_lts

#install requirements

cd /lts-app/ && source env_lts/bin/activate  && ./env_lts/bin/pip install -r requirements.txt


#install npm requirements

cd /lts-app/ && source env_lts/bin/activate && npm install --no-optional && npm run build


#seed the data and start the server
cd /lts-app/ && source env_lts/bin/activate && npm run build-db && npm run production

#start bash 
/bin/bash

#normal start
#docker run `pwd`:/lts-app/:rw -d -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_with_real_data.sh

#debugging

#docker run `pwd`:/lts-app/:rw -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_with_real_data.sh

