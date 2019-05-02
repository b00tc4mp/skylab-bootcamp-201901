import React from 'react'
import './index.sass' 
import icons from './icons.js'


function Preferences({preferences, onStyleChange, error}){
    let updatedPreferences=preferences
    
    function onStyleSelect(style){

        const pref = new Object();
        let weather=style.name
        pref[style.name]=style.value
        let index=updatedPreferences.findIndex(element =>  Object.keys(element)==weather)
        
        updatedPreferences[index]=pref
    }
    function handleSubmit(e){
        e.preventDefault()
        onStyleChange(updatedPreferences)
        
}

    return<> <div className="mainpreferences">
    <div className="title-preferences">
        
            <h2 className="title is-2 is-spaced">Weatunes</h2>
            <p className="subtitle is-spaced">On this section you can modify your preferences</p>
    </div>  
    <form className="weathers columns is-multiline is-mobile is-centered" onSubmit={handleSubmit}>
    {
    preferences.map(element=> {
        return  <div className="column is-4-desktop is-4-tablet is-10-mobile">
        <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src={icons[Object.keys(element)]} alt={Object.keys(element)}/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="content">
                            <div className="has-text-centered field">
                                <div key={Object.keys(element).toString()}>
                                    <div class="field"> 
                                        <label class="label">{Object.keys(element)}</label>
                                    </div>
                                    <div className="select field is-fullwidth">
                                        <select name={Object.keys(element)} onChange={event => onStyleSelect(event.target)} defaultValue={Object.values(element).toString()} multiple={false}>
                                            <option value="Christmas">Christmas</option>
                                            <option value="Classical">Classical</option>
                                            <option value="Country">Country</option>
                                            <option value="Electronic">Electronic</option>
                                            <option value="Hip-Hop">Hip-Hop</option>
                                            <option value="Indie Rock">Indie Rock</option>
                                            <option value="Jazz">Jazz</option>
                                            <option value="Metal">Metal</option>
                                            <option value="Pop">Pop</option>
                                            <option value="Rock">Rock</option>
                                            <option value="Soul">Soul</option>
                                            <option value="Tango">Tango</option>
                                            <option value="Tropical">Tropical</option>
                                            <option value="Urbano latino">Urbano latino</option>
                                        </select> 
                                    </div>
                                </div>
                            </div >
                        </div>
                    </div>
                </article>
                </div>
            </div>
    })
    }
        <div className="column buttons is-4-desktop is-4-tablet is-10-mobile is-right">
                <button className="button is-primary is-medium">Save</button>
        </div>
    </form>
    <span>{error}</span>
    </div>
    </>

}
export default Preferences