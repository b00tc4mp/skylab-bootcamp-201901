import React from 'react'
import './index.sass'


function RegisterCustomer ({handleRegisterCustomer, error}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        let name, surname, phone, address, nid, email, text
        name = e.target.name.value ? e.target.name.value : null
        surname = e.target.surname.value ? e.target.surname.value : null
        phone = e.target.phone.value ? e.target.phone.value : null
        address = e.target.address.value ? e.target.address.value : null
        nid = e.target.nid.value ? e.target.nid.value : null
        email = e.target.email.value ? e.target.email.value : null
        text = e.target.text.value ? e.target.text.value : null

        handleRegisterCustomer(name, surname, phone, address, nid, email, text)
    }

    return (
        <>
         <section className='register-customer'>
            <h3>Add new customer</h3>
            <form onSubmit={handleSubmit}>
                <div >
                    <div >
                        <label for="inputName">Name</label>
                        <input type="text" name="name" id="inputName" placeholder="ej. María" required/>
                    </div>
                    <div >
                        <label for="inputSurname">Surname</label>
                        <input type="text" name="surname" id="inputSurname" placeholder="ej. Pérez"/>
                    </div>    
                </div>
                <div>
                    <div >
                        <label for="inputPhone">Phone</label>
                        <input type="text" name="phone" id="inputPhone" placeholder="ej. 0415-555-riente"/>
                    </div>
                    <div >
                        <label for="inputAddress">Address</label>
                        <input type="text" name="address" id="inputAddress" placeholder="Av. ..."/>
                    </div>                        
                </div>
                <div >
                    <div >
                        <label for="inputNid">Nid</label>
                        <input type="text" name="nid" id="inputNid" placeholder="V-555.555.555" required/>
                    </div>
                    <div>
                        <label for="inputEmail">Email</label>
                        <input type="email" name="email" id="inputEmail" placeholder="ej. perezm@mail.com"/>
                    </div>                        
                </div>
                <div >
                    <div >
                        <label for="inputNote">Note</label>
                        <textarea rows="3" cols="30" name="text" id="inputNote"/>
                    </div>
                                           
                </div>

                <button type="submit" class="btn btn-light">Submit</button>
                <span>{error}</span>
            </form>
        </section>
        </>
    )
}

export default RegisterCustomer


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register