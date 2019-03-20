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

    listMyHouses = (userHouses, updateInfo,retrieveHouse) => {

        return userHouses.map(house => {

            return <HouseCard house={house} updateInfo={updateInfo} deleteHouseList={this.deleteHouseList} retrieveHouse={retrieveHouse} origin='myHouses' />
        });
    }



    render() {

        const { listMyHouses, onCreateHousePage, state: { myHouses }, props: { updateInfo,retrieveHouse } } = this


        return <div className="myHouses" >
            <h1 className="myHouses__title" >MY HOUSES</h1>

            <div className="myHouses__content">
                <CreateHouseCard onCreateHousePage={onCreateHousePage} />


                {myHouses && listMyHouses(myHouses, updateInfo,retrieveHouse)}


            </div>

        </div>
    }


}


export default MyHouses