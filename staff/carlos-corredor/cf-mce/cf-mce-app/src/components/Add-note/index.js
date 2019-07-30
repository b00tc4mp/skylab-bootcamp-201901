import React from 'react'
import './index.sass'


function AddNote ({id, handleAddNote, error}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        const text = e.target.text.value ? e.target.text.value : null

        handleAddNote(id, text)
    }

    return (
        <>
         <section className='add-notes'>
            <h3>Add new note</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="inputText">Note</label>
                    <textarea  id="inputText" name="text" rows="3" cols="70" placeholder="ej. Observations"></textarea>
                </div>
                <div>
                    <button class="btn btn-light" type="submit">Add</button>
                    <span>{error}</span>
                </div>
                
            </form>
            {/* <span>Customer id: {id} &nbsp; </span> */}
        </section>
        </>
    )
}

export default AddNote


// import React from 'react'

// function Register () {

//     return (
//         <>
    
//         </>
//     )
// }

// export default Register