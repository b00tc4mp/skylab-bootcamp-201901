import React from 'react'

function User({ onUpdate, onDelete, error, user }) {
    const { name, surname, email } = user

    function handleUpdateSubmit(e) {
        e.preventDefault()

        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email }
        } = e.target

        onUpdate(name, surname, email)
    }

    function handleDeleteSubmit(e) {
        e.preventDefault()

        const {
            email: { value: email },
            password: { value: password}
        } = e.target

        onDelete(email, password)
    }

    return <section>
        <h2>Update User</h2>
        <form onSubmit={handleUpdateSubmit}>
            <input type="text" name="name" placeholder={name}/>
            <input type="text" name="surname" placeholder={surname}/>
            <input type="email" name="email" placeholder={email}/>
            <button>Update</button>
            <span>{error}</span>
        </form>

        <h2>Detele User</h2>
        <form onSubmit={handleDeleteSubmit}>
            <input type="email" name="email" placeholder={email} />
            <input type="password" name="password"/>
            <button>Delete</button>
            <span>{error}</span>
        </form>
    </section>
}

export default User