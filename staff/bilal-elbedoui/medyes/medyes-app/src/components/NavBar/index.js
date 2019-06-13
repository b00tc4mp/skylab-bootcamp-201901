import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logic from '../../logic'
import styles from './index.scss';
import { userInfo } from 'os';
import '../../../node_modules/bulma/bulma.sass'
import { FieldsToPost } from '../Fields-to-post'
import { TypesToPost } from '../Types-to-post'
import { async } from 'q';


export default function NavBar() {
    const [user, setUser] = useState([])
    const [modal, setModal] = useState('modal')
    const [modalOrg, setModalOrg] = useState('modal')
    const [response, setResponse] = useState(null)
    const [responseOrg, setResponseOrg] = useState(null)

    useEffect(() => {
        debugger
        (async function getUser() {
            const _user = await logic.retrieveUser()
            setUser(_user)
        })()
    }, [])


    const handleLogout = () => {

        logic.logout()
        window.location.href = '/'
    }

    const handleCreateEvent = (event) => {

        event.preventDefault()
        debugger
        const {
            title: { value: title },
            description: { value: description },
            medicalField: { value: medicalField },
            eventType: { value: eventType },
            country: { value: country },
            city: { value: city },
            address: { value: address },
            date: { value: date },
            numberTicketsAvailable: { value: numberTicketsAvailable },
            price: { value: price },
            image: { value: image }
        } = event.target


        return (async () => {
            try {
                const { data: { message } } = await logic.createEvent(title, description, medicalField, eventType, { country, city, address }, date, numberTicketsAvailable, price, image)

                setResponse(message)
            } catch (err) {
                setResponse(err)
            }
        })()
    }

    const handleCreateOrganization = (event) => {
        event.preventDefault()

        const {
            name: { value: name },
            phone: { value: phone },
            address: { value: address },
            mail: { value: mail }
        } = event.target

        return (async () => {
            try {
                debugger
                const { data: { message } } = await logic.createOrganization(name, phone, address, mail)
                debugger
                setResponseOrg(message)
            } catch ({ message }) {
                debugger
                setResponseOrg(message)
            }
        })()
    }



    return (
        <div>

            <nav class="uk-navbar-container uk-margin" uk-navbar="mode: click">
                <div class="uk-navbar-left">

                    <ul class="uk-navbar-nav">
                        <li><a className="" onClick={() => window.location.href = '/home'}>Home</a></li>

                        {logic.isUserLoggedIn && (
                            <li><a className="">Profile</a></li>)}
                        
                        {logic.isUserLoggedIn && user.role === 'admin' && (
                        <li><a className="" onClick={() => setModal('modal is-active')}>Create event</a></li>)}

                        {logic.isUserLoggedIn && user.role === 'superAdmin' && (
                            <li><a className="" onClick={() => setModalOrg('modal is-active')}>Register an Organization</a></li>)}

                        {logic.isUserLoggedIn && (
                            <li><a className="" onClick={() => handleLogout()}>logOut</a></li>
                        )}

                    </ul>

                </div>

            </nav>

            
            <br/>
            <p className="salutation">Hello M. {user.fullname}</p>
            <br/>
           


            <div class={modalOrg}>
                <div class="modal-background"></div>
                <div class="modal-content">
                    <form onSubmit={handleCreateOrganization}>
                        <section className="box">

                            <div class="field">
                                <label class="label">Organization Name</label>
                                <div class="control">
                                    <input name="name" class="input" type="text" placeholder="name" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Phone</label>
                                <div class="control">
                                    <input name="phone" class="input" type="text" placeholder="phone" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Address</label>
                                <div class="control">
                                    <input name="address" class="input" type="text" placeholder="address" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Email</label>
                                <div class="control">
                                    <input name="mail" class="input" type="text" placeholder="Title" />
                                </div>
                            </div>
                            <p className='control'>
                                <button className='button is-info is-outlined'>Register the Organization</button>
                            </p>
                            {

                                responseOrg && <div className='message-body'>
                                    <p>{responseOrg}</p>
                                </div>

                            }
                        </section>
                    </form>
                </div>
                <button className='modal-close is-large' aria-label='close' onClick={() => setModalOrg('modal')} />
            </div>




            <div class={modal}>
                <div class="modal-background"></div>
                <div class="modal-content">
                    <form onSubmit={handleCreateEvent}>
                        <section className="box">

                            <div class="field">
                                <label class="label">Title</label>
                                <div class="control">
                                    <input name="title" class="input" type="text" placeholder="Title" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Description</label>
                                <div class="control">
                                    <textarea name="description" class="input" type="text" placeholder="Description"></textarea>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Select the medical field please</label>
                                <div class="control">
                                    <div class="control">
                                        <div class="select">
                                            <select name="medicalField" class="is-focused">
                                                <option value="">Select Speciality</option>
                                                <option value="5cfe43a653cfaa49149d9f30">Allergology</option>
                                                <option value="5cfe43b053cfaa49149d9f31">Andrology</option>
                                                <option value="5cfe43b753cfaa49149d9f32">Anesthesiology</option>
                                                <option value="5cfe43be53cfaa49149d9f33">Cardiology</option>
                                                <option value="5cfe43c853cfaa49149d9f34">Cardiovascular Surgery</option>
                                                <option value="5cfe43d253cfaa49149d9f35">Chiropractic Medicine</option>
                                                <option value="5cfe43df53cfaa49149d9f36">Clinical Analyses</option>
                                                <option value="5cfe43e753cfaa49149d9f37">Clinical Biochemistry</option>
                                                <option value="5cfe43f153cfaa49149d9f38">Clinical Neurophysiology</option>
                                                <option value="5cfe43f853cfaa49149d9f39">Clinical Pharmacology</option>
                                                <option value="5cfe43ff53cfaa49149d9f3a">Dermatology</option>
                                                <option value="5cfe440653cfaa49149d9f3b">Emergency Medicine</option>
                                                <option value="5cfe440e53cfaa49149d9f3c">Endocrinology</option>
                                                <option value="5cfe441753cfaa49149d9f3d">Gastroenterology</option>
                                                <option value="5cfe441d53cfaa49149d9f3e">General Surgery</option>
                                                <option value="5cfe442353cfaa49149d9f3f">Geriatrics</option>
                                                <option value="5cfe442b53cfaa49149d9f40">Hematology and Hemotherapy</option>
                                                <option value="5cfe443353cfaa49149d9f41">Hepatology</option>
                                                <option value="5cfe443953cfaa49149d9f42">Immunology</option>
                                                <option value="5cfe443953cfaa49149d9f43">Intensive Medicine</option>
                                                <option value="5cfe446353cfaa49149d9f44">Internal Medicine</option>
                                                <option value="5cfe446b53cfaa49149d9f45">Labor Medicine</option>
                                                <option value="5cfe447553cfaa49149d9f46">Legal and forensic medicine</option>
                                                <option value="5cfe447e53cfaa49149d9f47">Medical Hydrology</option>
                                                <option value="5cfe449c53cfaa49149d9f48">Medical Oncology</option>
                                                <option value="5cfe44a453cfaa49149d9f49">Microbiology and Parasitology</option>
                                                <option value="5cfe44ac53cfaa49149d9f4a">Nephrology</option>
                                                <option value="5cfe44b253cfaa49149d9f4b">Neurology</option>
                                                <option value="5cfe44ba53cfaa49149d9f4c">Neurosurgery</option>
                                                <option value="5cfe44c753cfaa49149d9f4d">Nuclear Medicine</option>
                                                <option value="5cfe44d453cfaa49149d9f4e">Obstetrics and Gynecology</option>
                                                <option value="5cfe44dc53cfaa49149d9f4f">Odontology</option>
                                                <option value="5cfe44e453cfaa49149d9f50">Ophthalmology</option>
                                                <option value="5cfe44ed53cfaa49149d9f51">Oral and Maxilofacial Surgery</option>
                                                <option value="5cfe44f653cfaa49149d9f52">Orthopaedic Surgery</option>
                                                <option value="5cfe44ff53cfaa49149d9f54">Otorhinolaryngology</option>
                                                <option value="5cfe450753cfaa49149d9f55">Pathology</option>
                                                <option value="5cfe452353cfaa49149d9f56">Pediatric Surgery</option>
                                                <option value="5cfe452b53cfaa49149d9f58">Physical Medicine and Rehabilitation</option>
                                                <option value="5cfe455653cfaa49149d9f59">Plastic Surgery</option>
                                                <option value="5cfe456153cfaa49149d9f5a">Preventive medicine</option>
                                                <option value="5cfe458a53cfaa49149d9f5b">Psychiatry</option>
                                                <option value="5cfe459253cfaa49149d9f5c">Pulmonology</option>
                                                <option value="5cfe459c53cfaa49149d9f5d">Radiation Oncology</option>
                                                <option value="5cfe45a353cfaa49149d9f5e">Radiology</option>
                                                <option value="5cfe45b153cfaa49149d9f5f">Rheumatology</option>
                                                <option value="5cfe45bd53cfaa49149d9f60">Sports Medicine</option>
                                                <option value="5cfe45c553cfaa49149d9f61">Thoracic Surgery</option>
                                                <option value="5cfe45d753cfaa49149d9f62">Urology</option>
                                                <option value="5cfe45e053cfaa49149d9f63">Vascular Surgery</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Select the event type please</label>
                                <div class="control">
                                    <div class="control">
                                        <div class="select">
                                            <select name="eventType" class="is-focused">
                                                <option value="">Select Type</option>
                                                <option value="5cfe487b53cfaa49149d9f64">Conference</option>
                                                <option value="5cfe488753cfaa49149d9f65">Congress</option>
                                                <option value="5cfe489353cfaa49149d9f66">Course</option>
                                                <option value="5cfe489953cfaa49149d9f67">Meeting</option>
                                                <option value="5cfe489f53cfaa49149d9f68">Seminar</option>
                                                <option value="5cfe48a653cfaa49149d9f69">Summit</option>
                                                <option value="5cfe48b453cfaa49149d9f6a">Symposium</option>
                                                <option value="5cfe48ba53cfaa49149d9f6b">Workshop</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Location</label>
                                <label class="label">Country</label>
                                <div class="control">
                                    <input name="country" class="input" type="text" placeholder="country" />
                                </div>
                                <label class="label">City</label>
                                <div class="control">
                                    <input name="city" class="input" type="text" placeholder="city" />
                                </div>
                                <label class="label">Address</label>
                                <div class="control">
                                    <input name="address" class="input" type="text" placeholder="address" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Date</label>
                                <div class="control">
                                    <input name="date" class="input" type="date" placeholder="date" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Available tickets</label>
                                <div class="control">
                                    <input name="numberTicketsAvailable" class="input" type="number" placeholder="600" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Price</label>
                                <div class="control">
                                    <input name="price" class="input" type="number" placeholder="600" />
                                </div>
                            </div>

                            <div class="field">
                                <label class="label">Image</label>
                                <div class="control">
                                    <input name="image" class="input" type="text" placeholder="http://url" />
                                </div>
                            </div>

                            <p className='control'>
                                <button className='button is-info is-outlined'>Create an Event</button>
                            </p>
                            {

                                response && <div className='message-body'>
                                    <p>{response}</p>
                                </div>

                            }
                        </section>
                    </form>
                </div>
                <button className='modal-close is-large' aria-label='close' onClick={() => setModal('modal')} />
            </div>

        </div>

    )
}