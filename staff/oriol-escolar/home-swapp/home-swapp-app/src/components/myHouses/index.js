import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'
import CreateHouseCard from '../createHouseCard'


class MyHouses extends Component {


    state = {

        myHouses: ""
    }

    componentDidMount() {

        this.setState({ myHouses: this.props.userHouses })
    }


    componentWillReceiveProps(props) {
        this.setState({ myHouses: props.userHouses })
    }

    


    listMyHouses(userHouses,toggleFavs) {

        return userHouses.map(house => {

            return HouseCard(house,toggleFavs)
        });
    }



    render() {

        const { listMyHouses, state: { user, myHouses },props:{toggleFavs}  } = this


        return <div className="myHouses" >
                <h1 className= "myHouses__title">MY HOUSES</h1>

            <div className= "myHouses__content">
                <CreateHouseCard></CreateHouseCard>


                {myHouses && listMyHouses(myHouses,toggleFavs)}


            </div>

        </div>
    }


}


export default MyHouses