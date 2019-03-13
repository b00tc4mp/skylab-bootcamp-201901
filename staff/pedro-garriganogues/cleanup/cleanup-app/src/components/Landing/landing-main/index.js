import React, { Component } from 'react';
import './App.css';
import Card from './Card';
import data from './data/data'



// class component
class LandingMain extends Component {

  constructor(props) {
    super(props);
    this.state = {
      properties: data.properties,
      property: data.properties[0]
    }
  }

  nextProperty = () => {
    const newIndex = this.state.property.index + 1;
    this.setState({
      property: data.properties[newIndex]
    })
  }

  prevProperty = () => {
    const newIndex = this.state.property.index - 1;
    this.setState({
      property: data.properties[newIndex]
    })
  }

  render() {
    const { properties, property } = this.state;
    return (
      <div className="App">
        <img src="https://i.gyazo.com/a03279cbcd72c4890e8d03250d0efe96.png" className="bigImage" alt="404" />
        <p className="text" >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <div className="buttons">
          <button
            onClick={() => this.prevProperty()}
            disabled={property.index === 0}
          >Prev</button>
          <button
            onClick={() => this.nextProperty()}
            disabled={property.index === data.properties.length - 1}
          >Next</button>
        </div>

        <div className="col">
          <div className={`cards-slider active-slide-${property.index}`}>
            <div className="cards-slider-wrapper" style={{
              'transform': `translateX(-${property.index * (100 / properties.length)}%)`
            }}>
              {
                properties.map(property => <Card key={property._id} property={property} />)
              }
            </div>
          </div>
        </div>

        {/* <div className="page">
        </div> */}
      </div>
    );
  }
}

export default LandingMain;
