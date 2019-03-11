"use strict";
const {
    Types:{ObjectId}
} = require("mongoose");
const {
    User,
    Events,
    Comments,
    Categories
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
    debugger
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string") throw TypeError(surname + " is not a string");
    
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (isNaN(age)) throw TypeError(age + " is not a number");

    if (age < 0 || age > 123) throw Error("age cannot is posible");

    if (typeof description !== "string") throw TypeError(description + " is not a string");

    if (!description.trim().length) throw Error("description cannot be empty");
    
    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    if (typeof password !== "string")
      throw TypeError(password + " is not a string");

    if (!password.trim().length) throw Error("password cannot be empty");

    if (typeof passwordConfirmation !== "string") throw TypeError(passwordConfirmation + " is not a string");

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

      return {id}
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


  retrieveUser(userId) {
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");
    

    return (async () => {
      const user = await User.findById(userId)
      //.populate('events')
      .populate({ path:'events' , populate:{path:'category'}}).select('-password -__v',)
      .lean()
      
      if (!user) throw Error(`user with id ${userId} not found`);

      user.id = user._id.toString()

      delete user._id

      return user;
    })();
  },

  retrieveUserById(otherUserId,userId){
    debugger
    if (typeof otherUserId !== "string") throw TypeError(otherUserId + " is not a string");

    if (!otherUserId.trim().length) throw Error("otherUserId cannot be empty");

    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    return (async () => {
      const user = await User.findById(userId).select('-password -__v',).lean()

      if (!user) throw Error(`user with id ${userId} not found`);

      const otherUser = await User.findById(otherUserId).select('-password -__v',).lean()

      if (!otherUser) throw Error(`user with id ${otherUserId} not found`);

      otherUser.id = otherUser._id.toString()

      delete otherUser._id

      return otherUser;
    })()
  },

  updateUser(userId,name,surname,age,description,email) {
    debugger
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string") throw TypeError(surname + " is not a string");

    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof age !== "string") throw TypeError(age + " is not a string");

    if (!age.trim().length) throw Error("age cannot be empty");

    if (typeof description !== "string") throw TypeError(description + " is not a string");

    if (!description.trim().length) throw Error("description cannot be empty");

    if (typeof email !== "string") throw TypeError(email + " is not a string");

    if (!email.trim().length) throw Error("email cannot be empty");

    
    return (async () => {


      const user = await User.findOneAndUpdate({ _id: userId }, { name, surname,age,description, email }, {runValidators: true})
      .select('-password -__v')
      .lean()

      

      if (!user) throw Error(`user with id ${userId} not found`);

      return user


    })()

  },

  deleteUser(userId){
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    return (async () => {
      const user = await User.findById(userId)
      if (!user) throw Error(`user with id ${id} not found`);
      
      await user.remove()

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


    
    return (async () => {
      const user = await User.findById(userId)
      if (!user) throw Error(`user with id ${userId} not found`);
      delete user.password;

      const userEvent = await Events.create({

        author: userId,
        title,
        description,
        date,
        ubication,
        category

      })


      userEvent.id = userEvent._id.toString()

      delete userEvent._id
      
      return {eventId : userEvent.id , userEvent}
      
    })();

  },

  listEventsById(userId , eventId){
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof eventId !== "string") throw TypeError(eventId + " is not a string");

    if (!eventId.trim().length) throw Error("eventId cannot be empty");



    return(async() => {
      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);

      const userEvent = await Events.findById(eventId)
      .populate('author', "name surname age"  )
      .populate('category')
      .select('-__v').lean()
  
      if (!userEvent) throw Error(`event with id ${eventId} not found`);

      userEvent.id = userEvent._id.toString()
  
      delete userEvent._id

      userEvent.category.id =  userEvent.category._id.toString()

      delete userEvent.category._id

  
      return userEvent;    

    })()



  },

  listEvents(userId ,categoryId){
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof categoryId !== "string") throw TypeError(categoryId + " is not a string");

    if (!categoryId.trim().length) throw Error("categoryId cannot be empty");

    return(async() => {
      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);

      const response = await Events.find({'category': categoryId})
      .populate('category')
      .select('-__v')
      .lean()


      if (!response) throw Error(`user with id ${categoryId} not found`);

      const events = await response.map(eventUser => {
        eventUser.id = eventUser._id.toString()

        delete eventUser._id

        return eventUser
      })
    

      return events

    })()

  },

  listEventsByQuery(userId , query){
    debugger
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof query !== "string") throw TypeError(query + " is not a string");

    if (!query.trim().length) throw Error("query cannot be empty");

    return(async () => {
      
    const response = await Events.find({ title: { $regex: `${query}`, $options: "i" } } )
    .populate('author', "name surname age"  )
    .populate('category')
    .select('-__v').lean()

    if (!response) throw Error(`user with id ${categoryId} not found`);

    const events = await response.map(eventUser => {
    eventUser.id = eventUser._id.toString()

      delete eventUser._id

      return eventUser
    })

    

    return events
    })()
  },

  addComment(userId,eventId,text){
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof eventId !== "string") throw TypeError(eventId + " is not a string");

    if (!eventId.trim().length) throw Error("eventId cannot be empty");

    if (typeof text !== "string") throw TypeError(text + " is not a string");

    if (!text.trim().length) throw Error("text cannot be empty");

    return (async () => {
      
      const eventUser = await Events.findById(eventId)

      if (!(eventUser)) throw Error(`event with id ${eventId} not found`);

      const user = await User.findById(userId)
      
      if(!(user)) throw Error(`user with id ${userId} not found`)
      const response = await Comments.create({
        commentAuthor : userId,
        commentEvent : eventId,
        text
      })

    const comment =  await Comments.findById(response._id).select('-__v').lean()

    comment.id = comment._id.toString()

    delete comment._id
  

    return comment
      
    })();
  },

  listComments(userId,commentEvent){

    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof commentEvent !== "string") throw TypeError(commentEvent + " is not a string");

    if (!commentEvent.trim().length) throw Error("commentEvent cannot be empty");
    
    return (async () => {

      // const eventUser = await Events.findById(eventId);

      // if (!(eventUser)) throw Error(`event with id ${eventId} not found`);

      const user = await User.findById(userId).populate('commentAuthor')

      if (!user) throw Error(`user with id ${userId} not found`);

      const eventUser = await Events.findById(commentEvent)

      if (!(eventUser)) throw Error(`event with id ${commentEvent} not found`);

      const comments = await Comments.find({commentEvent}).select('-__v')
      .populate('commentAuthor', "name surname age"  )
      .populate('commentEvent' , "title , author").lean()
      
      const comment = await comments.map(commentUser => {
          commentUser.id = commentUser._id.toString()
    
          delete commentUser._id

          return commentUser
      })
    

     

      return comment

    })()
  },

  deleteComment(userId,commentEvent ,commentId){
    debugger
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof commentEvent !== "string") throw TypeError(commentEvent + " is not a string");

    if (!commentEvent.trim().length) throw Error("commentEvent cannot be empty");

    if (typeof commentId !== "string") throw TypeError(commentId + " is not a string");

    if (!commentId.trim().length) throw Error("commentId cannot be empty");


    return(async() => {

      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);

      const eventUser = await Events.findById(commentEvent);

      if (!(eventUser)) throw Error(`event with id ${commentEvent} not found`);

      const comment = await Comments.findById(commentId)

      if (!(comment)) throw Error(`event with id ${commentId} not found`);
      debugger
      await comment.remove()


      const response = {
        message: "comment successfully deleted",
      };
      return response

    })()

  },

  toogleEvent(userId,eventId){
    debugger
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof eventId !== "string") throw TypeError(eventId + " is not a string");

    if (!eventId.trim().length) throw Error("eventId cannot be empty");

    return(async () => {
      debugger
      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);

      const events = await Events.findById(eventId)

      if (!events) throw Error(`user with id ${eventId} not found`);


      const index = user.events.findIndex(_eventId =>  _eventId.toString() === eventId)
          if (index < 0) user.events.push(eventId)
          else user.events.splice(index, 1)

          user.save()
          
          const myEvents = await User.findById(userId).populate('events')


          return myEvents

    })()
  }  

 }


module.exports = logic;
