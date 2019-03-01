



// const finalApi = {
//     url: 'http://localhost:8000',

//     async registerUser(name, surname, email, password, passwordConfirmation) {

//         try {
//             const response = await fetch(`${this.url}/register`, { name, surname, email, password, passwordConfirmation })

//             console.log(response);
//         } catch (error) {
//             console.log(error)
//         }
//     },
// }

// export default finalApi;

const finalApi = {
    url: 'http://localhost:8000',

    registerUser(name, surname, email, password, passwordConfirm) {

        return fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, email, password, passwordConfirm })
        })
            .then(response => response.json())
            .then(({ id, error }) => {
                if (error) throw Error(error)

                return id
            })
    }
}

export default finalApi;




