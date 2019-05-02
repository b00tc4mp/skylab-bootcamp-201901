import React, {Component} from 'react'
import logic from '../../logic'
import images from './images'
import './index.sass'


class Header extends Component {
    state = {currentWeather: null, error: null, currentCity: this.props.city, images: images.Thunderstorm }
    hadleCityChange = e => {
        this.setState({currentCity: e})
        logic.retrieveWeather(e)
            .then(weather=> {
                this.props.onWeatherRetrieved(weather)
                this.setState({currentWeather: weather, images: images[weather]})
            })
    }


    componentDidMount() {
        this.setState({ currentCity: this.props.city }, () =>
            logic.retrieveWeather(this.state.currentCity)
                .then(weather=> {
                    this.props.onWeatherRetrieved(weather)
                    this.setState({currentWeather: weather, images: images[weather]})
                })
        )
    }
    render(){
        const {
            hadleCityChange,
            state: {currentWeather, currentCity, images},
            props: {onLogout, onProfile, onPreferences}
        } = this

        return <div className="myHeader" style={{backgroundImage: `url(${images})`}}>
        <div className="mySelect">
            <div className="select">
                <select name="city" onChange={event => hadleCityChange(event.target.value)} defaultValue={currentCity}>
                    <option value="Alaska">Alaska</option>
                    <option value="Auckland">Auckland</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Buenos Aires">Buenos Aires</option>
                    <option value="Cape Town">Cape Town</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Helsinki">Helsinki</option>
                    <option value="London">London</option>
                    <option value="New York">New York</option>
                    <option value="Paris">Paris</option>
                    <option value="Toronto">Toronto</option>
                    <option value="Warsaw">Warsaw</option>
                </select>
            </div>
        </div>
        <div className="myTitle">
            <h2 className="title myCity">{currentCity}</h2>
            <h2 className="title myWeather">{currentWeather}</h2>
        </div>
        <div className="buttons is-right myButtons">
            <button className="button is-primary is-right" onClick={onProfile}><img className="myIcon" src="https://img.icons8.com/ios-glyphs/30/000000/gender-neutral-user.png" alt="Image"/></button>
            <button className="button is-primary is-right" onClick={onPreferences}><img className="myIcon" src='https://img.icons8.com/ios-glyphs/30/000000/bulleted-list.png'/></button>
            <a onClick={onLogout}>Logout</a>
        </div>
        </div>
    }
}

export default Header