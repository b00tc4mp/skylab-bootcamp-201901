# SkyLab Inn App

## Introduction

Create a private network to connect all Skylabers, with the aim to:

SkyLab Academy: easily match the new Skylabers with the job offers requirements.

Skylabers: easily find out which Skylabers can help or assist them when in need of assistance, or easily get in touch with any of them.

![Introduction](images/introduction.png)

## Functional description

Admins can:

* Add Skylabers to the whitelist.
* Check the status of this pre-authorised Skylabers(if signed up or pending email verification).
* Perfom regular or advance searches of Skylabers.
* Share hashed urls with contact information of the filtered Skylabers.

Only pre-authorised Skylabers can register to the network. Once they are added to the whitelist, the Skylabers recieve an email letting them know that they have been cleared to sign up. After registration, Skylabers receive and email to confirm their email addresses.

Skylabers can:

* Update their profile.
* Perfom regular or advance searches of Skylabers.


### Use Cases
![Use Cases](images/use-cases.png)

### Flowcharts

#### Admin
![Flow Admin](images/flow-admin.png)

#### User
![Flow User](images/flow-user.png)

#### Guest
![Flow Guest](images/flow-guest.png)

## Technical Description

### Blocks
![Blocks](images/blocks.png)

### Components
![Components](images/components.png)

### React Components

![React Components](images/react-components-1.png)

![React Components](images/react-components-2.png)

![React Components](images/react-components-3.png)

![React Components](images/react-components-4.png)

### Data Model
![Data Model](images/data-model.png)

### Code Coverage

#### ![API Coverage](https://img.shields.io/badge/API_Coverage-98%25-green.svg)
![API Coverage](images/test-coverage-skylab-inn-api.png)

#### ![APP Coverage](https://img.shields.io/badge/APP_Coverage-92%25-green.svg)
![APP Coverage](images/test-coverage-skylab-inn-app.png)

### Technologies
Javascript, ReactJS, Node.js, Express, MongoDB & Mongoose.


