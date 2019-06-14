import React from 'react'
import './index.sass'


function FindCustomer () {

    return (
        <>
         <section className='find-customer'>
            <h1>FindCustomer component</h1>
            <form>
                <div>
                    <div>
                        <label for="inputCriteriaCustomerNid">Search by nid</label>
                        <select id="inputCriteriaCustomerNid">
                            <option></option>
                            <option>nid</option>
                        </select>
                        <input type="text" id="inputNid" placeholder="ej. V-555.555.555"/>
                    </div>
                    <div>
                        <label for="inputCriteriaCustomerAnother1">Another field</label>
                        <select id="inputCriteriaCustomerAnother1">
                            <option></option>
                            <option>name</option>
                            <option>surname</option>
                            <option>phone</option>
                            <option>address</option>
                            <option>email</option>
                        </select>
                        <input type="text" id="inputAnother1" ></input>
                    </div>
                    <div>
                        <label for="inputCriteriaCustomerAnother2">Another field</label>
                        <select id="inputCriteriaCustomerAnother2">
                            <option></option>
                            <option>name</option>
                            <option>surname</option>
                            <option>phone</option>
                            <option>address</option>
                            <option>email</option>
                        </select>
                        <input type="text" id="inputAnother2" ></input>
                    </div>
                    <div>
                        <label for="inputCriteriaCustomerAnother3">Another field</label>
                        <select id="inputCriteriaCustomerAnother3">
                            <option></option>
                            <option>name</option>
                            <option>surname</option>
                            <option>phone</option>
                            <option>address</option>
                            <option>email</option>
                        </select>
                        <input type="text" id="inputAnother3" ></input>
                    </div>
                    <div>
                        <label for="inputCriteriaCustomerAnother4">Another field</label>
                        <select id="inputCriteriaCustomerAnother4">
                            <option></option>
                            <option>name</option>
                            <option>surname</option>
                            <option>phone</option>
                            <option>address</option>
                            <option>email</option>
                        </select>
                        <input type="text" id="inputAnother4" ></input>
                    </div>
                    <div>
                        <label for="inputCriteriaCustomerAnother5">Another field</label>
                        <select id="inputCriteriaCustomerAnother5">
                            <option></option>
                            <option>name</option>
                            <option>surname</option>
                            <option>phone</option>
                            <option>address</option>
                            <option>email</option>
                        </select>
                        <input type="text" id="inputAnother5" ></input>
                    </div>
                </div>
                <div>
                    <button class="btn btn-light" type="submit">Search</button>
                </div>
            </form>
        </section>
        </>
    )
}

export default FindCustomer


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register