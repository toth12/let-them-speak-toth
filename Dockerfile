# Specify base image
FROM node:8-alpine

# Specify author / maintainer
LABEL authors="Jake Kara <jake.kara@yale.edu>, Douglas Duhaime <douglas.duhaime@gmail.com>"

##
# Install admin tools
##

# coreutils: https://www.gnu.org/software/coreutils/manual/coreutils.html
RUN apk add --update --no-cache --upgrade vim \
  nano \
  curl \
  coreutils

##
# Install SSH
##

RUN apk add --update openssh

# configure user `root` with password `root`
RUN apk add --no-cache openssh \
  && sed -i s/#PermitRootLogin.*/PermitRootLogin\ yes/ /etc/ssh/sshd_config \
  && echo "root:root" | chpasswd

##
# Install Maven
##

RUN apk add --update --no-cache \
  wget \
  tar \
  git \
  openjdk8

ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

# Store the path to the maven home
ENV MAVEN_HOME=/usr/lib/maven

# Add maven and java to the path
ENV PATH=$MAVEN_HOME/bin:$JAVA_HOME/bin:$PATH

# Install Maven
RUN cd /tmp && \
  wget https://s3-us-west-2.amazonaws.com/lab-apps/let-them-speak/maven/apache-maven-3.3.9-bin.tar.gz -O - | tar xzf - && \
  mv /tmp/apache-maven-3.3.9 $MAVEN_HOME && \
  ln -s $MAVEN_HOME/bin/mvn /usr/bin/mvn && \
  rm -rf /tmp/*

##
# Install Mongo
##

# Add package repositories to container
RUN apk update && apk upgrade && \
  apk add \
    bash \
    g++ \
    gcc \
    make \
    boost-system \
    boost \
    mongodb \
    mongodb-tools \
    --no-cache && \
  rm -rf /var/cache/apk/*

RUN mkdir -p /data/db && \
  chown -R mongodb /data/db

##
# Install Tomcat
##

RUN apk add openjdk8 && \
  mkdir -p /tmp/tomcat && \
  cd /tmp/tomcat && \
  wget https://s3-us-west-2.amazonaws.com/lab-apps/let-them-speak/tomcat/apache-tomcat-8.5.30.tar.gz && \
  tar -zxf apache-tomcat-8.5.30.tar.gz && \
  mkdir -p /usr/local/tomcat && \
  mv apache-tomcat-8.5.30/* /usr/local/tomcat/ && \
  sh /usr/local/tomcat/bin/catalina.sh version

##
# Build Python + Node dependencies
##

ENV APP_PATH="/lts-app"
RUN mkdir "$APP_PATH"
WORKDIR "$APP_PATH"

# Store Mongo service name as mongo host
ENV MONGO_HOST=0.0.0.0
ENV TOMCAT_HOST=0.0.0.0
ENV TOMCAT_WEBAPPS=/usr/local/tomcat/webapps/

# Install system deps with Alpine Linux package manager
RUN apk add --update --no-cache --upgrade \
  g++ \
  gcc \
  make \
  openssl-dev \
  python \
  python-dev \
  python3-dev \
  py-lxml \
  libxml2-dev \
  py-pip \
  nodejs

##
# Install Blacklab
##

# Get the BlackLab source
RUN mkdir -p /blacklab && \
  cd /blacklab && \
  git clone git://github.com/INL/BlackLab.git --branch v1.7.3 && \
  cd BlackLab && \
  rm -rf .git && \
  mvn clean install

##
# Run container
##

# Make ports available
EXPOSE 27017 8080 7082 22
