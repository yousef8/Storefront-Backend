# Storefront Backend

This is the second project as a part of my Nanodegree program provided by Udacity to learn backend programming using Node.js & Express

# Table of contents

- [Installation](#Installation)
- [Database Setup](#Database-Setup)
- [Testing](#Testing)
- [Environment Variables](#Environment-Variables)
- [Ports used](#Ports-used)
- [Tech/Framework used](#Tech/Framework-used)
- [API Usage](#API-Usage)

# Installation

1. Clone this repo `git clone git@github.com:yousef8/Storefront-Backend.git`
2. Open terminal of in the root folder of the project
3. Run this command `npm i` to install all packages in `package.json` file
4. You should install postgreSQL on your local machine and listening to port 5432 (default port)
5. [Database Setup](#Database-Setup)
6. [Testing](#Testing)
7. Run script `npm run build` to compile Typescript to Javascript
8. Run script `node dist/server` to run the express server
9. Notice the express server by default will listen on port 3000
10. You can run script `npm run nodemon` to run express server from typescript. If you are using windows OS with npm version 7.0 or higher you will get an error when running this command cause of `ts-node` use this [solution](https://github.com/remy/nodemon/issues/1951#issuecomment-1014387717)

# Database Setup

1. The file `database.ts` in root folder is the responsible for making the connection to the database
2. It requires that `.env` file should exist in the root folder with the following variables:
   - [**POSTGRES_HOST** - **POSTGRES_DB** - **POSTGRES_TEST_DB** - **POSTGRES_USER** - **POSTGRES_PASWORD** - **ENV**](#Environment-Variables)
3. create the development database with name `store_dev`.
   - you can create the database manually using SQL command like `CREATE DATABASE store_dev;` or just run the npm script `migrations-up` which will create the database and run the migrations to create all tables
4. run migrations to create tables inside database manually like this `node_modules/.bin/db-migrate up` or run the npm script `migrations-up` to create developmetn database and run all migrations. **Notice the migrations by default will run in the development database unless stated otherwise using the `-e` argument**
5. No need to make the testing database as the npm script `test` will create the testing database and run the migrations on it then run tests using jasmine command then will delete the testing database

# Testing

- The testing run in this repo is using the Jasmine framework with Supertest for testign endpoint API
- to run the tests all you need is to be done with seting up the database then run the command `npm run test` and it will create the testing database then run migrations to create all tables inside it then will run the tests using jasmine command then will delete the testing database

# Environment Variables

your `.env` file should contain all following variables with the same name:

- **POSTGRES_HOST**
  should contain the address of local host which is "127.0.0.1"

- **POSTGRES_DB**
  should contain the name of the developing database which name must be `store_dev` cause the npm script `npm run migrations-up` will create developing database with name `store_dev` if you want to change the name then change it here and in the npm script in `package.json` file.

- **POSTGRES_TEST_DB**
  should contain the name of the test database which must be with the name `store_test` because the npm script `test` will create a test database with the name `store_test` if you want to change the name then change it here and in the npm script in `package.json` file.

- **POSTGRES_USER**
  should contain the name of the admin user of postgres which is the name `postgres` that have all the privilages in postgres and that user is created by default when installation.
  **please note that any other user you will use will not have all the privilages and will result in errors**
- **POSTGRES_PASSWORD**
  the password you created for the `postgres` user when you were installing postgreSQL.
  If anothr user were put in POSTGRES_USER environment variable you will have to put the password you created for that user.
- **ENV**
  Must have the value of `dev`.
  Because when connecting to the database there are two modes 1. the first is `dev` that you will write to ENV environment variable which is the default and when you run the program using command like `node dist/server` will use the `dev` mode which make it use the development database `store_dev` to make all operations. 2. the other is `test` will make a connection to the testing database `store_test` and all operation will be conducted on the tables in that database
- **SALT_ROUNDS**
  contain the number of salt rounds supplied to the bcrypt method to hash the password. This variable must exist for the API Endpoint '/users/create' responsible for creating users to work.

- **TOKEN_SECRET**
  contain the secret that will be used by JWT to sign tokens

# Ports used

- the server will try to connect to database on port 5432
- the server will listen for request of port 3000

# Tech/Framework used

- This API is made with Typescript and Express and Node.js
- Jasmine is used for testing
- Supertest is used with Jasmine to test API Endpoints

# API Usage

Refer to [REQUIREMENTS.md](./REQUIREMENTS.md) file in root folder to see what ara available Endpoint and how to use them.

# Notice

- all packages you need in project are installed in step 3 if you followed the [Installation section](#Installation)
- db-migrate package are installed locally so if you ever needed to run commands using it in terminal don't use `db-migrate` as terminal won't find this program instead use this `node_modules/.bin/db-migrate`
