
import React, { Component } from 'react'
import logic from '../../logic'
import {  BarLoader } from 'react-spinners'
import './index.sass'




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
        return <div className="container-homeadmin uk-background-muted">
            <header className="container-homeadmin__header">
                <h2 className="uk-heading-line uk-text-primary"><span>Admin Panel</span></h2>
                <button className="uk-button uk-button-default uk-width-small uk-margin-bottom uk-text-muted " onClick={onLogout}>Logout</button> 
            </header>
            <ul class="uk-list uk-list-divider">
                <li></li>
                <li>Retrieve issues from source(JIRA)</li>
                {visible && <button className="uk-button uk-button-primary uk-button-small uk-border-rounded" onClick={handlerLoad}>Run</button>}
                <div className='sweet-loading'>
                    <BarLoader
                    sizeUnit={"px"}
                    size={20}
                    color={'#2176FF'}
                    loading={this.state.loading}
                    />
                </div> 
                <li>Reload Data Base</li>
                <button className="uk-button uk-button-primary uk-button-small uk-border-rounded">Run</button>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
    }
}

export default HomeAdmin