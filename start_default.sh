#!/bin/bash


#set user password, this is a temporary solution

echo 'admin:hello' | chpasswd


#chmod project directory

chmod -R 777 /lts-app/

#chmod tomcat webapps folder
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


/bin/bash



#docker run -v `pwd`:/lts-app/:rw -d -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_default.sh

#debugging: run the following command and uncomment /bin/bash above

#docker run -p 7082:7082 -p 8081:22 -p 8080:8080  -p 27017:27017 -it letthemspeak /etc/my_init.d/start_default.sh
