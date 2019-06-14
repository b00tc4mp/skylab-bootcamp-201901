import React, { Component } from 'react'
import './index.css'


class About extends Component {



    render() {
        return (
            <section>

                <h1 className="title">About us:</h1>
                <p className="text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>


                <nav className="accordion arrows">
                    <header className="box">
                        <label htmlFor="acc-close" className="box-title">FAQ:</label>
                    </header>
                    <input type="radio" name="accordion" id="cb1" />
                    <section className="box">
                        <label className="box-title" htmlFor="cb1">FAQ 1:</label>
                        <label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </section>
                    <input type="radio" name="accordion" id="cb2" />
                    <section className="box">
                        <label className="box-title" htmlFor="cb2">FAQ 2:</label>
                        <label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </section>
                    <input type="radio" name="accordion" id="cb3" />
                    <section className="box">
                        <label className="box-title" htmlFor="cb3">FAQ 3:</label>
                        <label className="box-close" htmlFor="acc-close"></label>
                        <div className="box-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</div>
                    </section>

                    <input type="radio" name="accordion" id="acc-close" />
                </nav>
            </section>
        )
    }

}

export default About