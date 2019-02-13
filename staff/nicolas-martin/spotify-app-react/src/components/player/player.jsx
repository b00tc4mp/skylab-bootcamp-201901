'use strict'

function Player({ track: { url, title } }) {
    return <section className="player">
        <h5>{title}</h5>
        <audio src={url} controls />
    </section>
}