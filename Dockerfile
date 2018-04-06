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
  nodejs

# Install Python dependencies
RUN pip install -r "requirements.txt" && \
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

##
# Run container
##

# Make ports available
EXPOSE 27017 8080 7082

# Run the container
CMD ["sh", "-c", "mongod", "&", "sh", "/usr/local/tomcat/bin/catalina.sh", "start", "&", "npm", "run", "seed", "&", "gunicorn", "-b", "0.0.0.0:7082", "--access-logfile", "-", "--reload server.app:app", "--timeout", "90", "--log-level=DEBUG"]