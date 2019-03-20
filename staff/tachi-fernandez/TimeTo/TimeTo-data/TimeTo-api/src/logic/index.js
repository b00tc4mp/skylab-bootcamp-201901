"use strict";
const {
  models:{
    User,
    Events,
    Comments,
    Categories
  }
} = require('TimeTo-data');
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
  registerUser(name, surname, userName,age,description, email, password, passwordConfirmation) {
    
    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string") throw TypeError(surname + " is not a string");
    
    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof userName !== "string") throw TypeError(userName + " is not a string");
    
    if (!userName.trim().length) throw Error("userName cannot be empty");

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
        userName,
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

  retrieveUserById(userName,otherUserId){
    if (typeof userName !== "string") throw TypeError(userName + " is not a string");

    if (!userName.trim().length) throw Error("userName cannot be empty");

    if (typeof otherUserId !== "string") throw TypeError(otherUserId + " is not a string");

    if (!otherUserId.trim().length) throw Error("otherUserId cannot be empty");

    return (async () => {
      const user = await User.findById(otherUserId).select('-password -__v',).lean()

      if (!user) throw Error(`user with id ${otherUserId} not found`);

      const otherUser = await User.findOne({userName: new RegExp('^'+userName+'$', "i")}).select('-password -__v',).lean()

      if (!otherUser) throw Error(`user with id ${userName} not found`);

      otherUser.id = otherUser._id.toString()

      delete otherUser._id

      return otherUser;
    })()
  },

  updateUser(userId,name,surname,age,description) {
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof name !== "string") throw TypeError(name + " is not a string");

    if (!name.trim().length) throw Error("name cannot be empty");

    if (typeof surname !== "string") throw TypeError(surname + " is not a string");

    if (!surname.trim().length) throw Error("surname cannot be empty");

    if (typeof age !== "number") throw TypeError(age + " is not a string");

    if (typeof description !== "string") throw TypeError(description + " is not a string");

    if (!description.trim().length) throw Error("description cannot be empty");

    
    return (async () => {


      const user = await User.findOneAndUpdate({ _id: userId }, { name, surname,age,description }, {runValidators: true})
      .select('-password -__v')
      .lean()

      


    if (typeof user.name !== "string") throw TypeError(user.name + " is not a string");

    if (!user.name.trim().length) throw Error("name cannot be empty");

    if (typeof user.surname !== "string") throw TypeError(user.surname + " is not a string");

    if (!user.surname.trim().length) throw Error("surname cannot be empty");

    if (typeof user.age !== "number") throw TypeError(user.age + " is not a number");

    if (typeof user.description !== "string") throw TypeError(user.description + " is not a string");

    if (!user.description.trim().length) throw Error("description cannot be empty");

      
    
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

  createEvents( userId, title, description, date , city ,address , category) {
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof title !== "string") throw TypeError(title + " is not a string");

    if (!title.trim().length) throw Error("title cannot be empty");

    if (typeof description !== "string") throw TypeError(description + " is not a string");

    if (!description.trim().length) throw Error("description cannot be empty");

    if (typeof date !== "string") throw TypeError(date + " is not a string");

    if (!date.trim().length) throw Error("date cannot be empty");

    if (typeof city !== "string") throw TypeError(city + " is not a string");

    if (!city.trim().length) throw Error("city cannot be empty");

    if (typeof address !== "string") throw TypeError(address + " is not a string");

    if (!address.trim().length) throw Error("address cannot be empty");

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
        city,
        address,
        category

      })


      userEvent.id = userEvent._id.toString()

      delete userEvent._id
      


      const events = await Events.findById(userEvent.id).populate('members')

      events.members.push(userId)

      events.id = events._id.toString()

      delete events._id

      delete events.members[0].events
      
      events.save()

      user.events.push(events.id)

      user.save()

      return events
      
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
      .populate('author', "name surname userName age"  )
      .populate('category')
      .populate('members')
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
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof query !== "string") throw TypeError(query + " is not a string");

    if (!query.trim().length) throw Error("query cannot be empty");

    return(async () => {
      
      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);

    const response = await Events.find({ title: { $regex: `${query}`, $options: "i" } } )
    .populate('author', "name surname userName age"  )
    .populate('category')
    .select('-__v').lean()

    if (!response || response.length <= 0) throw Error('events not found');

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
      .populate('commentAuthor', "name surname age userName image"  )
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
      
      await comment.remove()


      const response = {
        message: "comment successfully deleted",
      };
      return response

    })()

  },

  toogleEvent(userId,eventId){
    
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof eventId !== "string") throw TypeError(eventId + " is not a string");

    if (!eventId.trim().length) throw Error("eventId cannot be empty");

    return(async () => {
      const user = await User.findById(userId)

      if (!user) throw Error(`user with id ${userId} not found`);

      const events = await Events.findById(eventId)

      if (!events) throw Error(`event with id ${eventId} not found`);


      const index = user.events.findIndex(_eventId =>  _eventId.toString() === eventId)
          if (index < 0) user.events.push(eventId)
          else user.events.splice(index, 1)

          user.save()
      
      const indexEvent = events.members.findIndex(_userId =>  _userId.toString() === userId)
          if (indexEvent < 0) events.members.push(userId)
          else events.members.splice(indexEvent, 1)

          events.save()
          
          const myEvents = await User.findById(userId).populate('events')


          return myEvents

    })()
  
  },

  updateImage(userId,image){
    if (typeof userId !== "string") throw TypeError(userId + " is not a string");

    if (!userId.trim().length) throw Error("userId cannot be empty");

    if (typeof image !== "string") throw TypeError(image + " is not a string");

    if (!image.trim().length) throw Error("image cannot be empty");


    return(async () => {
      
      const user = await User.findOneAndUpdate({_id : userId} , {image}, {runValidators: true} )
      .select('-password -__v')
      .lean()

      if (!user) throw Error(`user with id ${userId} not found`);
      
      return user

    })()
    }

}

module.exports = logic;
