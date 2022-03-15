# Storefront Backend

This is the second project as a part of my Nanodegree program provided by Udacity to learn backend programming using Node.js & Express

# Table of contents

- [setup steps](#Setup-steps)
- [environment variables](#Environment-Variables)
- [ports used](#Ports-used)

## Setup steps

1. clone this repo
2. open terminal of in the root folder of the project
3. run this command `npm i` to install all packages in `package.json` file
4. you should have postgreSQL installed on your local machine and listening to port 5432
5. create `.env` file in the root directory of the project
6. the `.env` file should contain the [environment variable](#Environment-Variables)
7. then in the terminal run the script `npm run migratins up` to create the development database and run migrations and create all tables
8. create tables in the development database
9. you can run the following script `npm run test` to run all the tests using jasmine and will operate on the test database named `store_test`
10. run script `npm run build` to compile Typescript to Javascript
11. run script `node dist/server` to run the express server
12. Notice the express server by default will listen on port 3000
13. you can run script `npm run nodemon` to run express server from typescript

## Environment Variables

your `.env` :file should contain all following variables with the same name:

- `POSTGRES_HOST` :should contain the ip of local machine (ex. 127.0.0.1)
- `POSTGRES_DB` :should contain the name of the development database
- `POSTGRES_TEST_DB` :should contain the name of the test database
- `POSTGRES_USER` :should contain the name of the user that will be used to make the connection to database
- `POSTGRES_PASSWORD` :the password of the user in the above variable
- `ENV` :must contain keyword "dev"
- `SALT_ROUNDS` :contain the number of salt rounds supplied to the bcrypt method to hash the password
- `TOKEN_SECRET`: contain the secret that will be used by JWT to sign tokens

## Ports used

- the server will try to connect to database on port 5432
- the server will listen for request of port 3000
