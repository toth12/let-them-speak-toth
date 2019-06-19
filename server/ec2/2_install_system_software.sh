#!/usr/bin/env bash
# 2_system_software.sh - Set up the environment further
#                        and install system dependencies

# Update the env
echo 'export MONGO_HOST="localhost"
export TOMCAT_HOST="localhost"
export TOMCAT_WEBAPPS="/var/lib/tomcat/webapps/"' >> ~/.bash_profile
# echo export LTS_AUTH_CODE="$(openssl rand -base64 32)" >> ~/.bash_profile
echo export LTS_AUTH_CODE=$(python -c "import random; print(''.join([str(random.randint(0,9)) for x in range(40)]) + '\n')") >> ~/.bash_profile

. ~/.bash_profile

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
sudo yum install -y tomcat tomcat-webapps
sudo service tomcat restart
# tomcat webapps in /var/lib/tomcat/webapps/

# install Mongo
# sudo vim  /etc/yum.repos.d/mongodb-org-4.0.repo
# paste:
echo "[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/amazon/2013.03/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc" | sudo tee /etc/yum.repos.d/mongodb-org-4.0.repo
# install
sudo yum install -y mongodb-org

# Done
echo "Now run: 
bash let-them-speak/server/ec2/3_start_app.sh
"