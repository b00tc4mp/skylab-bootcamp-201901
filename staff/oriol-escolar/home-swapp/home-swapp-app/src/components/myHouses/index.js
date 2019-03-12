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

        this.setState({ user: this.props.user })
        this.setState({ token: this.props.token })
    }


    componentWillReceiveProps(props) {

        this.setState({ user: props.user })
        this.setState({ token: props.token })
        this.forceUpdate()

    }



    render() {

        const { listMyHouses, state: { user, myHouses } } = this

        return <div className="myHouses" >

            <h1>MY HOUSES</h1>



        </div>
    }


}


export default MyHouses