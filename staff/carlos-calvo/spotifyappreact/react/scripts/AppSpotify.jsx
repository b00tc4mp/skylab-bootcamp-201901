spotifyApi.token = 'BQBB2NwYqW1KOA9o61iZ0ixkPIR6Bh9Q_2NgYsAsv8PB0heeK9YFl1HCCnYJwytew15tZTN-esCkhs3EyGahQ2ctd9IhUckEb46LxqWGJ28ayaTW_-2Z0gBsuz3TK3TpX84SFdNrXEgRKg'

class App extends React.Component{
    
    state = {loginVisible: true,
        registerVisible: false, 
        homePanelVisible: false, 
        artistPanelVisible: false, 
        albumPanelVisible: false, 
        trackListPanelVisible: false, 
        email:'',
        trackId: '', 
        previewurl: '', 
        loginFeedback: '',
        registerfeedback: '', 
        artistResults: [], 
        audioPanelVisible: false,
        albumResults:[], 
        trackListResults:[], 
        artistSelected:'' }

    handleLogin = (email, password) => {
        try{
            logic.login(email, password, () =>{
                this.setState({email})
                this.setState({loginFeedback: ''})
                this.setState({loginVisible: false})
                this.setState({registerVisible: false})
                this.setState({homePanelVisible: true})
            })
        } catch ({message}){
            //parte de error de panel
            this.setState({ loginFeedback: message })
        }
    }

    goToRegisterForm = () =>{
        this.setState({loginVisible: false})
        this.setState({registerVisible: true})

    }

    doRegister = (name, surname, email, password, passwordconf) =>{
        //logic
        try{
            logic.register(name, surname, email, password, passwordconf, () => {
                this.setState({loginVisible: true})
                this.setState({loginFeedback: ''})
                this.setState({registerVisible: false})
                this.setState({registerfeedback: ''})
            })
            
        } catch({message}){
            this.setState({ registerfeedback: message })
        }
    }

    backToLogin = () =>{
        this.setState({registerVisible: false})
        this.setState({loginVisible: true})
        this.setState({homePanelVisible: false, artistPanelVisible: false, albumPanelVisible: false, trackListPanelVisible: false, audioPanelVisible: false})
    }


    goSearch = query =>{
        try{
            logic.searchArtists(query, (error, artistResults) => {
                if (error){
                    //Show result bad
                    console.log('No results modafoca')
                } 
                else {
                    this.setState({artistResults})
                    this.setState({artistPanelVisible: true})
                    this.setState({albumPanelVisible: false})
                    this.setState({trackListPanelVisible: false})
                    this.setState({audioPanelVisible: false})

                }
            })
        } catch({message}){
            this.setState({ loginFeedback: message })
        }
    }


    loadAlbumfromArtist = id => {
        try {
            console.log(id)
            logic.retrieveAlbums(id, (error, albumResults) => {
                if(error){
                    console.log(error.message)
                } else {
                    this.setState({albumResults})
                    console.log(albumResults)
                    this.setState({albumPanelVisible: true})
                    this.setState({trackListPanelVisible: false})
                    this.setState({audioPanelVisible: false})
                    window.scrollTo(0,document.body.scrollHeight);
                }
            })
        } catch (error) {
            console.log(error.message)
        }

    }


    loadTracksfromAlbum = id =>{
        try{
            console.log(id)
            logic.retrieveSongs(id, (error, trackListResults) => {
                if(error){
                    console.log(error.message)
                    console.log('no result modafoca')
                } else {
                    this.setState({trackListResults})
                    console.log(trackListResults)
                    this.setState({trackListPanelVisible: true})
                    this.setState({audioPanelVisible: true})
                    window.scrollTo(0,document.body.scrollHeight);
                }
            })
        } catch(error){
            console.log(error.message)
        }
    }


    loadTrack = (trackId, previewurl) =>{
        try{
            this.setState({ trackId })
            this.setState({ previewurl })
            this.setState({ audioPanelVisible: true })
            window.scrollTo(0,document.body.scrollHeight);
        } catch(error){
        }
    }


    AppToggleFavorite = (id) =>{
        try{
            logic.toggleFavorite(this.state.email, id)
        } catch(error){
            console.log(error)
        }
    }

    //{feedback && <Feedback message={feedback} level="warn" />}

    render(){
        const { state: {loginVisible, email, registerVisible, loginFeedback, homePanelVisible, artistPanelVisible, albumPanelVisible,  artistResults, albumResults, trackListPanelVisible, trackListResults, audioPanelVisible, previewurl, trackId, registerfeedback} , handleLogin, goToRegisterForm, doRegister, backToLogin, goSearch, loadAlbumfromArtist, loadTracksfromAlbum, loadTrack, AppToggleFavorite } = this
        return <main className="App">
            {loginVisible && <Login className="Login" onLogin={handleLogin} feedback={loginFeedback} /> }
            {loginVisible && <BotonRegister onRegister={goToRegisterForm} />}
            {registerVisible && <RegisterSection onRegisterUser = {doRegister} fromRegisterToLogin ={backToLogin} feedbackRegister = {registerfeedback}/>}
            {homePanelVisible && <HomePanel onSearchApp={goSearch} onLogout={backToLogin} artistResults = {this.state.artistResults}/>}
            {artistPanelVisible && <ArtistPanel artistResults = {artistResults} artistSelect = {loadAlbumfromArtist}/>}
            {albumPanelVisible && <AlbumPanel albumResults = {albumResults} albumSelected = {loadTracksfromAlbum}/>}
            {trackListPanelVisible && <TrackListPanel trackListResults = {trackListResults} trackSelected={loadTrack}/>}
            {audioPanelVisible && <AudioPanel previewurl = {previewurl} trackId={trackId} toggleFavorite = {AppToggleFavorite}/>}
        </main>
    }
    
}

function Feedback({ message, level }) {
    return <section className={`alert alert-danger  ${`feedback ${level ? `feedback--${level}` : ''}`}`}  >{message}</section>
}



function FeedbackPro(){
    return <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <img src="..." className="rounded mr-2" alt="..."/>
                    <strong className="mr-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="toast-body">
                    Hello, world! This is a toast message.
                </div>
            </div>
}











class Login extends React.Component{
    state = { email: '', password: ''} //Equivalente al constructor

    //Método HandleLogin
    handleEmailChange = event => this.setState({ email: event.target.value})
    handlePasswordChange = event => this.setState({password: event.target.value})
    
    handleSubmit = event => {
        event.preventDefault()
        const { state: { email, password }, props: { onLogin } } = this
        onLogin(email, password)
    }


    render(){

        const { handleEmailChange, handlePasswordChange, handleSubmit, props: {feedback}} = this
        
        return <section className="loginPanel">
                <h1>SpotifyApp</h1>
                <h5 className="indigo-text">Please, login into your account</h5>
                <form onSubmit={handleSubmit}>
                    <label>Enter your email</label>
                    <input type="email" name="email" onChange={handleEmailChange} /> 
                    <label>Enter your password</label>
                    <input type="password" name="password" onChange={handlePasswordChange} />
                    <div className="div__buttonlogin">
                        <button type= "submit" className="btn btn-primary">Login</button>
                        {feedback && <Feedback message={feedback} level="warn" />}
                    </div>
                </form>
            </section>
    } //ojo con el this, que si no se pone no funciona por contextos!!!!!!
}



class BotonRegister extends React.Component{
    constructor(){
        super()
    }

    handleRegisterClick = event => {
        event.preventDefault()
        this.props.onRegister()
    }

    render(){
        return <section className="registersection">
               <button className="btn btn-secondary" onClick={this.handleRegisterClick}>Register</button>
            </section>
    } //ojo con el this, que si no se pone no funciona por contextos!!!!!!
}


class RegisterSection extends React.Component{
    state = { name: '', surname: '', email: '', password: '', passwordconf: '' } //Equivalente al constructor

    //Controlan los estados de los inputs y van actualizando el estado que define el objeto
    handleNameChange = event => this.setState({ name: event.target.value})
    handleSurnameChange = event => this.setState({ surname: event.target.value})
    handleEmailChange = event => this.setState({ email: event.target.value})
    handlePasswordChange = event => this.setState({ password: event.target.value})
    handlePwdConfChange = event => this.setState({ passwordconf: event.target.value})

    onSubmitClick = event =>{
        event.preventDefault()
        this.props.onRegisterUser(this.state.name,this.state.surname, this.state.email, this.state.password, this.state.passwordconf )
    }

    onClickBackToLogin = event =>{
        event.preventDefault()
        this.props.fromRegisterToLogin()
    }


    render(){
        return <section className="register form-row justify-content-center">
            <h2>Welcome to Register Section</h2>
            <form className="row justify-content-center col-10" onSubmit={this.onSubmitClick}>
                <div className="form-group col-7">
                    <label >Name</label>
                    <input type="text" name="name" className="form-control" placeholder="Name" onChange={this.handleNameChange} required  />
                </div>
                <div className="form-group col-7">
                    <label >Surname</label>
                    <input type="text" name="surname"  className="form-control" placeholder="Surname" onChange={this.handleSurnameChange} required />
                </div>
                <div className="form-group col-7">
                    <label >email</label>
                    <input type="email" className="form-control" placeholder="email" onChange={this.handleEmailChange} required />
                </div>
                <div className="form-group col-7">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="password" onChange={this.handlePasswordChange} required />
                </div>
                <div className="form-group col-7">
                    <label>Password conf</label>
                    <input type="password" name="password-confirmation" className="form-control" placeholder="password confirmation" onChange={this.handlePwdConfChange} required />
                </div>
                <button type="submit" className="btn btn-primary col-7"><strong>Register</strong></button>
            </form>
            <div className="row justify-content-center col-3">
                <button type="submit" className="btn btn-secondary col-6" onClick={this.onClickBackToLogin}><strong>Back</strong></button>
            </div>

            {this.props.feedbackRegister && <Feedback message={this.props.feedbackRegister} level="warn" />}  
        </section>
    }
}



class HomePanel extends React.Component{
    state = { query: '', }
    // handleEmailChange = event => this.setState({ email: event.target.value})
    handleSearchChange = event => this.setState({query: event.target.value})

    onClickSearch = event =>{
        event.preventDefault()
        //const { state: { email, password }, props: { onLogin } } = this
        const query = this.state.query
        const onSearchApp = this.props.onSearchApp
        onSearchApp(query)
    }

    clickLogOut = event =>{
        event.preventDefault()
        const onLogout = this.props.onLogout
        onLogout()
    }

    render() {
        return <section className=" rounded search container text-dark .col-sm-12 .col-md-10 .col-lg-8 .col-xl-8 justify-content-center">
                    <div className="row justify-content-center">
                        <h2 className="col-12">Welcome</h2>
                        <div className="col-10"></div>
                        <button onClick={this.clickLogOut} className="col-2 badge badge-danger">Exit</button>
                    </div>
                    <form onSubmit = {this.onClickSearch}>
                        <div className= "row justify-content-center">
                            <div className="row input-group mb-1 .col-sm-8 .col-md-8 .col-lg-6 .col-xl-6">
                                <input onChange={this.handleSearchChange} type="text" id="search" className="form-control .col-sm-5 .col-md-5 .col-lg-5 .col-xl-5" placeholder="Search on Spotify" aria-label="Username" aria-describedby="basic-addon1" /></div>
                            <button type="submit" className="btn btn-primary .col-sm-5">Search</button>
                        </div>
                    </form>
                    <FeedbackPro/>
                </section>
                
    }
}


class ArtistPanel extends React.Component{

    onArtistSelected(id){
        const artistSelect = this.props.artistSelect
        console.log(id)
        artistSelect(id)
    }
    
    clearStyles(){
        //Pone todos sin estilo
    }

    highlightitem(id){
        
    }

    render(){
       const {props: {artistResults}} = this

       return <section>
           <h2>ARTIST LIST</h2>
           <div className="cardContainer">
                {artistResults.map(({ id, images, name }) => {
                    return <div className="cardContainer__Artist" id-data={id} onClick = {() => this.onArtistSelected(id)}>
                        <img className="rounded-circle" src={images[0] ? images[0].url: ""}  />
                        <h3 className="text-center">{name}</h3>
                    </div>
                })}
            </div>
        </section>
    }

}


class AlbumPanel extends React.Component{

   
    onAlbumSelected(id){
        const albumSelected = this.props.albumSelected
        console.log(id)
        albumSelected(id)
    }



    render(){
        const {props: {albumResults}} = this

        return<section>
            <h2>ALBUM LIST</h2>
            <div className="albumContainer ">
                {albumResults.map(({ id, images, name }) => {
                    return <div className="albumContainer__album "  id-data={id} onClick = {() => this.onAlbumSelected(id)}>
                        <img className="rounded-circle" src={images[0] ? images[0].url: ""}  />
                        <h3 className="text-center" >{name}</h3>
                    </div>
                })}
            </div>
        </section>
    }
}

class TrackListPanel extends React.Component{
    
    onTrackSelected(id, preview_url){
        const trackSelected = this.props.trackSelected
        trackSelected(id, preview_url)
        console.log(1, id, preview_url)
    }
    

    render(){
        const {props: {trackListResults}} = this
        return<section>
            <h2>Select a track</h2>
            <div className="dropdown">
            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Select a Track to play
            </a>
            <div className="dropdown-menu">
                {trackListResults.map(({ id, preview_url, name, track_number }) => {
                    return <div className="dropdown-item" id-data={id} onClick = {() => this.onTrackSelected(id, preview_url)}>
                    <h3 className="text-center" >{track_number} - {name}</h3>
                    </div>
                })}
            </div>
            </div>
        </section>
    }
}


class AudioPanel extends React.Component{
    state = {color: 'white'};

    changecolor() {
        if(this.state.color = "white"){ //case from no favorite to favorite
            let heart = document.getElementById("heart")
            heart.setAttribute("style", "background-color: red;")
            this.setState({color: 'red'})
            this.props.toggleFavorite(this.props.trackId)

        } else{//case from favorite to no favorite
            let heart = document.getElementById("heart")
            this.setState({color: 'white'})
            heart.setAttribute("style", "background-color: white;")
            this.props.toggleFavorite(this.props.trackId)
        }
    }

    render(){
        const {props: {previewurl, trackId}} = this

        return<section>
            <audio src={previewurl} controls autoPlay></audio>
                <div data-id={trackId}>
                    <i id="heart" onClick = {() => this.changecolor()} className ="far fa-heart"></i>
                </div>
        </section>
    }
    
}



ReactDOM.render(<App />, document.getElementById('root'))