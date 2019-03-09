import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import './index.sass'

class ContactForm extends Component {

    render() {
        return (
            <Fragment>
                <div className="coverright">
                    <div className="formcontact">
                        <form action="">
                            <label htmlFor="fname">Subject</label>
                            <input type="text" id="fname" name="firstname" placeholder="Your name.." required/>
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country">
                                <option value="Europe">Europe</option>
                                <option value="America">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Africa">Africa</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                            <label htmlFor="subject">Description</label>
                            <textarea id="subject" name="subject" placeholder="Write something.." required></textarea>

                            <div className="buttonContainer">
                                <button className="btn btn-success" type="submit" value="Submit"> Submit </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default ContactForm;