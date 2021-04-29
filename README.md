# To Do List application server side(PostgreSQL)

## Application Technology Stack

The application is written by JavaScript/NodeJS/ExpressJS/PostgreSQL

# To launch the app, you need to:

Open terminal and follow the next commands:
 
 - Clone the repository

  ```sh
$ git clone https://github.com/Superior-925/TodoAppServer_PostgreSQL.git
 ```

- Go to project folder

```sh
$ cd TodoAppServer_PostgreSQL
 ```

- Create file ".env" in root and write parameters of connection configuration:

```sh
PORT=3030
DB_HOST='127.0.0.1'
DB_USERNAME='test'
DB_PASSWORD='test'
 ```

You can set another PORT if PORT 3030 already use.
You will also need to create a new "test" role or any other with privileges on 
creating and using databases in PostgreSQL.

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

If you have questions - contact me on email skykeeper925@gmail.com.
Best regards Anton Logunov.