import React from 'react'

import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

function AnswerForm({ manageSubmit, manageChange, answer }) {
    return (
        <form className="start__form" onSubmit={manageSubmit}>
                    <Editor
                    className='start__form__editor'
                    value={answer}
                    onValueChange={answer => manageChange(answer)}
                    highlight={answer => highlight(answer, languages.js)}
                    padding={10}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                        fontSize: 16,
                    }}
                    tabSize={4}
                    rows="10" 
                    required
                />

                <button className="start__form__button button is-warning">Send answer</button>
        </form>
    )
}

export default AnswerForm