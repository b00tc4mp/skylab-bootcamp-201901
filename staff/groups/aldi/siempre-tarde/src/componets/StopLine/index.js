import React from 'react'
import literals from './literals'

function StopLine({lang, onRegister, onLogin}) {
    const {title1, title2, title3, back} = literals[lang]

    return <section>

    <div>
    <h1>{title1}</h1>
    <button>{back}</button>
    <select onChange={()=>console.log("avengers")}>
        <option value="1">111111111</option>
        <option value="2">222222222</option>
        <option value="3">333333333</option>
    </select>
    </div>

    <div>
    <h1>{title2}</h1>
    <button>{back}</button>
    <select onChange={()=>console.log("perico")}>
        <option value="21">111111111</option>
        <option value="22">444444444</option>
        <option value="33">332323213</option>
    </select>
    </div>,

    <div>
    <h1>{title3}</h1>
    <button>{back}</button>
    <select onChange={()=>console.log("change")}>
        <option value="1">111111111</option>
        <option value="2">222222222</option>
        <option value="3">333333333</option>
    </select>
    </div>
    </section>
}
export default StopLine