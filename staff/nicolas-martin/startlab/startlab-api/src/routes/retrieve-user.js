const logic = require('../logic')

const { handleResponseError } = require('./route-helper')

module.exports = (req, res) => {
    const { userId } = req

    try {
        logic.retrieveUser(userId)
            .then(result => res.json(result))
            //.then(res.json.bind(res))
            .catch(error => handleResponseError(error, res)) // error when user is student

    } catch (error) {
        handleResponseError(error, res)
    }
}

// OK - User Admin
// {
//     "name": "nico",
//     "surname": "nico",
//     "email": "nico@nico.com",
//     "historical": [],
//     "id": "5c7d28d60c5be837ef1f3e7e"
// }


// NOK - Student
// {
//     "error": "user with id 5c77c89209ad473de1078938 has not privileges"
// }

