import React from 'react'

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

    return<>
    <h2>Weatunes</h2>
    <p>On this section you can modify your preferences</p>
    <form onSubmit={handleSubmit}>
    {
    preferences.map(element=> {
        return  <div key={Object.keys(element).toString()}>
                    <p>{Object.keys(element)}</p>
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
    })
    }
        <button>save</button>
    </form>
    <span>{error}</span>
    
    </>

}
export default Preferences