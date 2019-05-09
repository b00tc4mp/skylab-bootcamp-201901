import React from 'react'
import './index.sass'

function SearchTitle({query}) {
    return <section class="hero hero-background">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          {query}
        </h1>
        <h2 class="subtitle">
          Cocktail-Searcher
        </h2>
      </div>
    </div>
  </section>
}


export default SearchTitle