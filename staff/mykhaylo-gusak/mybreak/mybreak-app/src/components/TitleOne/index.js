import React from 'react'
import ReactDOM from 'react-dom'
import './index.sass'
const cx = require('classnames');

function TitleOne ({text}) {

    return (<h1 className='m-TitleOne'>{text}</h1>);
}

export default TitleOne