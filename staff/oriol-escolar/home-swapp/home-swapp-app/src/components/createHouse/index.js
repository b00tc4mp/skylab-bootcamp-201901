'use strict'

import React, { Component } from 'react'
import Feedback from '../Feedback'
import './index.sass';




class CreateHouse extends Component {

    state = {

        images: "",
        description: "",
        petsAllowed:"Yes",
        smokersAllowed:"Yes",
        numberOfBeds:"1",
        country:"",
        city:"",
        street:"",
        number:"",
        imagesArray:"",
        infoObject:"",
        adressObject:""

    }

    handleInput = event =>{

     this.setState({ [event.target.name]: event.target.value }, () => {
        const{state:{ images,petsAllowed,smokersAllowed,numberOfBeds,country,city,street,number}}=this

        let adressObject = {
    
            country: country.toLowerCase(),
    
            city: city.toLowerCase(),
            
            street:street,
    
            number: number
    
        }
        
        let infoObject ={
    
            petsAllowed:petsAllowed,
    
            smokersAllowed:smokersAllowed,
    
            numberOfBeds:numberOfBeds
    
        }
    
        let imagesArray=[
    
    
            images
    
        ]
    
        this.setState({adressObject,infoObject,imagesArray})
     })
        
     
    
    }

    handleFormSubmit = event => {
        event.preventDefault()

        const { state: { imagesArray,description,infoObject,adressObject }, props: { onCreateHouse } } = this

        onCreateHouse(imagesArray,description,infoObject,adressObject)
    }


    render() {

        const { handleInput, handleFormSubmit, props: { createHouseFeedback } } = this

        return <section className="createHouse">

            <h2 className="createHouse-house-form__section"> Tell us about your house </h2>
            <form className="createHouse-house-form" onSubmit={handleFormSubmit}>

                <p>Images</p>
                <input className="createHouse-house-form__input" required type="text" name="images" placeholder="Enter an image url" onChange={handleInput}></input>

                <p>description</p>
                <textarea className="createHouse-house-form__input-description"  required type="text" name="description" placeholder="Enter a description about your house" onChange={handleInput}></textarea>


                <p>Pets allowed</p>

                <select className="createHouse-house-form__select" name="petsAllowed" onChange={handleInput}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                <p>Smokers allowed</p>

                <select className="createHouse-house-form__select" name="smokersAllowed" onChange={handleInput}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                <p>Number of Beds </p>

                <select className="createHouse-house-form__select" name="smokersAllowed" onChange={handleInput}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="+4">+4</option>
                </select>



                <p>Country</p>
                
                <input className="createHouse-house-form__input"  required type="text" name="country" placeholder="Enter country name" onChange={handleInput}></input>

                <p>City</p>

                <input className="createHouse-house-form__input"  required type="text" name="city" placeholder="Enter city name" onChange={handleInput}></input>

                <p>Street</p>

                <input className="createHouse-house-form__input"  required type="text" name="street" placeholder="Enter street name" onChange={handleInput}></input>
                
                <p>Number</p>

                <input className="createHouse-house-form__input"  required type="text" name="number" placeholder="Enter number" onChange={handleInput}></input>

                <button>Confirm</button>



            </form>
            <div className="block feedback">
                {createHouseFeedback && <Feedback message={createHouseFeedback} />}
            </div>


        </section>

    }


}

export default CreateHouse