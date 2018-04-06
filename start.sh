#!/bin/bash

#start tomcat

bash /usr/local/tomcat/bin/catalina.sh start

#start mongo

#mongod --fork --logpath /var/log/mongodb.log

#start ssh service

#touch /run/openrc/softlevel

#rc-update add sshd

#openrc -s sshd start

#/etc/init.d/sshd start

openrc boot

openrc -s sshd start

#start bash
/bin/bash