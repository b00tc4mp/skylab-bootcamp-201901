import React from 'react'

function ResultsTest({ failures }) {

    return (
        <section className="results-test">

            <section className="results-test__fails">
                {failures.map((test, index) => {
                        let message = test.err.message.toString()
                        let postLineBreak = message.indexOf('\n')

                        postLineBreak = (postLineBreak === -1)? message.length : postLineBreak
                        return <li className="results-test__fails__item" key={index}><i className='material-icons'>error</i>{
                            message.slice(0, postLineBreak)
                        }</li>
                })}
            </section>

        </section>
    )
}

export default ResultsTest