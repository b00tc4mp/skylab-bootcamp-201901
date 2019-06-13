import React from 'react'
import './index.sass'

function Landing({ onRegister, onLogin }) {

    return <main className="main-landing">
    
    <section className="hero hero-landing">
  <div className="hero-body">
    
        <section className="container">

            <div className="columns is-centered is-multiline">
            <div className="column is-narrow is-6">
            <div className="container">
      <h1 className="title">
        Welcome to TorToise GPS
      </h1>
      <h2 className="subtitle">
        Truck Tracking
      </h2>
    </div>
            </div>
            <div className="column is-narrow is-gapless"><button className="button is-dark is-outlined is-large is-rounded" onClick={() => onRegister()}>Register</button></div>
            <div className="column is-narrow is-gapless"><button className="button is-dark is-outlined is-large is-rounded" onClick={() => onLogin()}>Login</button></div>

            </div>
        </section>
        </div>
</section>

    </main>

}
export default Landing