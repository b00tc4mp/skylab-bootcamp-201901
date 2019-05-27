# node-api-rest

**Disclaimer:**

Just a branch to test and learn about Node.js and Express, the intention is to create a RESTful Api.

This is only for **fun**.

Feel free to grab the code if it may be interesting for you.

---

## HOW TO
To run the project you have to download the repo, **install dependencies and configure your mongo database.**

Then simply have to type:

- ```npm start``` to run the project
- ```npm run watch``` to have a hot reloading while you are coding

---

After this, you'll need to add a user via Postman/Mongo through a POST like so:

```
{
  email: 'mail@mail.com',
  displayName: 'Edgar',
  password: '123',
}
```

Through http://localhost/login you'll set a token into your local-storage. With this token you can now create products by
making a POST to 'http://localhost:3001/api/product', Retrieve all products making a GET call, update a certain product by
making a PUT request into 'http://localhost:3001/api/product/{PRODUCT_ID}' or erase a product by make DELETE


---

## Dependencies:
- Node
- Express
- Mongoose
- Nodemon
- Bcrypt
- Crypto
- Express-handlebars
- Moment
- JWT-simple

---
