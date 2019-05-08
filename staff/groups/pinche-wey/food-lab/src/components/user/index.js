import React from 'react'
import './index.sass'

function User({ user, onUpdate, onBack, random }) {

    function handleSubmit (event) {
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

        onUpdate({ name: name, surname: surname, comment: comment, age: age, photoUrl: image }, random)
    };


    return <section className='user'>
        <header className='user__header'>
            <h2 className='user__header-title' >Hello, {user.name}.</h2>
            <button className='user__header-button' onClick={() => onBack()} >Go back</button>
        </header>
        <form className='user__form' onSubmit={handleSubmit} >

            <div className='user__form-inputs'>
                <label>Name:</label>
                <input type='text' name="name" placeholder={user.name} />
            </div>
            <div className='user__form-inputs'>
                <label>Surname:</label>
                <input type='text' name="surname" placeholder={user.surname} />
            </div>
            <div className='user__form-inputs'>
                <label>Age:</label>
                <input type='text' name="age" placeholder={user.age ? user.age : "Introduce your age"} />

            </div>

            <div>
                <label>Photo:</label>
                <input type='text' name="image" placeholder={user.photoUrl} />
            </div>
            <div>
            <label>About me:</label>
                <input type='text' name="comment" placeholder={!user.comment ? 'Put comments..' : user.comment} />
            </div>
            <button onSubmit={() => handleSubmit()} className='user__button' >Confirm</button>

        </form>




        {/* <img src='' alt="User's photo" className='user__img' />
    <p>Configuración</p> */}
    </section>




}

export default User