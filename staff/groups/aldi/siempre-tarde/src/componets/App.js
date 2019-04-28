import React, { Component } from 'react'
import i18n from '../common/i18n'
import LanguageSelector from './LanguageSelector'
import Landing from './Landing'



class App extends Component {
    state = { lang: i18n.language}

    handleLanguageChange = lang => this.setState({ lang: i18n.language = lang })

    render() {
        const {
            state: { lang },
            handleLanguageChange
        } = this




        return <>
            <LanguageSelector lang={lang} onLanguageChange={handleLanguageChange} />
            <Landing lang={lang} onRegister={()=>console.log('A')} onLogin={()=>console.log('B')}/>


        </>
    }

}
export default App