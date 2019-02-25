import React from 'react'

const Forms = (props) =>  {
    return (
        <div className="mb-3">
            <label htmlFor="username">{props.label}</label>
            <div className="input-group">
                <input type={props.type} className="form-control" name="address" placeholder={props.placeholder} onChange={props.captureInput} value={props.inputField} />
            </div>
        </div>
    )
}

export default Forms