import React, { Component } from 'react'
import logic from '../../logic'
import { toast } from 'react-toastify'
import storage from '../../firebase'
import {withRouter} from 'react-router-dom'

class CreateArtist extends Component {

  state = { image: null }

  getImageURL = file => new Promise(function (resolve, reject) {
    const id = Date.now()
    const storageRef = storage.ref(`artists/${id}`)
    const task = storageRef.put(file)

    return task.on("state_changed",
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

  submitArtist = (event) => {
    event.preventDefault()
    
    const name = event.target.name.value
    const year = event.target.year.value
    const country = event.target.country.value
    const category = event.target.category.value
    const artistData = { name, year, country, category }
    this.saveArtist(artistData)

  }

  saveArtist = artistData => {
    const image = this.state.image
    try {
      this.getImageURL(image)
        .then(imageURL => {
          
          return logic.createArtist({ ...artistData, image: imageURL })
          
            .then(() => {
              toast('Artist created!')
              this.props.history.push('/')
            })
            .catch(({ message }) => toast(message))

        })
        .catch(error => toast(error.message))
    } catch (error) {
      toast(error.message)
    }
  }

  handleImageChange = event => {
    const image = event.target.files[0]
    
    this.setState({ image })

  }

  render() {

    const { submitArtist, handleImageChange } = this

    return (

      <section className="artist">
        <h1>Create Artist</h1>

        <form className="artist__form" onSubmit={submitArtist} >

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
            <label for="year">year</label>
            <input
              type="number"
              name="year"
              id="year"
              required
            />
          </fieldset>

          <fieldset>
            <label for="country">country</label>
            <input
              type="text"
              name="country"
              id="country"
              required
            />
          </fieldset>


          <fieldset>
            <label for="category">category</label>

            <select name="category">
              <option value="">--Please choose a category--</option>
              <option value="salsa">Salsa</option>
              <option value="bachata">Bachata</option>
              <option value="mambo">Mambo</option>
            </select>

          </fieldset>

         <fieldset> 
            <label for="photo">Photo</label>
            <input
              type="file"
              name="photo"
              id="photo"
              required
              onChange={handleImageChange}
            />
         </fieldset> 

          <button type="submit">Create your Artist</button>
        </form>

      </section>
      
    )

  }
}

export default withRouter(CreateArtist)