import React, {Component} from 'react'
import logic from '../../logic'



class Header extends Component {
    state = {currentWeather: null, error: null, currentCity: this.props.city}
    hadleCityChange = e => {
        this.setState({currentCity: e})
        logic.retrieveWeather(e)
            .then(response=> {
                this.setState({currentWeather: response[1]},
                    () => {
                        const weather = this.state.currentWeather
                        const result = this.props.preferences.find(element => Object.keys(element)[0]==weather)
                        logic.searchMusic(Object.values(result).join())
                        .then(result => console.log(result))
                }
                )
            })
    }


    componentDidMount() {
        this.setState({ currentCity: this.props.city }, () =>
            logic.retrieveWeather(this.state.currentCity)
                .then(response => this.setState({currentWeather: response[1]}))
        )
    }
    render(){
        const {
            hadleCityChange,
            props: {city},
            state: {currentWeather, currentCity, error}
        } = this
        return <>
        <header>
        <select name="city" onChange={event => hadleCityChange(event.target.value)} defaultValue={currentCity}>
            <option value="">City</option>
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
        <img src=""/>
        </header>
        </>
    }
}

export default Header