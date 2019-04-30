import normalize from '../common/normalize'
import validate from '../common/validate'
import userApi from '../data/user-api'
import { LogicError, DirectionError, PasswordError } from '../common/errors'
import iBusApi from '../data/ibus-api'
import transitApi from '../data/transit-api'



const logic = {

    set __userId__(id) {
        sessionStorage.userId = id
    },

    get __userId__() {
        return normalize.undefinedOrNull(sessionStorage.userId)
    },

    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    get __userToken__() {
        return normalize.undefinedOrNull(sessionStorage.userToken)
    },

    get isUserLoggedIn() {
        return !!(this.__userId__ && this.__userToken__)
    },

    registerUser(name, surname, email, password, password2) {

        validate.arguments([
            { name: 'name', value: name, type: 'string', notEmpty: true },
            { name: 'surname', value: surname, type: 'string', notEmpty: true },
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true },
            { name: 'password2', value: password2, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        if (password !== password2) throw new PasswordError("Password don't match")

        return userApi.create(email, password, { name, surname })
            .then(response => {
                if (response.status === 'OK') return

                throw new LogicError(response.error)
            })
    },

    loginUser(email, password) {
        validate.arguments([
            { name: 'email', value: email, type: 'string', notEmpty: true },
            { name: 'password', value: password, type: 'string', notEmpty: true }
        ])

        validate.email(email)

        return userApi.authenticate(email, password)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { id, token } } = response

                    this.__userId__ = id
                    this.__userToken__ = token
                } else throw new LogicError(response.error)
            })
    },

    retrieveUser() {
        return userApi.retrieve(this.__userId__, this.__userToken__)
            .then(response => {
                if (response.status === 'OK') {
                    const { data: { name, surname, username: email } } = response

                    return { name, surname, email }
                } else throw new LogicError(response.error)
            })
    },

    logoutUser() {
        sessionStorage.clear()
    },


    addFavorites() {
        //TODO
    },


    retrieveFavorites() {
        //TODO
    },


    retrieveBusLines(line_id) {

        validate.arguments([
            { name: 'line_id', value: line_id, type: 'number', notEmpty: true, optional: true }
        ])

        return transitApi.retrieveBusLine(line_id)
            .then(response => {
                const { features } = response

                return features.map(({ properties:
                    { "CODI_LINIA": line_id,
                        "NOM_LINIA": name_line,
                        "DESC_LINIA": desc_line,
                        "ORIGEN_LINIA": origin_line,
                        "DESTI_LINIA": dest_line,
                        "COLOR_LINIA": color_line
                    }
                }) => {
                    return { line_id, name_line, desc_line, origin_line, dest_line, color_line }
                })
            })
    },


    retrieveBusLineRoute(line_id) {

        validate.arguments([
            { name: 'line_id', value: line_id, type: 'number', notEmpty: true, optional: false }
        ])

        return transitApi.retrieveBusLineRoute(line_id)
            .then(response => {
                const { features } = response

                return features.map(({ properties:
                    { "SENTIT": direction_id,
                        "DESTI_SENTIT": direction_name
                    }
                }) => {
                    return { direction_id, direction_name }
                })
            })
    },


    retrieveBusStops(line_id, direction_id) {

        validate.arguments([
            { name: 'line_id', value: line_id, type: 'number', notEmpty: true, optional: false },
            { name: 'direction_id', value: direction_id, type: 'string', notEmpty: true, optional: false }
        ])

        if (direction_id !== 'A' || direction_id !== 'T') { throw new DirectionError('direction is not valid')}


        return transitApi.retrieveBusStops(line_id)
            .then(response => {
                const { features } = response

                let stops = []

                features.forEach(e => {
                    const { properties:
                        { "CODI_PARADA": stop_id,
                            "NOM_PARADA": stop_name,
                            "SENTIT": direction
                        }
                    } = e
                    if (direction === direction_id) {
                        stops.push({ stop_id, stop_name })
                    }                   

                })

                return stops
                
            })


    }

}

export default logic