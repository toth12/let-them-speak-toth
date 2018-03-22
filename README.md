# Let Them Speak

> A database of Holocaust survivor testimonies.

[![Build Status](https://travis-ci.com/YaleDHLab/let-them-speak.svg?branch=master)](https://travis-ci.com/YaleDHLab/let-them-speak)

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

Install Docker and Docker Compose, then in the root directory, start the app with `docker-compose up --build`

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