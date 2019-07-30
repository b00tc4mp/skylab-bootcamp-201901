import React, { useState } from 'react';
import { Link } from 'react-router-dom'


export function TypesToPost() {



    return (

        <div class="control">
            <div class="select">
                <select name="eventType" class="is-focused">
                    <option value="">Select Type</option>
                    <option value="5cfe487b53cfaa49149d9f64">Conference</option>
                    <option value="5cfe488753cfaa49149d9f65">Congress</option>
                    <option value="5cfe489353cfaa49149d9f66">Course</option>
                    <option value="5cfe489953cfaa49149d9f67">Meeting</option>
                    <option value="5cfe489f53cfaa49149d9f68">Seminar</option>
                    <option value="5cfe48a653cfaa49149d9f69">Summit</option>
                    <option value="5cfe48b453cfaa49149d9f6a">Symposium</option>
                    <option value="5cfe48ba53cfaa49149d9f6b">Workshop</option>
                </select>
            </div>
        </div>
    )
}