import React from 'react'
import './index.sass'


function Errors ({message}) {

    return (
        <>
         {message && <section className='errors'>
            
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-11"><p>{message}</p></div>
            </div>
        </section>}
        </>
    )
}

export default Errors


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register