# Specify base image
FROM andreptb/oracle-java:8-alpine

# Specify author / maintainer
MAINTAINER Douglas Duhaime <douglas.duhaime@gmail.com>

# Add source to a directory and use that directory
# NB: /app is a reserved directory in tomcat container
ENV APP_PATH="/lts-app"
RUN mkdir "$APP_PATH"
ADD . "$APP_PATH"
WORKDIR "$APP_PATH"

##
# Build BlackLab
##

RUN apk add --update --no-cache \
  wget \
  tar \
  git

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

# Get the BlackLab source
RUN git clone "git://github.com/INL/BlackLab.git"

# Build BlackLab with Maven
RUN cd "BlackLab" && \
  mvn clean install

##
# Build Python + Node dependencies
##

# Install system deps with Alpine Linux package manager
RUN apk add --update --no-cache \
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

# Store Mongo service name as mongo host
ENV MONGO_HOST=mongo_service
ENV TOMCAT_HOST=tomcat_service
ENV TOMCAT_WEBAPPS=/tomcat_webapps/

# Make ports available
EXPOSE 7082

# Seed the db
CMD npm run seed && \
  gunicorn -b 0.0.0.0:7082 --access-logfile - --reload server.app:app