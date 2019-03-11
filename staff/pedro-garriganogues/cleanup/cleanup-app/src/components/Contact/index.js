import React, { Component } from 'react'
import './index.css'


class Contact extends Component {



    render() {
        return (
            <main >

                <h1 className="title">Contact:</h1>

                <table className="table">
                    <tr>
                        <th>Name:</th>
                        <th>Position:</th>
                        <th>Telephone:</th>
                    </tr>
                    <tr>
                        <td>Jill Smith</td>
                        <td>Manager</td>
                        <td>50 000 000</td>
                    </tr>
                    <tr>
                        <td>Eve Smith</td>
                        <td>Sales</td>
                        <td>94 000 000</td>
                    </tr>
                    <tr>
                        <td>Adam Smith</td>
                        <td>PR</td>
                        <td>67 000 000</td>
                    </tr>
                </table>

                <p className="text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </main>
        )
    }

}

export default Contact