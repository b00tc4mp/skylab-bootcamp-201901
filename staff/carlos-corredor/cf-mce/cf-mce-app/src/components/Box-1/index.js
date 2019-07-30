import React from 'react'
import './index.sass'
import Sapace4 from '../Space-4'

function Box1 ({text1, text2}) {

    return (
        <>
         <section className='box-1'>
             <Sapace4 />
            
            <div class="form-row">
                <div class="form-group col-md-0.5"></div>
                <div class="form-group col-md-11">
                    <h5>{text1} {text2}</h5>
                </div>
            </div>
        </section>
        </>
    )
}

export default Box1


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register