module.exports = {

    // CRUD Users
    registerUser: require('./register-user'),
    authenticateUser: require('./authenticate-user'),
    retrieveUser: require('./retrieve-user'),
    isAdmin: require('./is-admin'),

    // CRUD Exercise
    createExercise: require('./exercise/create'),
    retrieveExercise: require('./exercise/retrieve'),
    updateExercise: require('./exercise/update'),
    deleteExercise: require('./exercise/delete'),
    listExercises: require('./exercise/list'),

    getExercisesFromUser: require('./get-exercises-from-user'),
    updateExerciseFromUser: require('./update-exercise-from-user'),

    checkAnswer: require('./check-answer'),

    // CRUD Invitations
    createInvitation: require('./invitation/create'),
    retrieveInvitation: require('./invitation/retrieve'),
    updateInvitation: require('./invitation/update'),
    deleteInvitation: require('./invitation/delete'),
    listInvitations: require('./invitation/list'),

    sendInvitationEmail: require('./email/send-invitation-email'),
    notFound: require('./not-found')
}