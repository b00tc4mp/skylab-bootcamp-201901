module.exports = {
    
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser : require('./update-user'),

    addBook : require('./add-book'),

    notFound: require('./not-found'),

    retrieveBooks: require('./retrieve-books'),

    retrieveBook: require('./retrieve-book'),

    deleteBook: require('./delete-book'),

    imageUpload: require('./upload-image'),

    updateBook: require('./update-book'),

    addBookToTemplates: require('./add-Book-To-Templates'),

    retrieveTemplates: require('./retrieve-Templates'),

    addTemplateToUserBooks: require('./add-Template-To-User-Books'), 

    retrieveTemplateBook: require ('./retrieve-Template-Book'),

    getEpub: require('./generate-Epub')
}