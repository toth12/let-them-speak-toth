# Let Them Speak

> A database of Holocaust survivor testimonies.

## Dependencies

First you'll need to install Maven, Tomcat, and Node.js:

```bash
brew install maven tomcat node
```

Then install the app dependencies, you can run:

```bash
git clone https://github.com/YaleDHLab/let-them-speak
cd let-them-speak
npm install --no-optional
pip install -r requirements.txt
```

Next you'll need to clone and compile the BlackLab source:

```bash
# acquire and build source
git clone git://github.com/INL/BlackLab.git
cd BlackLab
mvn install
```

Finally, store the Tomcat webapps directory and the host addresses for both Mongo and Tomcat in your environment variables (update paths as necessary):

```bash
export MONGO_HOST="localhost"
export TOMCAT_HOST="localhost"
export TOMCAT_WEBAPPS="/usr/local/Cellar/tomcat/9.0.5/libexec/webapps/"
```

## Running the Server

Once the dependencies are settled, you can seed the db and start the server with:

```bash
npm run seed
npm run production
```

That will start the server on port 7082. To run the development server with hot module reloading, run:

```bash
npm run start
```

That will start the webpack dev server on port 7081. Note that you will need to have a BlackLab server running to generate the seed data or run text queries. See below for getting started with BlackLab.

## Docker Usage

Install Docker, then in the root directory, build the container with:

```bash
docker build --tag letthemspeak --no-cache --file Dockerfile .
```

Once the container is built, you can run it with:

```bash
docker run -p 7082:7082 -p 8080:8080 -p 27017:27017 letthemspeak /bin/sh -c "mongod & /usr/local/tomcat/bin/catalina.sh start & npm run seed & gunicorn -b 0.0.0.0:7082 --workers 1 --threads 8 --timeout 30 --keep-alive 2 --access-logfile - --log-level=DEBUG server.app:app"
```

## Linting

To lint the Javascript files (located in `src`), run:

```bash
npm run lint-js
```

To lint the Python files (located in `server`), run:

```bash
npm run lint-py
```

## Tests

To run the Javascript tests (located in `src/tests/`), run:

```bash
npm run jest
```

To run the Python tests (located in `server/tests/`), run:

```bash
pytest
```

## Deploying to Ec2

Install docker:
```
# install docker
sudo yum install docker -y

# start docker
sudo service docker start

# allow ec2-user to run docker
sudo usermod -a -G docker ec2-user
```

To apply the group changes, log out then log back in. Next, build the app:

```
# install dependencies
sudo yum install git -y

# get the app source
git clone https://github.com/YaleDHLab/let-them-speak

# start a screen to hold the server process
screen -S server

# cd into the app source
cd let-them-speak

# run the Docker commands above to build and start the container
```

Then, from another ssh session, detach your screen:

```
screen -D
```