"use strict"

import React, { Component } from "react"
import logic from "../Logic"
import PaintCharacter from "../PaintCharacter"

class CharacterInfoResult extends Component {
  state = { character: null, feedback: null, isFav: null }

  componentWillMount() {
    const { props: { id } } = this
    this.handleCharacterSelected(id)
  }

  componentWillReceiveProps(nextProps) {
    const { id } = nextProps
    this.handleCharacterSelected(id)
  }

  handleCharacterSelected = id => {
    try {
      logic.retrieveCharacter(id)
        .then(character => {this.setState({ character: character.results[0], feedback: null })})
        .then(() => {
          return logic.retrieveFavourites().then(favs => {
            let result = favs.some( obj => obj.id === this.state.character.id)
            if (result) {
              this.setState({ isFav: true })
            } else {
              this.setState({ isFav: false })
            }
          })
        })
        .catch(({ message }) =>
          this.setState({ feedback: message, character: null })
        )
    } catch ({ message }) {
      this.setState({ feedback: message, character: null })
    }
  }

  handleFavourite = data => {
    try {
      logic.updateFavourites(data).then(favs => {
        let result = favs.some(obj => obj.id === this.state.character.id)
        if (result) {
          this.setState({ isFav: true })
        } else {
          this.setState({ isFav: false })
        }
      })
    } catch ({ message }) {
      this.setState({ feedback: message, character: null })
    }
  }

  render() {
    const {
      state: { character, feedback, isFav }, props: { onComicSelected, moreInfo, seeComics, comics }} = this

    return (
      <PaintCharacter results={character} feedback={feedback} onItemClick={onComicSelected} handleFavourite={this.handleFavourite} isFav={isFav} seeComics={seeComics} moreInfo={moreInfo} comics={comics}/>
    )
  }
}

export default CharacterInfoResult
