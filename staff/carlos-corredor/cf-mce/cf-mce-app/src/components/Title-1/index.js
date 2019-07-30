import React from 'react'
import './index.sass'


function Title1 ({title1}) {

    return (
        <>
         <section className='title-1'>
            
            <div class="form-row">
                <div class="form-group col-md-1"></div>
                <div class="form-group col-md-5"><h3>{title1}</h3></div>
            </div>
        </section>
        </>
    )
}

export default Title1


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register