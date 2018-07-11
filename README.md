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

Finally, store the Tomcat webapps directory, the host addresses for both Mongo and Tomcat, and the production AWS credentials in your environment variables (update paths as necessary):

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
bash server/docker/build.sh
```

Once the container is built, you can seed the database and start the server with:

```bash
bash server/docker/run_with_seed_data.sh
```

If you have the production database credentials in your host's `~/.aws/credentials` file, you can start the app with production data by running:

```bash
bash server/docker/run_with_prod_data.sh
```

To ssh into container (see `chpasswd` line in ./Dockerfile), run:

```bash
bash server/docker/ssh.sh
```

To stop the container, run:

```bash
bash server/docker/stop.sh
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

Configure the AWS CLI

```bash
# install the CLI
pip install awscli --upgrade --user

# configure the CLI (provide production credentials when prompted)
aws configure
```

Install docker:

```bash
# install docker
sudo yum install docker -y

# start docker
sudo service docker start

# allow ec2-user to run docker
sudo usermod -a -G docker ec2-user
```

To apply the group changes, log out then log back in. Next, build the app:

```bash
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
