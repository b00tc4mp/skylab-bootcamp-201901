import React, { Component } from 'react'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'
import Register from './Register'



class App extends Component {
    state = { lang: i18n.language}

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })


    


    render() {
        const {
            state: { lang },
            handleLanguageChange,
            error
        } = this



        return <>
            <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />
            
            <Landing lang={lang} onRegister={()=>console.log('A')} onLogin={()=>console.log('B')}/>
            
            <Register lang={lang} onRegister={()=>console.log('C')} error={error} />


        </>
    }

}
export default App