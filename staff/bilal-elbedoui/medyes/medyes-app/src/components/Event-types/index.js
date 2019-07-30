import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './index.sass'



export function EventTypes({ selectedType }) {

    const selectType = (event) => {
        const getType = event.target.value

        selectedType(getType)
    }

    return (

        <div>
            <div class="uk-form-controls">
                <select name="eventType" class="uk-select" id="form-stacked-select" onChange={selectType}>
                    <option value="">Select Type</option>
                    <option value="Conference">Conference</option>
                    <option value="Congress">Congress</option>
                    <option value="Course">Course</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Summit">Summit</option>
                    <option value="Symposium">Symposium</option>
                    <option value="Workshop">Workshop</option>
                </select>
            </div>
        </div>


    )
}