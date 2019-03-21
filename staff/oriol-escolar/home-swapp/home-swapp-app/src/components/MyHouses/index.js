import React, { Component } from 'react'
import './index.sass';
import logic from '../../logic'
import HouseCard from '../HouseCard'
import CreateHouseCard from '../CreateHouseCard'
import Spinner from '../Spinner';



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


    deleteHouseList = (id) => {

        const { state: { myHouses }, props: { updateInfo } } = this

        let index = myHouses.indexOf(id)

        myHouses.splice(index, 1)

        this.setState({ myHouses })
        updateInfo()

    }


    onCreateHousePage = () => {

        this.props.onCreateHousePage()
    }

    listMyHouses = (userHouses, updateInfo, retrieveHouse) => {

        let newArray = userHouses.map(house => {

            return <HouseCard house={house} updateInfo={updateInfo} deleteHouseList={this.deleteHouseList} retrieveHouse={retrieveHouse} origin='myHouses' />
        });

        newArray.unshift(<CreateHouseCard onCreateHousePage={this.onCreateHousePage} />)

        return newArray
    }



    render() {

        const { listMyHouses, onCreateHousePage, state: { myHouses }, props: { updateInfo, retrieveHouse } } = this


        return <div className="myHouses" >

            <div className="myHouses__content">


                {myHouses && <h1 className="myHouses__title" >MY HOUSES</h1>}
                {myHouses ? listMyHouses(myHouses, updateInfo, retrieveHouse) : <Spinner></Spinner>}


            </div>

        </div>
    }


}


export default MyHouses