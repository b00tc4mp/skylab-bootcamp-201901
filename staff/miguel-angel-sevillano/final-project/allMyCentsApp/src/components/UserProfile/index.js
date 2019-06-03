import React ,{useState} from 'react'





function UserProfile({getUser}) {

    

    let{name,surname,email,password}=getUser


    return <>
    <p></p>

        <div class="control">
            Name<input class="input" type="text" placeholder={name} disabled/>
        </div>
        <div class="control">
            Username<input class="input" type="text" placeholder={surname} disabled/>
        </div>
        <div class="control">
            Email<input class="input" type="text" placeholder={email} disabled/>
        </div>
        <div class="control">
            Password<input class="input" type="text" placeholder={password} disabled/>
        </div>
        </>


}

export default UserProfile