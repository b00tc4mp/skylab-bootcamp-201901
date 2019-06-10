
import React, { Component } from 'react'
import logic from '../../logic'
import {  BarLoader } from 'react-spinners'
import './index.sass'
import { withRouter } from 'react-router-dom'
import 'uikit/dist/js/uikit.min.js'
import UIkit from 'uikit/dist/js/uikit.min.js'

class HomeAdmin extends Component{
    state = { visibleLoad: true , visibleSave: true, loading: false, loadingSave: false, loadingLoad: false}

    handlerLoad = async () => {
        try{
    
            this.setState({loadingLoad: true, visibleLoad: false})
            await logic.clearUpBuffer()
            await logic.loadJirasByMonth('April')
            await logic.loadJirasByMonth('May')
            await logic.loadJirasByMonth('June')
            UIkit.notification("<span uk-icon='icon: check'></span> Data saved successfully", {status:'success'}, {timeout: 5})
            this.setState({loadingLoad: false, visibleLoad: true})
            
        }catch(error){
            
            UIkit.notification({message: error.message , status:'danger'})
        }
    }
    handlerSavingData = async () => {
        try{
            this.setState({loadingSave: true, visibleSave: false})
            await logic.clearUp()
            await logic.saveIssues() 
            await logic.calculateOverdue()
            UIkit.notification("<span uk-icon='icon: check'></span> Data saved successfully", {status:'success'}, {timeout: 5})
            this.setState({loadingSave: false, visibleSave: true})

        }catch(error){
            UIkit.notification({message: error.message , status:'danger'})
        }
    }

    render(){
        const {
            props: {onLogout},
            state: {loading, loadingSave, loadingLoad, visibleLoad, visibleSave},
            handlerLoad,
            handlerSavingData
        }=this
        return <div className="container-homeadmin uk-background-muted">
            <header className="container-homeadmin__header">
                <h2 className="uk-heading-line uk-text-primary"><span>Admin Panel</span></h2>
                <button className="uk-button uk-button-default uk-width-small uk-margin-bottom uk-text-muted uk-float-right" onClick={onLogout}>Logout</button> 
            </header>
            <ul className="uk-list uk-list-divider">
                <li></li>
                <div className="boundary-align uk-panel uk-placeholder">
                    <li className="uk-float-left uk-text-emphasis">Retrieve issues from source(JIRA)</li>
                    {visibleLoad && <button className="uk-button uk-button-primary uk-button-small uk-border-rounded uk-float-right bottom-justify" onClick={handlerLoad} disabled={loadingSave}>Run</button>}
                    <div className="uk-float-right">
                        <BarLoader
                        sizeUnit={"px"}
                        size={20}
                        color={'#2176FF'}
                        loading={this.state.loadingLoad}
                        />
                    </div>
                </div>
                <div className="boundary-align uk-panel uk-placeholder">
                <li className="uk-float-left uk-text-emphasis">Reload Data Base</li>
                    {visibleSave && <button className="uk-button uk-button-primary uk-button-small uk-border-rounded uk-float-right bottom-justify"onClick={handlerSavingData} disabled={loadingLoad}>Run</button>}
                    <div className="uk-float-right">
                        <BarLoader
                        sizeUnit={"px"}
                        size={20}
                        color={'#2176FF'}
                        loading={this.state.loadingSave}
                        />
                    </div>
                </div>
                
            </ul>
        </div>
    }
}

export default withRouter(HomeAdmin)