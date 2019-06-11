import React, { useState } from 'react'
import mainLogo from '../../images/logo.png'
import './index.sass'
import { Modal } from '../Modal'
import Toast from '../Toast'




function UserProfile({ getUser, updateUserData, updatedOk, updatedFail }) {


    let [imputError, setImputError] = useState(null)
    let [closeModal, setCloseModal] = useState(false)


    let { name, surname, email } = getUser



    function handleUpdate(e) {

        e.preventDefault()
        setCloseModal(true)
      

        const { name, surname, email } = e.target

        const updatedUser = {
            name: name.value || name.placeholder,
            surname: surname.value || surname.placeholder,
            email: email.value || null
        }

        if(!name.value && !surname.value& !email.value)setImputError("Nothing to Update")
        else if (updatedUser.email === email.placeholder) updatedUser.email = null
        
        if(typeof(imputError) === null ){
            updateUserData(updatedUser)
        }


        document.getElementById("updateUserForm").reset();
        /*    const { name, surname, email } = e.target
   
           if (name && name.value) updateUserData({ name: name.value })
   
           else if (surname && surname.value) updateUserData({ surname: surname.value })
   
           else if (email && email.value) updateUserData({ email: email.value })
           
           else { setImputError("Nothing to Update") }
   
           document.getElementById("updateUserName").reset();
           document.getElementById("updateUserSurname").reset();
           document.getElementById("updateUserEmail").reset(); */

    }



    return <div class="userProfileContainer">

        <div class="box" id="userProfile">

            <img src={mainLogo} className="mainLogo" ></img>

            <form id="updateUserForm" onSubmit={handleUpdate}>

                Name
                    <input class="input" type="text" name="name" placeholder={name} />
                Surname
                    <input class="input" type="text" name="surname" placeholder={surname} />
                Email
                    <input class="input" type="text" name="email" placeholder={email} />
                <div>
                    <button class="button is-success" onClick={() => setImputError(null)} >Update</button>
                </div>
            </form>

        </div>

        {typeof (imputError) === "string" && <Toast error={imputError} toastType="is-danger" />}
        {updatedOk && <Toast error={updatedOk} toastType="is-success" />}

        {closeModal && updatedFail && <Modal onClose={() => setCloseModal(false)} >
            <div>
                {updatedFail}
            </div>
        </Modal>} }
</div>

}

export default UserProfile