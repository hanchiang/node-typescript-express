# Introduction

This project is a quick starter for typescript and express.  
Tests are written with mocha, supertest  
Docker and docker compose are used for convenience of setting up the entire project

# Prerequisites
* Install docker: https://docs.docker.com/get-docker/
* Install docker compose: https://docs.docker.com/compose/install/

# Project structure
* `src/middlewares/`: Express middlewares such as error handler, try-catch function
* `src/config/`: Application level configurations
* `src/routes/`: Express routes
* `src/controllers/`: Route handler logic
* `src/util/`: Utilities
* `src/app`: Express server setup
* `src/server`: Express Server entry point
* `test/`
  * `unit/`: Unit tests
  * `integration`: Integration tests 

# Run with docker compose
* Start: `docker-compose up -d`
* Stop: `docker-compose down`

# Run without docker compose
* Install dependencies: `npm install`
* Start server: `npm run debug`