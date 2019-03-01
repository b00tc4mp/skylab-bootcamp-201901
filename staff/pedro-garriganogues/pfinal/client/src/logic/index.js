'user strict'

import finalApi from '../api'

const logic = {
    __userId__: null,
    __userApiToken__: null,

    async registerUser(name, surname, email, password, passwordConfirmation) {

        if (typeof name !== 'string') throw TypeError(name + ' is not a string')
        try {
            const answer = await finalApi.registerUser(name, surname, email, password, passwordConfirmation)
            console.log(answer)
        } catch (error) {
            console.log(error)
        }
    }
}

export default logic





// const logic = {
//     __userId__: null,
//     __userApiToken__: null,

//     registerUser(name, surname, email, password, passwordConfirmation) {
//         if (typeof name !== 'string') throw TypeError(name + ' is not a string')

//               return finalApi.registerUser(name, surname, email, password, passwordConfirmation)
//             .then(() => { })
//     }

// }

// export default logic