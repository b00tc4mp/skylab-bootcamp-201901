import React from 'react'

function User({ user, onUpdate, onBack }) {

    function handleSubmit(event) {
        event.preventDefault();
        let {
            name: { value: name },
            surname: { value: surname },
            age: { value: age },
            comment: { value: comment },
            image: { value: image }
        } = event.target

        if (name.length < 1) name = user.name
        if (surname.length < 1) surname = user.surname
        if (comment.length < 1) comment = user.comment
        if (image.length < 1) image = user.photoUrl
        if (user.age && age.length < 1) age = user.age

        onUpdate({ name: name, surname: surname, comment: comment, age: age, photoUrl: image })
    };


    return <section className='user'>
        <h2>Hello, {user.name}.</h2>
        <button onClick={() => onBack()} >go back</button>
        <form onSubmit={handleSubmit} >
            <input type='text' name="name" placeholder={user.name} />
            <input type='text' name="surname" placeholder={user.surname} />
            <input type='text' name="age" placeholder={user.age ? user.age : "Introduce your age"} />
            <input type='text' name="image" placeholder={user.photoUrl} />
            <input type='text' name="comment" placeholder={!user.comment ? 'Put comments..' : user.comment} />

            <button>Confirm</button>

        </form>




        {/* <img src='' alt="User's photo" className='user__img' />
    <p>Configuración</p> */}
    </section>




}

export default User