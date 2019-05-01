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
                    this.setState({currentWeather: weather})
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
        <h1>weatunes</h1>
        <button onClick={onLogout}>Logout</button>
        <button onClick={onProfile}>Profile</button>
        <button onClick={onPreferences}>Preferences</button>

            {/* <img className='img'  src={this.state.images}/> */}
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
        <h2>{currentCity}</h2>
        <h2>{currentWeather}</h2>
        </div>
    }
}

export default Header