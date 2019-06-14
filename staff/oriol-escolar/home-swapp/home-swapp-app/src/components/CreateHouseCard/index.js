import React, { Component } from 'react'
import logic from '../../logic'
import './index.sass';





class CreateHouseCard extends Component {

    onCreateHousePage = () => {



        this.props.onCreateHousePage()
    }


    render() {

        const { onCreateHousePage } = this

        return <div className="createHouseCard" onClick={onCreateHousePage}>


            <p>New House</p>



        </div>

    }

}


export default CreateHouseCard