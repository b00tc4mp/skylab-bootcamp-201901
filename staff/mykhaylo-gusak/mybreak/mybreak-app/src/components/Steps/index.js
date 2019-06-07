import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { } from '@fortawesome/free-solid-svg-icons';
import './index.sass'
import 'bulma-steps'


function Steps() {


    return (
        <>
            <ul class="steps is-small">
                <li class="step-item is-completed">
                    <div class="step-marker">
                        <span class="icon">
                            <i class="fa fa-check"></i>
                        </span>
                    </div>
                </li>
                <li class="step-item is-active">
                    <div class="step-marker"></div>
                </li>
                <li class="step-item">
                    <div class="step-marker">3</div>
                </li>
                <li class="step-item">
                    <div class="step-marker">
                        <span class="icon">
                            <i class="fa fa-flag"></i>
                        </span>
                    </div>
                </li>
            </ul>
        </>
    )


}

export default Steps