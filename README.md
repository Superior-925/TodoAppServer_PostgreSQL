# To Do List application server side(PostgreSQL)

## Application Technology Stack

The application is written by JavaScript/NodeJS/ExpressJS/PostgreSQL

## Prerequisites

You need to install follow software:

- npm
 ```sh
sudo apt-get install npm
  ```

- Node.js 

 ```sh
$ node -v 
15.14.0
  ```

## Application installation

 - Clone the repository

  ```sh
$ git clone https://github.com/Superior-925/TodoAppServer_PostgreSQL.git
 ```

- Go to project folder

```sh
$ cd TodoAppServer_PostgreSQL
 ```

- Create .env and set the following params:

```sh
PORT
DB_HOST
DB_USERNAME
DB_PASSWORD
 ```

- Install dependencies by NPM

 ```sh
$ npm install
```

 - Create a database

```sh
$ npm run db:create
 ```

- Create a table

```sh
$ npm run db:migrate
 ```

 - Start the server by the command

 ```sh
$ npm run start:dev
```

## You can create databases and migrate with the following command

```sh
$ npm run setup:db
 ```

## To test the server run the following commands

- Create test database

```sh
$ npm run db:create-test
 ```

- Create a test table

```sh
$ npm run db:migrate-test
 ```

- Start MOCHA

```sh
$ npm run test
 ```

If you have questions - contact me on email skykeeper925@gmail.com.
Best regards Anton Logunov.