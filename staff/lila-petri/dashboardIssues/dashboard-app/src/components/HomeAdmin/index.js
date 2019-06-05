
import React, { Component } from 'react'
import logic from '../../logic'
import { PacmanLoader } from 'react-spinners'


class HomeAdmin extends Component{
    state = { visible: true , loading: false}

    handlerLoad = async () => {
        try{
            let loading = true
            let visible = false
            this.setState({loading, visible})
            await logic.clearUp()
            await logic.loadJirasByMonth('April')
            await logic.loadJirasByMonth('May')
            await logic.loadJirasByMonth('June')
            await logic.calculateOverdue()
            loading = false
            visible = true
            this.setState({loading, visible})

        }catch(error){

        }

    }

    render(){
        const {
            props: {onLogout, error},
            state: {progress, loading, visible},
            handlerLoad
        }=this
        return <section >
            <h2 className="title is-2">Dashboard Issues</h2>
            <h2 className="title is-2">Admin Panel</h2>
            <p className="subtitle">Reload Data Base</p>
            {visible && <button onClick={handlerLoad}>Load Data Base</button>}
            <button onClick={onLogout}>Logout</button> 
            <div className='sweet-loading'>
                <PacmanLoader
                sizeUnit={"px"}
                size={20}
                color={'#123abc'}
                loading={this.state.loading}
                />
            </div> 
        </section>
    }
}

export default HomeAdmin