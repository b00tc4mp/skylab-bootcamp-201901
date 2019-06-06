import userRouter from '../data/userRouter'


const logic = {
    set __userToken__(token) {
        sessionStorage.userToken = token
    },

    // get __userToken__() {
    //     return normalize.undefinedOrNull(sessionStorage.userToken)
    // },

    get isUserLoggedIn() {
        return !!this.__userToken__
    },


    async registerUser({ fullname, email, role, organization, phoneNumber, situation, password }){
        debugger
        return  await userRouter.create({ fullname, email, role, organization, phoneNumber, situation, password })

    }
}

export default logic