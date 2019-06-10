import React, { useState } from 'react'
import mainLogo from '../../images/logo.png'
import './index.sass'
import { Modal } from '../Modal'
import Toast from '../Toast'




function UserProfile({ getUser, updateUserData, updatedOk,updatedFail }) {


    let [imputError, setImputError] = useState(null)
    let [closeModal, setCloseModal] = useState(false)
    

    let { name, surname, email } = getUser

    

    function handleUpdate(e) {
       
        e.preventDefault()
        setCloseModal(true)
        

        const { name, surname, email } = e.target

        if (name && name.value) updateUserData({ name: name.value })

        else if (surname && surname.value) updateUserData({ surname: surname.value })

        else if (email && email.value) updateUserData({ email: email.value })
        
        else { setImputError("Nothing to Update") }

        document.getElementById("updateUserName").reset();
        document.getElementById("updateUserSurname").reset();
        document.getElementById("updateUserEmail").reset();

    }



    return <div class="userProfileContainer">

        <div class="box" id="userProfile">

            <img src={mainLogo} className="mainLogo" ></img>
            <div class="control">
                Name
            <form id="updateUserName" onSubmit={handleUpdate}>
                    <input class="input" type="text" name="name" placeholder={name} />
                    <button class="button is-success" onClick={() => setImputError(null)} >Update</button>
                </form>
            </div>
            <div class="control">
                Surname
            <form id="updateUserSurname" onSubmit={handleUpdate}>
                    <input class="input" type="text" name="surname" placeholder={surname} />
                    <button class="button is-success" onClick={() => setImputError(null)} >Update</button>
                </form>
            </div>
            <div class="control">
                Email
            <form id="updateUserEmail" onSubmit={handleUpdate}>
                    <input class="input" type="text" name="email" placeholder={email} />
                    <button class="button is-success" onClick={() => setImputError(null)} >Update</button>
                </form>
            </div>
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