import React, { Component } from 'react'
import { toast } from 'react-toastify'
import logic from '../../logic'
import Select from 'react-select'
import storage from '../../firebase'
import {withRouter} from 'react-router-dom'

class CreateCongress extends Component {

    state = { ticketsNum: 1, artists: null, image: null }

    componentWillMount() {
        this.handleRetrieveArtist()
    }
    
    handleRetrieveArtist = () => { 
        logic.retrieveArtists()    
            .then(artists => {
                this.setState({ artists })  
            })
            .catch(error => console.log(error.message))
    }

    getImageURL = file => new Promise(function(resolve, reject) {
        const id = Date.now() 
        const storageRef = storage.ref(`congresses/${id}`) 
        const task = storageRef.put(file) 
    
        return task.on( "state_changed", 

            snapshot => { 
            }, 

            (error) => { 
                reject('error uploading the image...')
            },

            () => {
                    return task.snapshot.ref.getDownloadURL()
                            .then(downloadURL => {
                                resolve(downloadURL)
                            })
            })
    })

    submitCongress = (event) => {

        event.preventDefault()
  
        const name = event.target.name.value
        const description = event.target.description.value
        const category = event.target.category.value
        const address = event.target.address.value
        const city = event.target.city.value
        const hotel = event.target.hotel.value
        const startDate = event.target.startDate.value
        const endDate = event.target.endDate.value

        const artists = []
        for (let i = 0; i < event.target.artists.length; i++) {
            artists.push(event.target.artists[i].value )
        }
        
        const tickets = []
        let ticketsNumber = 0
        
        const eType = event.target.ticketType
        const ePrice = event.target.ticketPrice

        if ((eType.constructor !== RadioNodeList) && (ePrice.constructor !== RadioNodeList)) {
            tickets.push({ 
                type: eType.value, 
                price: parseFloat(ePrice.value)
            })

        } else {
        
            for (let i = 0; i < eType.length; i++) {
                tickets.push({ 
                    type: eType[i].value, 
                    price: parseFloat(ePrice[i].value)
                })
            }
        }  

        const congressData = {
            name,
            description,
            category,
            address,
            city,
            hotel,
            startDate,
            endDate,
            artists,
            tickets
        } 
        
        this.saveCongress(congressData)
    }

    saveCongress = congressData => {
        const image = this.state.image
        try {
            this.getImageURL(image)
                .then(imageURL => {
                    return logic.createCongress({...congressData, image: imageURL})
                            .then(() => {
                                toast('Congress created!')
                                this.props.history.push('/')
                            })
                            .catch(({ message }) => toast(message))
                })
                .catch(error => toast(error.message))
        } catch (error) {
            toast(error.message)
        } 
    }
    
    addTicket = () => {
        const ticketsNum = this.state.ticketsNum

        if (ticketsNum < 5)
            this.setState({ ticketsNum: ticketsNum + 1 })
    }


    deleteTicket = () => {
        const ticketsNum = this.state.ticketsNum

        if (ticketsNum > 1)
            this.setState({ ticketsNum: ticketsNum - 1 })
    }

    handleImageChange = event => {
        const image = event.target.files[0]
        this.setState({ image })
    }
    
    render() {
        const { state: { ticketsNum, artists }, submitCongress, addTicket, deleteTicket, handleImageChange } = this

        // cargar artists desde el state en artistOptions para mostrar en el Select
        const artistOptions = []
        artists && artists.forEach( elem => { artistOptions.push({ value: elem._id, label: elem.name }) })        
        
        // creamos un array que no puede estar vacío para poner el campo tickets
        const newarr = new Array(ticketsNum).fill(null)

        return (
            <section className="congress">
                <h1>Create Congress</h1>

                <form className="congress__form" onSubmit={submitCongress}>

                        <fieldset>
                            <label for="name">name</label>
                            <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            />
                        </fieldset>

                        <fieldset>
                            <label for="description">description</label>
                            <textarea 
                                name="description" 
                                rows="5" 
                                cols="35"
                                required
                            />
                                
                        </fieldset>

                        <fieldset>
                            <label for="category">category</label>

                            <select name="category" required>
                            <option value="">--Please choose a category--</option>
                            <option value="salsa">Salsa</option>
                            <option value="bachata">Bachata</option>
                            <option value="mambo">Mambo</option>
                            </select>

                        </fieldset>

                        <fieldset>
                            <label for="address">address</label>
                            <input
                            type="text"
                            name="address"
                            id="address"
                            required
                            />
                        </fieldset>

                        <fieldset>
                            <label for="city">city</label>
                            <input
                            type="text"
                            name="city"
                            id="city"
                            required
                            />
                        </fieldset>

                        <fieldset>
                            <label for="hotel">hotel</label>
                            <input
                            type="text"
                            name="hotel"
                            id="hotel"
                            />
                        </fieldset>

                        <fieldset>
                            <label for="startDate">start date</label>
                            <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            required
                            />
                        </fieldset>

                        <fieldset>
                            <label for="endDate">end date</label>
                            <input
                            type="date"
                            name="endDate"
                            id="endDate"
                            required
                            />
                        </fieldset>
        
                        {/* tickets */}
                        <fieldset>
                            <label for="tikets">tikets</label>
                            {newarr.map((el) =>

                                <fieldset>
                                    <label for="tikets">name your ticket</label>
                                    <input
                                        type="text"
                                        name="ticketType"
                                        required
                                    />
                                    <label for="tikets">price</label>
                                    <input
                                        type="number"
                                        name="ticketPrice"
                                        required
                                    />
                                </fieldset>)
                                
                            }
                        <div className="congress__button">
                            <button onClick={addTicket} className="congress__button__more">+</button>
                            <button onClick={deleteTicket} className="congress__button__less">-</button>
                        </div>

                        </fieldset>
                            <label for="artists">select your artists</label>
                        {/* artists */}
                        <Select
                            defaultValue={[artistOptions[2], artistOptions[3]]}
                            isMulti
                            name="artists"
                            options={artistOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                        />

                        {/* image */}
                        <fieldset>
                            <label for="image">Photo</label>
                            <input
                                type="file"
                                name="image"
                                id="image"
                                required
                                onChange={handleImageChange}
                            />
                        </fieldset>

                    <button type="submit" className="congress__submit">Create your congress</button>
                    </form>

            </section>
        )
    }
}

export default withRouter(CreateCongress)