import React, { Component } from 'react';

function Songs({ results }) {
    return <section>
        <ul>
            {results.map(({ name, preview_url }) => <li>
                {name}
                <audio src={preview_url} controls ></audio>
            </li>)}
        </ul>
    </section>

}

export default Songs;