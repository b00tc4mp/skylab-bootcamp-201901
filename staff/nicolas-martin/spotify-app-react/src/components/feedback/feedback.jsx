'use strict'
// Feedback receive props as parameter
function Feedback({ message, level }) {
    return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
}