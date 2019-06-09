import React from 'react'
import logo from '../../assets/images/logoGreen.png'
import Uikit from 'uikit/dist/js/uikit.min.js'

function Navbar({
    onLogout,
    onUserUpdate,
    onDeviceAdd,
    deviceList,
    onDeviceSelect
}) {

    const updateUser = (e) => {
        e.preventDefault()
        Uikit.modal('#profilePreferences').hide();
        const {
            name: { value: name },
            surname: { value: surname },
            email: { value: email },
        } = e.target
        e.target.name.value=''
        e.target.surname.value=''
        e.target.email.value=''
        onUserUpdate({name, surname, email})
    }

    const retrieveDevice = (e,name) =>{
        e.preventDefault()
        Uikit.dropdown('#deviceDropdown').hide();
        onDeviceSelect(name)
    }

    const addDevice = (e) => {
        e.preventDefault()
        Uikit.modal('#newDevice').hide();
        const {
            name: { value: name },
            ip: { value: ip },
            port: { value: port },
            time: { value: time }
        } = e.target
        e.target.name.value=''
        e.target.ip.value=''
        e.target.port.value=''
        e.target.time.value=''
        onDeviceAdd(name, ip, port, time)
    }

    return <div>
        <nav className="uk-navbar-container" data-uk-navbar>
            <div className="uk-navbar-left uk-margin-left">
                <img width="31" height="32" src={logo} alt="WOTcontrol" />
            </div>
            <div className="uk-navbar-center">
                <ul className="uk-navbar-nav">
                    <li><a data-uk-toggle="target: #profilePreferences">Profile</a></li>
                    <li>
                        <a href="#">Devices</a>
                        <div id="deviceDropdown" className="uk-navbar-dropdown" >
                            <ul className="uk-nav uk-dropdown-nav">
                                {deviceList && (
                                    deviceList.map(name => {
                                        return <li key={name} onClick={(e) => retrieveDevice(e,name)} >{name}</li>
                                    })
                                )}
                                <li className="uk-nav-divider"></li>
                                <li><a data-uk-toggle="target: #newDevice">Add device</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

            <div className="uk-navbar-right">
                <div className="uk-navbar-item">
                    <div><a onClick={onLogout}>Logout</a></div>
                </div>
            </div>
        </nav>

        <div id="newDevice" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">New Device</h2>
                <form className="uk-form-stacked" onSubmit={event => addDevice(event)}>
                    <input className="uk-input uk-form-small" type="text" name="name" placeholder="Device name" />
                    <input className="uk-input uk-form-small" type="text" name="ip" placeholder="Device ip" />
                    <input className="uk-input uk-form-small" type="number" name="port" placeholder="Device port" />
                    <input className="uk-input uk-form-small" type="number" name="time" placeholder="input update time(ms)" />
                    <div><button className="uk-button uk-button-default">Add</button></div>
                </form>
            </div>
        </div>

        <div id="profilePreferences" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Profile update</h2>
                <form className="uk-form-stacked" onSubmit={event => updateUser(event)}>
                    <input className="uk-input uk-form-small" type="text" name="name" placeholder='name' />
                    <input className="uk-input uk-form-small" type="text" name="surname" placeholder='surname' />
                    <input className="uk-input uk-form-small" type="text" name="email" placeholder='email' />
                    <div><button className="uk-button uk-button-default">Update</button></div>
                </form>
            </div>
        </div>
    </div>


}

export default Navbar