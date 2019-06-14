import React, {Component, Fragment} from 'react'
import SideBar from '../SideBar'
import './index.sass'
import { toast } from 'react-toastify';

class ContactForm extends Component {
    state = { subject: '', country: '', text: '' }

    handleSubjectInput = (event) => this.setState({subject: event.target.value})
    handleCountryInput = (event) => this.setState({country: event.target.value})
    handleTextInput = (event) => this.setState({text: event.target.value})

    handleFormSubmit = (event) => {
        event.preventDefault()
        toast.info("Message sent, thanks for contacting us", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 1500
          });

        //TODO contact and save message
    }
    
    render() {
        return (
            <Fragment>
                <div className="coverright">
                    <div className="formcontact">
                        <form action="" onSubmit={this.handleFormSubmit}>
                            <label htmlFor="fname">Subject</label>
                            <input type="text" id="fname" name="firstname" placeholder="Subject.." onChange={this.handleSubjectInput} required/>
                            <label htmlFor="country" >Zone</label>
                            <select onChange={this.handleCountryInput} id="country" name="country">
                                <option value="Europe">Europe</option>
                                <option value="America">America</option>
                                <option value="Asia">Asia</option>
                                <option value="Africa">Africa</option>
                                <option value="Oceania">Oceania</option>
                            </select>
                            <label htmlFor="subject">Description</label>
                            <textarea id="subject" name="subject" placeholder="Write something.." onChange={this.handleTextInput} required></textarea>
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