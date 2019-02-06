import React, { Component } from 'react';
import './index.css';
import logic from '../../logic';

class Favorite extends Component {
    state = { favorite: this.props.favorites.includes(this.props.idGame.toString()) }

    handleToggleFavorite = Event => {
        Event.stopPropagation();

        try {
            logic.toggleFavorite(this.props.idGame.toString())
            .then((response) => {
                this.setState({ favorite: (response > 0) ? false : true })
            })
            .catch((error) => console.log(error));
        } catch ({ message }) {
            // this.setState({ registerFeedback: message });
            console.log(message);
        }

        
    };

    render() {
        const {state: {favorite}, props: {idGame, favorites} } = this;
        
        let favoriteClass = (favorite)
            ? 'favorite favorite--selected'
            : 'favorite';

        return (
            <div className={favoriteClass} onClick={this.handleToggleFavorite}>
                <i className="fas fa-heart" />
            </div>
        );
    }
}

export default Favorite;
