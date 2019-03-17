import React from 'react'

function ResultsTest({ failures }) {

    return (
        <section className="results-test">

            <section className="results-test__fails">
                {failures.map((test, index) => <li className="results-test__fails__item" key={index}><i className='material-icons'>error</i>{test.err.message}</li>)}
            </section>

        </section>
    )
}

export default ResultsTest