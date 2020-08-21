#!/usr/bin/env sh

#. only_run_in_docker.sh

echo Testing copy dest      
    touch test.txt && mv test.txt /lts-app/folia-prod
    
echo Env: $TOMCAT_WEBAPPS
    env 

echo Running mongodb
     mongod &  
echo Removing lts archive
    rm -f /lts-app/server/inputs/lts.archive

echo Removing folia index
    rm -rf /lts-app/server/inputs/folia

echo Making Folia dir
    mkdir -p /lts-app/server/inputs/folia

echo Unzipping Folia data
    unzip -q -d /lts-app/server/inputs/folia /lts-app/server/inputs/folia.zip

echo Unzipping lts archive
    unzip -q -d /lts-app/server/inputs/ /lts-app/server/inputs/lts.archive.zip

echo Starting Tomcat
    /usr/local/tomcat/bin/catalina.sh start

echo Running build_db.py
    python server/build_db.py

echo Moving folia data to host 
    mv /lts-app/lts /lts-app/folia-prod

echo Moving blacklab configs to host
    mv '/usr/local/tomcat/webapps/blacklab-server.json' /lts-app/prod-data/sys && \
    mv /usr/local/tomcat/webapps/blacklab-server-*.war /lts-app/prod-data/sys/

# echo Stopping Tomcat        && /usr/local/tomcat/bin/catalina.sh stop && sleep 10 && \
# echo Stopping mongodb       && killall mongodb &&
echo Done! Now you can push the data from ./prod-data