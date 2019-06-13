![Photopin](images/intro-header.png)

# Introduction:

PhotoPin is a tool aimed at professional and enthusiast photographers who require careful planning of their photographic trips, as well as an easy and visual way to keep track of their favorite photographic locations.

The application allows users to create their own maps and populate them with collections of locations. For each location, users can store valuable information and reference images that will help them assess the best time and conditions for a successful photographic session.

# Functional Documentation

## Use Cases

![Use Cases](images/use-cases.png)

## Flows

![Flows](images/flows.png)

## Main Interface (Map page)

![Interface](images/interface.png)

# Technical documentation

## Design

### Blocks

![Blocks](images/blocks.png)

### Components

![Components](images/components.png)

### Data Model

![Data Model](images/entity-relationship.png)

## Project structure

This application contains the following modules:

- **photopin-api**: server-side node/express app (additional info [here](../photopin-api/README.md))
- **photopin-app**: client-side react app (additional info [here](../photopin-app/README.md))
- **photopin-call**: client-side helper to issue calls to the server
- **photopin-data**: data schemas (mongoose)
- **photopin-doc**: project documentation
- **photopin-errors**: common error definitions
- **photopin-normalize**: common helper functions
- **photopin-validation**: common validation logic

## Project set up

### Requirements

- Node.js
- MongoDB server

### Configuration

- See client-side configuration in the [photopin-app specific docs](../photopin-app/README.md)
- See server-side configuration in the [photopin-api specific docs](../photopin-api/README.md)

## Technology stack

This application has been built using the following main technologies

- Javascript
- React.js
- Node.js
- Express
- MongoDB
- Mongoose
- UIkit

In addition, it does intensive use of Google's Maps and Places apis, using the api [google-map-react](https://github.com/google-map-react/google-map-react).

### Code Coverage

![Code Coverage](images/coverage.png)

## 🙋 "Mea culpa"

- user profile page
- pin visualization page, uses the update view
- window info sometimes it is hidden

## 🍀 For future versions:

- Users

  - language asociate to the user
  - login with username instead of mail
  - user profile image (avatar)

* Map

  - upload images from the file browser instead of just saving the url image
  - Be able to mark a map as public. This maps will be accesible by all registered users
  - add public maps to favorites
  - allow add tags to the map
  - share maps between users
  - in a new map: the position default must be the user position with a litle zoom

* Pin

  - add selectors of type of icon and color for each power to customize the pins
  - upload images from the file browser instead of just saving the url image
  - have more than one associated image

- Search
  - be able to do searches on your maps or on the public
  - search maps by title or by tags
  - search pins by title or by tags, results on a map
