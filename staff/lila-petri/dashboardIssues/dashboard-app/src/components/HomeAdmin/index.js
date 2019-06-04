
import React, { Component } from 'react'
import { Progress } from 'react-sweet-progress'
import "react-sweet-progress/lib/style.css"
import logic from '../../logic'

class HomeAdmin extends Component{
    state = { progress: 0 , loaded: false}

    handlerLoad = async () => {
        await logic.clearUp()
        await logic.loadJirasByMonth('April')
        await logic.loadJirasByMonth('May')
        await logic.loadJirasByMonth('June')
        await logic.calculateOverdue()
        let loaded = true
        this.setState({loaded})

    }


    render(){
        const {
            props: {onLogout, error},
            state: {progress},
            handlerLoad
        }=this
        return <section >
            <h2 className="title is-2">Dashboard Issues</h2>
            <h2 className="title is-2">Admin Panel</h2>
            <p className="subtitle">Reload Data Base</p>
            <button onClick={handlerLoad}>Load Data Base</button> 
            <button onClick={onLogout}>Logout</button> 
            <Progress percent={88} status="success" />
        </section>
    }
}

export default HomeAdmin