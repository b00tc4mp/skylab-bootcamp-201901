module.exports = {
    registerUser: require('./register-user'),

    authenticateUser: require('./authenticate-user'),

    retrieveUser: require('./retrieve-user'),

    updateUser: require('./update-user'),

    removeUser: require('./remove-user'),

    createWorkspace: require('./create-workspace'),

    addUserToWorkSpace: require('./add-user-to-workspace'),

    createNewUserLink: require('./create-new-user-link'),

    verifyNewUserLink: require('./verify-new-user-link'),

    createService: require('./create-service'),

    addUserToService: require('./add-user-to-service'),

    retrieveService: require('./retrieve-service'),

    retrieveWorkspaceServices: require('./retrieve-workspace-services'),

    updateService: require('./update-service'),

    deleteService: require('./delete-service'),

    createComment: require('./create-comment'),

    retrieveServiceComments: require('./retrieve-service-comments'),

    removeComment: require('./remove-comment')
}