import React, { Component } from 'react'
import './index.sass';


class myHouses extends Component{


    state = {

        user: ""


    }

    componentWillReceiveProps(props){

        this.setState({user:props.user})

    } 



    listMyHouses(){

        if(this.state.user.myHouses){

            let _myHouses = this.state.user.myHouses

            _myHouses.forEach(house => {
                
            });


        }

    }



}


export default myHouses