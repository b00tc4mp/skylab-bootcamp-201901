module.exports = {
    registerUser: require('./register-user'),

    registerPet: require('./register-pet'),

    assignAppointment: require('./assign-appointment'),

    authenticateUser: require('./authenticate-user'),

    retrieveUsers: require('./retrieve-users'),

    retrieveUser: require('./retrieve_user'),

    retrieveAppointmentsOwner: require('./retrieve-appointments-owner'),

    retrieveUserSelected: require('./retrieve-user-selected'),
 
    retrievePets: require('./retrieve-pets'),
    
    retrieveAppointments: require('./retrieve-appointments'),

    retrievePet: require('./retrieve-pet'),

    retrievePetVisit: require('./retrieve-pet-visit'),

    updateUser: require('./update-user'),

    updatePet: require('./update-pet'),

    updateVisit: require('./uptade-visit'),

    deleteAppointment: require('./delete-appointment'),

    notFound: require('./not-found')
}