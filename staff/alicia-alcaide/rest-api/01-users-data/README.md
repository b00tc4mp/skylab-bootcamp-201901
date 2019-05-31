# REST-API

New rest-api that uses Duck-Api and implements user management in a JSON file on disk (identified by id)

This stateless logic API Replaces the presentation and rendering layer on the server side.

With ducks shopping cart saved on users (like ducks favorites)

(*) Update and delete of users are pending.


## Install the needed tools

* Copy the default environment variables: cp .env.dist  .env
* Open .env and modify it with your secret to generate the token
* Install dependencies `$ npm install`
* Start the services: `$ npm start`
* Now the REST-API is listening on port 8080