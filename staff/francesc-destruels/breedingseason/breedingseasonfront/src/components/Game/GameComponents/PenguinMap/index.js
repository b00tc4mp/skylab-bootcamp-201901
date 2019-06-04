import React, { useContext, useState } from 'react'
import Penguin from '../Penguin'
import { GameContext } from "../../../GameContext"
import './index.sass'

function PenquinMap() {

    return (
        <div className="penguinMap game__Map">
            <div className="penguinMap__penguinRow" data-value="1">
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            </div>

            <div className="penguinMap__penguinRow" data-value="2">
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            </div>

            <div className="penguinMap__penguinRow" data-value="3">
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            </div>

            <div className="penguinMap__penguinRow" data-value="4">
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            <Penguin/>
            </div>

        <button>Send</button>
        </div>)
}

export default PenquinMap