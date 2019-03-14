import React from 'react'

function ResultsTest({ failures, passes }) {
    
    return (
        <section className="results-test">

            {/* <section className="results-test__passes">
                <h4 className="results-test__passes__header">Passes</h4>
                {passes.length && passes.map((item, index) => <li key={index} className="help">{item.err.message}</li>)}
            </section> */}

            <section className="results-test__fails">
                <h4 className="results-test__fails__header">Fails</h4>
                {failures.length && failures.map((item, index) => <li key={index} className="help">{item.err.message}</li>)}
            </section>

        </section>
    )
}

export default ResultsTest