import React from 'react'
import logo from '../../assets/images/logoGreen.png'
import Uikit from 'uikit/dist/js/uikit.min.js'
import './index.css'

function Navbar({
    user,
    device,
    onLogout,
    deviceStatus,
    deviceList,
    onDeviceSelect,
    onDeviceAdd,
    onDeviceDelete,
    onDeviceRefresh,
    onUserUpdate,
    onUserDelete
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

    const refreshDevice = (e) => {
        e.preventDefault()
        Uikit.modal('#refresh-modal').hide();
        onDeviceRefresh(device.name, e.target.time.value)
    }

    const deleteDevice = (e) => {
        e.preventDefault()
        Uikit.modal('#delete-modal').hide();
        onDeviceDelete(device.name)
    }

    const logout = (e) => {
        e.preventDefault()
        Uikit.modal('#profilePreferences').hide();
        onLogout()
    }

    const retrieveDevice = (e,name) =>{
        e.preventDefault()
        Uikit.dropdown('#deviceDropdown').hide();
        onDeviceSelect(name)
    }

    const deleteUser = (e) => {
        e.preventDefault()
        Uikit.modal('#delete-user').hide();
        onUserDelete()
    }

    return <div data-uk-sticky>
        <nav className="navbar-container uk-navbar uk-sticky" data-uk-navbar>
            <div className="uk-navbar-left uk-margin-left uk-visible@s">
                <img alt='WOTcon logo' width="31" height="32" src={logo} />
            </div>
            <div className="uk-navbar-left uk-margin-left-small uk-hidden@s">
                <div className="uk-navbar-item uk-text-center">
                    <a href="" className="uk-navbar-item uk-logo uk-center" >
                        {device && <div  data-uk-scrollspy="cls:uk-animation-fade" >{device.name}<div className="uk-navbar-subtitle">{device.ip} - {deviceStatus}</div></div>}
                    </a>
                </div>
            </div>
            <div className="uk-navbar-center uk-visible@s">
                {device && <div data-uk-scrollspy="cls:uk-animation-fade" >
                    <a href="" data-uk-toggle="target: #refresh-modal"><span className="uk-padding uk-icon-link" data-uk-icon="future"></span></a>
                </div>}
                <div className="uk-navbar-item uk-text-center">
                    <a href="" className="uk-navbar-item uk-logo uk-center" >
                        {device && <div  data-uk-scrollspy="cls:uk-animation-fade" >{device.name}<div className="uk-navbar-subtitle">{device.ip} - {deviceStatus}</div></div>}
                    </a>
                </div>
                {device && <div data-uk-scrollspy="cls:uk-animation-fade" >
                    <a href=" " data-uk-toggle="target: #delete-modal"><span className="uk-padding uk-icon-link" data-uk-icon="trash"></span></a>
                </div>}
            </div>

            <div className="uk-navbar-right">
                <ul className="uk-navbar-nav">
                    <li>
                        <a href=" " onClick={(e) => e.preventDefault()}>Devices</a>
                        <div id="deviceDropdown" className="uk-navbar-dropdown" >
                            <ul className="uk-nav uk-dropdown-nav">
                                {deviceList && (
                                    deviceList.map(name => {
                                        return <li key={name} ><a href=" " onClick={(e) => retrieveDevice(e, name)} >{name}</a></li>
                                    })
                                )}
                                <li className="uk-nav-divider"></li>
                                <li><a href=" " data-uk-toggle="target: #newDevice">Add device</a></li>
                            </ul>
                        </div>
                    </li>
                    <li><a href=" " data-uk-toggle="target: #profilePreferences">Profile</a></li>
                </ul>
            </div>
        </nav>

        <div id="profilePreferences" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Profile update</h2>
                <form className="uk-form-stacked" onSubmit={event => updateUser(event)}>
                    <input className="uk-input uk-form-small" type="text" name="name" placeholder={user && user.name} />
                    <input className="uk-input uk-form-small" type="text" name="surname" placeholder={user && user.surname} />
                    <input className="uk-input uk-form-small" type="text" name="email" placeholder={user && user.email} />
                    <div className="uk-flex uk-flex-between uk-position-medium">
                        <div>
                            <button className="uk-button uk-button-default">Update</button>
                        </div>
                        <div>
                            <a href=" " onClick={(e) => logout(e)}>Logout</a>
                        </div>
                        <div>
                            <button data-uk-toggle="target: #delete-user" className="uk-button uk-button-danger" type="button" >delete</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

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

        <div id="delete-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Delete device</h2>
                <p>Are you sure to delete the current device?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button className="uk-button uk-button-danger" type="button" onClick={(e) => deleteDevice(e)} >delete</button>
                </p>
            </div>
        </div>

        <div id="delete-user" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Delete user</h2>
                <p>Are you sure to delete {user ? user.email : ('current user')}?</p>
                <p className="uk-text-right">
                    <button className="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
                    <button className="uk-button uk-button-danger" type="button" onClick={(e) => deleteUser(e)} >delete</button>
                </p>
            </div>
        </div>

        <div id="refresh-modal" data-uk-modal>
            <div className="uk-modal-dialog uk-modal-body">
                <h2 className="uk-modal-title">Refresh device</h2>
                <form  onSubmit={event => refreshDevice(event)}>
                    <label className="uk-form-label" >time interval: </label>
                    <input className="uk-input uk-form-small uk-form-width-small" type="text" name="time" placeholder='miliseconds' />
                    <p className="uk-text-right">
                        <button className="uk-button uk-button-default uk-modal-close" type="button" >Cancel</button>
                        <button className="uk-button uk-button-primary">Update</button>
                    </p>
                </form>
            </div>
        </div>

    </div>


}

export default Navbar