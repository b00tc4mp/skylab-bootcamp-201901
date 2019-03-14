import React from 'react'

function ResultsTest({ failures }) {

    return (
        <section className="results-test">

            {/* <section className="results-test__passes">
                <h4 className="results-test__passes__header">Passes</h4>
                {passes.length && passes.map((item, index) => <li key={index} className="help">{item.err.message}</li>)}
            </section> */}

            <section className="results-test__fails">
                {failures.map((test, index) => <li key={index}>{test.err.message}</li>)}
            </section>

        </section>
    )
}

export default ResultsTest