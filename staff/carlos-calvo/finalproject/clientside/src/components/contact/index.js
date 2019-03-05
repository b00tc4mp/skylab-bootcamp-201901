import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import './index.sass'

class ContactForm extends Component {

    render() {
        return (
            <Fragment>
                <div>
                    <SideBar/>
                </div>

                <div className="coverright rightsidebar">
                    <div className="formcontact">
                        <form action="">
                            <label htmlFor="fname">First Name</label>
                            <input type="text" id="fname" name="firstname" placeholder="Your name.."/>
                            <label htmlFor="lname">Last Name</label>
                            <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>
                            <label htmlFor="country">Country</label>
                            <select id="country" name="country">
                            <option value="Europe">Europe</option>
                            <option value="America">America</option>
                            <option value="Asia">Asia</option>
                            <option value="Africa">Africa</option>
                            <option value="Oceania">Oceania</option>
                            </select>
                            <label htmlFor="subject">Subject</label>
                            <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
                            <input type="submit" value="Submit"/>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default ContactForm;