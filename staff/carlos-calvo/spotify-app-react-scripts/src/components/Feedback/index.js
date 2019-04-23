import React, { Component } from 'react';

function Feedback({ message, level }) {
    return <section className={`alert alert-danger  ${`feedback ${level ? `feedback--${level}` : ''}`}`}  >{message}</section>
}


export default Feedback

