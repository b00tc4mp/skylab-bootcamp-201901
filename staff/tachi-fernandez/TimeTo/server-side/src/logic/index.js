"use strict";
const {
    SchemaTypes:{ObjectId}
} = require("mongoose");
const {
    User,
    Events,
    Comments
} = require("../models");
const bcrypt = require("bcrypt");
const {EmptyError} = require('../errors')

/**
 * Abstraction of business logic.
 */
const logic = {
  jwtSecret: null,

  /**
   * Registers a user.
   *
   * @param {string} name
   * @param {string} surname
   * @param {string} email
   * @param {string} password
   * @param {string} passwordConfirmation
   */
  registerUser(name, surname,age,description, email, password, passwordConfirmation) {
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw EmptyError("name cannot be empty");

    if (typeof surname !== "string") throw TypeError(surname + " is not a string");
    
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof age !== "string") throw TypeError(age + " is not a string");

    if (!age.trim().length) throw Error("age cannot be empty");

    if (typeof description !== "string") throw TypeError(description + " is not a string1");

    if (!description.trim().length) throw Error("description cannot be empty");
    
    if (typeof email !== "string") throw TypeError(email + " is not a string2");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string3");

    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirmation !== "string") throw TypeError(passwordConfirmation + " is not a string4");

    if (!passwordConfirmation.trim().length)
      throw Error("password confirmation cannot be empty");

    if (password !== passwordConfirmation)
      throw Error("passwords do not match");

    return (async () => {
      const user = await User.findOne({ email });

      if (user) throw Error(`user with email ${email} already exists`);

      const hash = await bcrypt.hash(password, 10);

      const { id } = await User.create({
        name,
        surname,
        age,
        description,
        email,
        password: hash
      });

      return {status : "OK" , data: {
        id
      }}
    })();
  },

  /**
   * Authenticates user by its credentials.
   *
   * @param {string} email
   * @param {string} password
   */
  authenticateUser(email, password) {
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    return (async () => {
      const user = await User.findOne({ email });

      if (!user) throw Error(`user with email ${email} not found`);

      const match = await bcrypt.compare(password, user.password);

      if (!match) throw Error("wrong credentials");

      const { id } = user;


      return  id;
    })();
  },

  // __verifyUserToken__(userId, token) {
  //   const { sub } = jwt.verify(token, this.jwtSecret);

  //   if (sub !== userId)
  //     throw Error(`user id ${userId} does not match token user id ${sub}`);
  // },

  retrieveUser(id) {
    if (typeof id !== "string") throw TypeError(id + " is not a string");

    if (!id.trim().length) throw Error("id cannot be empty");
    

    return (async () => {
      const user = await User.findById(id).select('-__v').lean()

      if (!user) throw Error(`user with id ${id} not found`);

      user.id = user._id.toString()

      delete user._id

      return user;
    })();
  },

  // updateUser(userId,data) {
  //   if (typeof userId !== "string") throw TypeError(userId + " is not a string");

  //   if (!userId.trim().length) throw Error("userId cannot be empty");

  //   if (typeof data !== Object) throw TypeError (data + 'is not an object')
    
  //   return (async () => {
  //     const user = await findByIdAndUpdate(userId,data)

  //   return user


  //   })

  // },

  deleteUser(userId){
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    return (async () => {
      debugger
      const user = await User.findById(userId)
      if (!user) throw Error(`user with id ${id} not found`);
      
      await user.remove()
      debugger

    const response = {
        message: "user successfully deleted",
    };
    return response

    })()


  },

  createEvents( userId, title, description, date , ubication , category) {
    debugger
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof title !== "string") throw TypeError(title + " is not a string");

    if (!title.trim().length) throw Error("title cannot be empty");

    if (typeof description !== "string") throw TypeError(description + " is not a string");

    if (!description.trim().length) throw Error("description cannot be empty");

    if (typeof date !== "string") throw TypeError(date + " is not a string");

    if (!date.trim().length) throw Error("date cannot be empty");

    if (typeof ubication !== "string") throw TypeError(ubication + " is not a string");

    if (!ubication.trim().length) throw Error("ubication cannot be empty");

    if (typeof category !== "string") throw TypeError(category + " is not a string");

    if (!category.trim().length) throw Error("category cannot be empty");


    debugger
    
    return (async () => {
      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);
      debugger
      delete user.password;

      const userEvent = await Events.create({

        user: userId,
        title,
        description,
        date,
        ubication,
        category

      })


      userEvent.id = userEvent._id.toString()

      delete userEvent._id
      
      return {status: 'Ok' , id:userEvent.id}
      
      // return {status : "OK" , data: {
      //   enventId 
      // }}


    })();

  },

  listEventsById(eventId){
    debugger
    if (typeof eventId !== "string") throw TypeError(eventId + " is not a string");

    if (!eventId.trim().length) throw Error("eventId cannot be empty");

    return(async() => {
      const userEvent = await Events.findById(eventId).select('-__v').lean()
  
  
      if (!userEvent) throw Error(`user with id ${eventId} not found`);

  
      userEvent.id = userEvent._id.toString()
  
      delete userEvent._id
  
      return userEvent;    

    })()



  },

  listEvents(categoryId){
    if (typeof categoryId !== "string") throw TypeError(categoryId + " is not a string");

    if (!categoryId.trim().length) throw Error("categoryId cannot be empty");

    return Events.find({'category': categoryId})
    .then(response =>response)
    
  },

  listEventsByQuery(query){
    
    if (typeof query !== "string") throw TypeError(query + " is not a string");

    if (!query.trim().length) throw Error("query cannot be empty");

    return Events.find({ title: { $regex: `${query}`, $options: "i" } } )

  },

  addComment(userId,eventId,text){
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof eventId !== "string") throw TypeError(eventId + " is not a string");

    if (!eventId.trim().length) throw Error("eventId cannot be empty");

    if (typeof text !== "string") throw TypeError(text + " is not a string");

    if (!text.trim().length) throw Error("text cannot be empty");


    return (async () => {
      
      const eventUser = await Events.findById(eventId);

      if (!(eventUser)) throw Error(`event with id ${eventId} not found`);

      const user = await User.findById(userId)
      
      if(!(user)) throw Error(`user with id ${userId} not found`)

      const comment = await Comments.create({
        commentAuthor : userId,
        commentEvent : eventId,
        text
      })

      comment.id = comment._id.toString()

      delete comment._id
  

      return {status : "OK" , data: {
        comment
      }}
    })();
  },

  listComments(commentEvent){

    if (typeof commentEvent !== "string") throw TypeError(commentEvent + " is not a string");

    if (!commentEvent.trim().length) throw Error("commentEvent cannot be empty");

    return (async () => {
      const comments = await Comments.find({commentEvent}).select('-__v').lean()
  
      return {status:'OK' , data : {
        comments
      }}
    })()
  },

  deleteComment(commentId){
    if (typeof commentId !== "string") throw TypeError(commentId + " is not a string");

    if (!commentId.trim().length) throw Error("commentId cannot be empty");

    return(async() => {
      const comment = await Comments.findById(commentId)

      debugger
      if (!(comment)) throw Error(`event with id ${commentId} not found`);

      await comment.remove()
      console.log(comment)

      const response = {
        message: "comment successfully deleted",
      };
      return response

    })()

  }




}


module.exports = logic;
