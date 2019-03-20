
const userApi = {
    url: ' https://pacific-thicket-55566.herokuapp.com/final-proyect/api',

    register(name, surname, userName,age, description, email, password, passwordConfirmation) {
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof userName !== 'string') throw TypeError(userName + ' is not a string')
        if (!userName.trim().length) throw Error('userName cannot be empty')

        if (typeof age !== 'number') throw TypeError(`${age} is not a number`)
        if( age < 0 ) throw Error('age cannot is posible')

        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description cannot be empty')

        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password cannot be empty')

        if (typeof passwordConfirmation !== 'string') throw TypeError(`${passwordConfirmation} is not a string`)
        if (!passwordConfirmation.trim().length) throw Error('passwordConfirmation cannot be empty')

        return fetch(`${this.url}/user`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, surname, userName ,age, description, email, password ,passwordConfirmation })
        })
            .then(response => response.json())
            .then(response => {
                 const { id , error } = response
                 if(error) throw Error(error)
                 return id

                //throw Error(response.error)
            })
    },

    authenticate(email, password) {
        if (typeof email !== 'string') throw TypeError(`${email} is not a string`)
        if (!email.trim().length) throw Error('email cannot be empty')

        if (typeof password !== 'string') throw TypeError(`${password} is not a string`)
        if (!password.trim().length) throw Error('password cannot be empty')

        return fetch(`${this.url}/user/auth`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(response => {
                // const {token} = response

                const {error,token} = response
                // return token
                if(error) throw Error(error)

                return token

            })
    },

    retrieveUser(token) {
        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/retrieve-user`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {

                return response
            })
    },

    retireveUserById(userName ,token){
        if (typeof userName !== 'string') throw TypeError(`${userName} is not a string`)
        if (!userName.trim().length) throw Error('userName cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/retrieve-userId/${userName}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(response => {

                return response
            })
    },

    updateUser(name,surname,age,description,token){
        if (typeof name !== 'string') throw TypeError(`${name} is not a string`)
        if (!name.trim().length) throw Error('name cannot be empty')

        if (typeof surname !== 'string') throw TypeError(`${surname} is not a string`)
        if (!surname.trim().length) throw Error('surname cannot be empty')

        if (typeof age !== 'number') throw TypeError(`${age} is not a number`)

        if (typeof description !== 'string') throw TypeError(`${description} is not a string`)
        if (!description.trim().length) throw Error('description cannot be empty')

        if (typeof token !== 'string') throw TypeError(`${token} is not a string`)
        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/user/update`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name, surname, age, description })
        })
            .then(response => response.json())
            .then(response => {
                
                return response
                //throw Error(response.error)
            })
    },

   

    createEventUser(title, description, date, city, address, category, token){
        
        if (typeof title !== 'string') throw TypeError(title + ' is not a string')
        
        if (!title.trim().length) throw Error('title cannot be empty')
        
        if (typeof description !== 'string') throw TypeError(description + ' is not a string')
        
        if (!description.trim().length) throw Error('description cannot be empty')
        
        if (typeof date !== 'string') throw TypeError(date + ' is not a string')
        
        if (!date.trim().length) throw Error('date cannot be empty')
        
        if (typeof city !== 'string') throw TypeError(city + ' is not a string')
        
        if (!city.trim().length) throw Error('city cannot be empty')
        
        if (typeof address !== 'string') throw TypeError(address + ' is not a string')
        
        if (!address.trim().length) throw Error('address cannot be empty')
        
        if (typeof category !== 'string') throw TypeError(category + ' is not a string')
        
        if (!category.trim().length) throw Error('category cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/create-event`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 

            },
            body: JSON.stringify({ title, description, date, city,address, category })
        })
        .then(response => response.json())
        .then(response => {
            return response

            //throw Error(response.Error)
        })
    },

    listEventsByQuery(query,token){
        if (typeof query !== 'string') throw TypeError(query + ' is not a string')
        
        if (!query.trim().length) throw Error('query cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/events/query/${query}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 

            },
        })
        .then(response => response.json())
        .then(response =>  {
            const{error} = response

            if(error)throw Error(error)

            return response
        })   
    },

    listEventsByCategory(categoryId,token){
        if (typeof categoryId !== 'string') throw TypeError(categoryId + ' is not a string')
        
        if (!categoryId.trim().length) throw Error('categoryId cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/events/${categoryId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 
            },
        })
        .then(response => response.json())
        .then(response => {
            return response
        })
    },

    listEventById(eventId,token){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/event/${eventId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 
            },
        })
        .then(response => response.json())
        .then(response => {
        
            return response
        })   
    },

    createComment(eventId,text,token){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        if (typeof text !== 'string') throw TypeError(text + ' is not a string')
        
        if (!text.trim().length) throw Error('text cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/add-comment/${eventId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 

            },
            body: JSON.stringify({ text })
        })
        .then(response => response.json())
        .then(response => {
            return response

            //throw Error(response.Error)
        })
    },

    listComments(eventId,token){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/list-comments/${eventId}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 
            },
        })
        .then(response => response.json())
        .then(response => {
            return response
        })
    },

    deleteComment(eventId,commentId,token){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')
        
        if (!eventId.trim().length) throw Error('eventId cannot be empty')

        if (typeof commentId !== 'string') throw TypeError(commentId + ' is not a string')

        if (!commentId.trim().length) throw Error('commentId cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')
        return fetch(`${this.url}/delete-comment/${eventId}/${commentId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}` 
            },
        })

        .then(response => response.json())
        .then(response => response)
        
    },

    toogleEvent(eventId,token){
        if (typeof eventId !== 'string') throw TypeError(eventId + ' is not a string')

        if (!eventId.trim().length) throw Error('eventId cannot be empty')
        
        if (typeof token !== 'string') throw TypeError(token + ' is not a string')

        if (!token.trim().length) throw Error('token cannot be empty')

        return fetch(`${this.url}/toogle-event/${eventId}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${token}` 
            },
        })

        .then(response => response.json())
        .then(response => response)
        
    },

    updateImage(image,token){
        
        let formData = new FormData();
		formData.append('image', image);

		return fetch(`${this.url}/image`, {
			method: 'POST',
			headers: {
				authorization: `Bearer ${token}`,
			},
			body: formData,
		})
			.then(response => response.json())
			.then(response => {
				if (response.error) throw new Error(response.error);

				return response;
			});
	},
}

export default userApi