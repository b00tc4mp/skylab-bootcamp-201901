# MyBreak App

## Introductin
Allows to order food, choosing the place and products. At the end it generates a QR code
that the user can save and go with it to chosen place to pick up the order.

![Joke](img/joke.gif)
## Functional description
Guest can:
- Register an accout
- Log in with registered accout

Only user with a registered account can use app.

User can:
- Log in
- Make order
    - Select pick-up location
    - Select products
    - Pay
    - Save QR code
    - Log out

### Use cases

#### Guest 
![Use Cases](img/anonymous-use-cases.jpg)

#### User
![Use Cases](img/user-use-cases.jpg)

### Flowcharts

#### User
![Flowcharts](img/flow-user.jpg)

## Technical  description

### Blocks
![Blocks](img/blocks.jpg)

### Components
![Components](img/components.jpg)

### React Components
![React components](img/react-components.jpg)

### Data model
![Data model](img/data-model.jpg)

### Code Coverage
####  API logic
![Coverage Api logic](img/coverage-api-logic.jpg)
####  APP dataApi
![Coverage App dataApi](img/coverage-app-dataapi.jpg)
####  APP logic
![Coverage App logic](img/coverage-app-logic.jpg)

## Technologies

Javascript, ReactJS, Node.js, Express, MongoDB & Mongoose.

## Organization
trello
https://trello.com/b/zoQlSshC/mybreak

## To do list

Qr code scanner with laptop's camera

Modification of user account information

Improve coverage

Product punctuation