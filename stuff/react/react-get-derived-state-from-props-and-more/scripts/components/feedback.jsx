'use strict';

(() => {
    function Feedback({ message, level }) {
        return <section className={`feedback ${level ? `feedback--${level}` : ''}`}>{message}</section>
    }
    
    modules.export('feedback', Feedback)
})()