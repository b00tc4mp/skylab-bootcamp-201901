import React from 'react'
import './index.sass'
import Title1 from '../Title-1'
import Space2 from '../Space-2'
import Errors from '../Errors'



function RegisterUser ({handleRegister, error}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        
        const name = e.target.name.value
        const surname = e.target.surname.value
        const email = e.target.email.value
        const password = e.target.password.value
        const category = e.target.category.value
        const passwordConfirm = e.target.passwordConfirm.value

        handleRegister(name, surname, email, password, category, passwordConfirm)
    }

    return (
        <>
         <section className='register-user'>
         <Space2 />
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-5"><Title1 title1='Register'/></div>
            </div>
            {/* <Space2 /> */}
            <form onSubmit={handleSubmit}>
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-5">
                    <label for="inputName">Name</label>
                    <input type="text" name="name" class="form-control" id="inputName" placeholder="ej. María"/>
                </div>
                <div class="form-group col-md-5">
                    <label for="inputSurname">Surname</label>
                    <input type="text" name="surname" class="form-control" id="inputSurname" placeholder="ej. Pérez"/>
                </div>
                        
            </div>
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-5">
                    <label for="inputEmail">Email</label>
                    <input type="email" name="email" class="form-control" id="inputEmail" placeholder="ej. perezm@mail.com"/>
                </div>
                <div class="form-group col-md-5">
                    <label for="inputState">Category</label>
                    <select  name="category" id="inputState" class="form-control">
                        <option selected>...</option>
                        <option>ASSISTANT</option>
                        <option>MASTER</option>
                        <option>TECHNICIAN</option>
                    </select>
                </div>                        
            </div>
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-5">
                    <label for="inputPassword4">Password</label>
                    <input type="password" name="password" class="form-control" id="inputPassword4" placeholder=""/>
                </div>
                
                <div class="form-group col-md-5">
                    <label for="inputPassword4">Password Confirm</label>
                    <input type="password" name="passwordConfirm" class="form-control" id="inputPassword4" placeholder=""/>
                </div>
                        
            </div>

            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-1"><button type="submit" class="btn btn-light">Siguiente</button></div>
                <div class="form-group col-md-1"><Errors message={error}/><span></span></div>
            </div>
            </form>
        </section>
        </>
    )
}

export default RegisterUser


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register