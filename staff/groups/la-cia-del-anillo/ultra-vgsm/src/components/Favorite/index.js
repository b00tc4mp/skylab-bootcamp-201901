import React, { Component } from 'react';
import './index.css';
import logic from '../../logic';

class Favorite extends Component {
    state = { 
        favorite: this.props.favorites.includes(this.props.idGame.toString()) 
    };

    handleToggleFavorite = Event => {
        Event.stopPropagation();

        const element = Event.target;
        const lastClass = element.className;
        element.className = 'fas fa-sync fa-spin white';

        try {   
            logic
                .toggleFavorite(this.props.idGame.toString())
                .then(response => {
                    this.setState({ favorite: response >= 0 ? false : true });
                    element.className = lastClass;
                })
                .catch(error => console.log(error));
        } catch ({ message }) {
            // this.setState({ registerFeedback: message });
            console.log(message);
        }
    };

    render() {
        const {
            state: { favorite }
        } = this;
        console.log('RENDER FAV');
        let favoriteClass = favorite ? 'favorite favorite--selected' : 'favorite';

        return (
            <div className={favoriteClass} onClick={this.handleToggleFavorite}>
                <div className="flip-card">
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <i className="far fa-heart" />
                        </div>
                        <div className="flip-card-back">
                            <i className="fas fa-heart" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Favorite;
