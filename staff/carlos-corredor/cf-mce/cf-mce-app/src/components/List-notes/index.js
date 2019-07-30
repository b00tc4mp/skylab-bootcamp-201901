import React from 'react'
import './index.sass'
import Box1 from '../Box-1'

function ListNotes ({customerNotes}) {

    return (
        <>
         <section className='list-notes'>
         <ul>
                {
                    customerNotes.map(({ text, date, author }) =>{

                        return <section>
                            <li key={author} >
                                <span >
                                 <Box1 text1={'Note:'} text2={text} />
                                    {/* {text && <span>Note: {text} &nbsp; </span>} */}
                                    {/* {date && <span>Date: {date} &nbsp; </span>}
                                    {author && <span>Author: {author} &nbsp; </span>} */}
                                </span>
                            </li>
                        </section>
                    })
                }
            </ul>
            {/* <button>List Notes</button> */}
        </section>
        </>
    )
}

export default ListNotes


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register