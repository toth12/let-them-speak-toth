# Specify base image
FROM node:8-alpine

# Specify author / maintainer
MAINTAINER Douglas Duhaime <douglas.duhaime@gmail.com>







##
# Build Maven
##



RUN apk add --update --no-cache \
  wget \
  tar \
  git \
  openjdk8

ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin

# Store the path to the maven home
ENV MAVEN_HOME="/usr/lib/maven"

# Add maven and java to the path
ENV PATH="$MAVEN_HOME/bin:$JAVA_HOME/bin:$PATH"

# Install Maven
RUN MAVEN_VERSION="3.3.9" && \
  cd "/tmp" && \
  wget "http://archive.apache.org/dist/maven/maven-3/$MAVEN_VERSION/binaries/apache-maven-$MAVEN_VERSION-bin.tar.gz" -O - | tar xzf - && \
  mv "/tmp/apache-maven-$MAVEN_VERSION" "$MAVEN_HOME" && \
  ln -s "$MAVEN_HOME/bin/mvn" "/usr/bin/mvn" && \
  rm -rf "/tmp/*"






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
  wget http://mirror.stjschools.org/public/apache/tomcat/tomcat-8/v8.5.29/bin/apache-tomcat-8.5.29.tar.gz && \
  tar -zxf apache-tomcat-8.5.29.tar.gz && \
  mkdir -p /usr/local/tomcat && \
  mv apache-tomcat-8.5.29/* /usr/local/tomcat/ && \
  sh /usr/local/tomcat/bin/catalina.sh version

##
# Build Python + Node dependencies
##

# Add source to a directory and use that directory
# NB: /app is a reserved directory in tomcat container
ENV APP_PATH="/lts-app"
RUN mkdir "$APP_PATH"
ADD . "$APP_PATH"
WORKDIR "$APP_PATH"

# Store Mongo service name as mongo host
ENV MONGO_HOST="0.0.0.0"
ENV TOMCAT_HOST="0.0.0.0"
ENV TOMCAT_WEBAPPS="/usr/local/tomcat/webapps/"

# Install system deps with Alpine Linux package manager
RUN apk add --update --no-cache --upgrade \
  g++ \
  gcc \
  make \
  openssl-dev \
  python3-dev \
  python \
  py-pip \
  nano \
  openssh \
  sudo \
  nodejs


#Copy the start file

run mkdir /etc/my_init.d

add ./start_with_real_data.sh /etc/my_init.d/
add ./start_with_seed_data.sh /etc/my_init.d/




# set the permissions for the varad folder
RUN ["/bin/bash", "-c", "chmod -R 777 /etc/my_init.d/"] 



#Add user 

RUN ["adduser","-D","-s","/bin/bash", "admin"]
#Set pwd for user

#this is not working
RUN ["echo","admin:hello","|", "chpasswd"]

#Add user to the sudo group

#Install usermod

RUN echo http://dl-2.alpinelinux.org/alpine/edge/community/ >> /etc/apk/repositories
RUN apk --no-cache add shadow 

#add sudo group

RUN ["addgroup", "sudo"]

#add admin to sudoers
#this command is not workingRUN ["usermod","-aG","sudo","admin"]

RUN echo "admin ALL=(ALL) ALL" >> /etc/sudoers

#Set the profile for all users

RUN echo "cd /lts-app/ && source env_lts/bin/activate" >> /etc/profile
RUN echo "export MONGO_HOST=\"0.0.0.0\"" >> /etc/profile
RUN echo "export TOMCAT_WEBAPPS=\"/usr/local/tomcat/webapps/\"" >> /etc/profile




#Install virtual environment

RUN ["pip","install","virtualenv"]

# create virtualenvironment

RUN ["/bin/bash", "-c", "cd /lts-app/ && virtualenv env_lts"]

RUN ["/bin/bash", "-c", "cd /lts-app/ && source env_lts/bin/activate  && ./env_lts/bin/pip install -r requirements.txt"]

# Install Python and project dependencies
RUN source env_lts/bin/activate && \
  npm install --no-optional && \
  npm run build



##
# Install Blacklab
##

# Get the BlackLab source
RUN git clone "git://github.com/INL/BlackLab.git"

# Build BlackLab with Maven
RUN cd "BlackLab" && \
  mvn clean install



# Make ports available
EXPOSE 27017 8080 7082

#Add operc

RUN set -x \
    && apk add --update --no-cache openrc \
    # Disable getty's
    && sed -i 's/^\(tty\d\:\:\)/#\1/g' /etc/inittab \
    && sed -i \
        # Change subsystem type to "docker"
        -e 's/#rc_sys=".*"/rc_sys="docker"/g' \
        # Allow all variables through
        -e 's/#rc_env_allow=".*"/rc_env_allow="\*"/g' \
        # Start crashed services
        -e 's/#rc_crashed_stop=.*/rc_crashed_stop=NO/g' \
        -e 's/#rc_crashed_start=.*/rc_crashed_start=YES/g' \
        # Define extra dependencies for services
        -e 's/#rc_provide=".*"/rc_provide="loopback net"/g' \
        /etc/rc.conf \
    # Remove unnecessary services
    && rm -f /etc/init.d/hwdrivers \
            /etc/init.d/hwclock \
            /etc/init.d/hwdrivers \
            /etc/init.d/modules \
            /etc/init.d/modules-load \
            /etc/init.d/modloop \
    # Can't do cgroups
    && sed -i 's/cgroup_add_service /# cgroup_add_service /g' /lib/rc/sh/openrc-run.sh \
    && sed -i 's/VSERVER/DOCKER/Ig' /lib/rc/sh/init.sh



