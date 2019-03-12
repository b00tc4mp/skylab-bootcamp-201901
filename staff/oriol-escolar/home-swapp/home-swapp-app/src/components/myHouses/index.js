import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'


class MyHouses extends Component {


    state = {

        user: "",
        token: "",
        myHouses: []
    }

    componentDidMount() {

        Promise.all(
            this.setState({ user: this.props.user }),
            this.setState({ token: this.props.token }),

            this.retrieveHouses()

        )
    }


    retrieveHouses = () => {



        if (this.state.user) {


            let token = this.state.token
            let user = this.state.user

            const myHouses = user.myHouses.map(houseId => {

                return logic.retrieveHouse(token, houseId)

            })

            this.setState({ myHouses: myHouses })

        }

    }

    componentWillReceiveProps(props) {

        this.setState({ user: props.user })
        this.setState({ token: props.token })
        this.forceUpdate()

    }




    listMyHouses = () => {


        this.state.myHouses.forEach(house => {


            return <div className="HouseCard">

                <img src={house.images[0]}></img>
                <p>{house.adress.city}</p>
                <p>{house.adress.sreet} + {house.adress.number}</p>


            </div>

        });



    }



    render() {

        const { listMyHouses, state: { user, myHouses } } = this

        return <div className="myHouses" >


            {myHouses && listMyHouses()}



        </div>
    }


}


export default MyHouses