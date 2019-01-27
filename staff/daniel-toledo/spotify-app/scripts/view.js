class Panel {
    constructor($container) {
        this.$container = $container
    }

    show() {
        this.$container.show()
    }

    hide() {
        this.$container.hide()
    }
}


class SearchPanel extends Panel {
    constructor() {
        super($(`<nav class="navbar navbar-light bg-light searchPanel">
    <img src="images/logo.png" width="200px">
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" name="query" placeholder="Search Artist..." aria-label="Search">
        <button class="btn btn-outline-info" type="submit">Search</button>
    </form>
    <button class="btn btn-outline-dark" id="logout">Logout</button> </a> 
    </div>

</nav>`))
        this.__$logo__=this.$container.find('img')

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
        this.__$form__.hide()

        this.__$artistLink__=this.$container.find('li[id=artist]')
        this.__$artistLink__.hide()

        this.__$albumLink__=this.$container.find('li[id=album]')
        this.__$albumLink__.hide()

        this.__$trackLink__=this.$container.find('li[id=tracks]')
        this.__$trackLink__.hide()

        this.__$logoutButton__=this.$container.find('button[id=logout]')
        this.__$logoutButton__.hide()

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }


    set onSearch(callback) {
        this.__$form__.on("submit", event => {
            event.preventDefault()

            const query = this.__$query__.val()

            artistsPanel.clear()
            albumsPanel.clear()
            tracksPanel.clear()
            playPanel.clear()
            navPanel.show()
            searchPanel.__$form__.show()

            albumsPanel.hide()
            tracksPanel.hide()
            playPanel.hide()

            navPanel.__$artistLink__.show()
            navPanel.__$albumLink__.hide()
            navPanel.__$trackLink__.hide()


            callback(query)
        })

    }

    set onAlbum(callback) {
        this.__$albumLink__.on('click', callback);
    }

    set onArtist(callback) {
        this.__$artistLink__.on('click', callback);
    }

    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
}

class NavPanel extends Panel{
    constructor(){
        super($(`<nav class="navbar navbar-expand navbar-light">
        
        <ul class="navbar-nav mr-auto">

            <li class="nav-item active" id="artist">
                <a class="nav-link ml-3" href="#">Artists</a>
            </li>

            <li class="nav-item active" id="album">
                <a class="nav-link ml-3" href="#"> Albums</a>
            </li>

            <li class="nav-item active" id="tracks">
                <a class="nav-link ml-3" href="#">Tracks</a>
            </li>
        </ul>

    </nav>`))

        this.__$artistLink__=this.$container.find('li[id=artist]')
        this.__$artistLink__.hide()

        this.__$albumLink__=this.$container.find('li[id=album]')
        this.__$albumLink__.hide()

        this.__$trackLink__=this.$container.find('li[id=tracks]')
        this.__$trackLink__.hide()
    }

    set onAlbum(callback) {
        this.__$albumLink__.on('click', callback);
    }

    set onArtist(callback) {
        this.__$artistLink__.on('click', callback);
    }

    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }

}

class ArtistsPanel extends Panel {
    constructor(){
        super($(`<section class="results container p-3">
    <ul class="row container"></ul>
</section>`))

        this.__$listArtists__=this.$container.find('ul')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;

    }

    set artists(artists){
        artists.forEach (({id, name, images}) => {
            const image = images[0] ? images[0].url :  'https://cdn.pixabay.com/photo/2016/06/01/09/21/music-1428660_960_720.jpg'
            const $item=$(`<div  data-id=${id} class="card col-12 col-sm-6 col-md-4">
            <li>
                <img "card-img-top" src=${image} width="150px">
                <p "card-title">${name}</p>
            </li>
        </div>`)


            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelected__(id)                
            })

            this.__$listArtists__.append($item)

        })  
  
    }

    clear(){
        this.__$listArtists__.html('')
    }

    set onItemSelected(callback) {
        this.__onItemSelected__ = callback
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
    
}

class AlbumsPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <ul class="row container"></ul>
    </section>`))

    this.__$listAlbums__=this.$container.find('ul')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;
    }

    set albums(albums){
        albums.forEach (({id, name, images}) => {
            const image = images[0] ? images[0].url :  'https://www.tunefind.com/i/album-art-empty.png'
            const $item=$(`<div  data-id=${id} class="card col-12 col-sm-6 col-md-4">
            <li>
                <img "card-img-top" src=${image} width="150px">
                <p "card-title">${name}</p>
            </li>
        </div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelected__(id,image)                
            })

            this.__$listAlbums__.append($item)
        })
    }

    clear(){
        this.__$listAlbums__.html('')
    }

    set onItemSelected(callback) {
        this.__onItemSelected__ = callback
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
}

class TracksPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <div class="row flex">
            <img class="col-12 col-sm-6" width="40%">
            <ul class="col-sm-6 pt-5 pl-3"></ul>
        </div>
    </section>`))
    
    this.__$listTracks__=this.$container.find('ul')
    this.__$image__=this.$container.find('img')
   

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;

    }

    set image(image){
        this.__$image__.attr("src", image)
    }

    set tracks(tracks){
        tracks.forEach (({id, name}) => {
            const $item=$(`<li data-id=${id} class="pointer mb-1">${name}</li>`)
            console.log(id)

            $item.click(() => {
                const id = $item.data('id')

                this.__onItemSelected__(id)                
            })

            this.__$listTracks__.append($item)
        })
    }

    set onItemSelected(callback) {
        this.__onItemSelected__ = callback
    }

    clear(){
        this.__$listTracks__.html('')
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }
}

class PlayPanel extends Panel{
    constructor(){
        super($(`<section class="results container">
        <ul></ul>
    </section>`))
    
    this.__$song__=this.$container.find('ul')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;

    }

    set song(song){
        const $item=$(`<li data-id=${song.id} class="row pt-5">
            <h3 class="col-12 col-sm-6 text-center display-5">${song.name}</h3>
            <audio controls autoplay loop class="col-12 col-sm-6">
                <source src=${song.preview_url} type="audio/mpeg">${song.preview_url}
            </audio>
        </li>`)
        this.__$song__.append($item)
    }

    set error(message){
        this.__errorPanel__.message=message
        this.__errorPanel__.show()
    }

    clear(){
        this.__$song__.html('')
    }

}

class WelcomePanel extends Panel{
    constructor(){
        super($(`<section class="welcome">
    <div class="welcome__banner">
        <h2 class="text-center pt-5 display-2">Music for everyone. </h2>
        <p class="text-center mt-2 display-5"> Sputnikfy is a challenge from SkyLab Coders Academy Bootcamp.<br> Search for an Artist to listen its music. </p>
        <div class="row">
            <button id="login" class="btn btn-info mr-2"> Log In </button>
            <button id="register" class="btn btn-outline-info ml-2"> Register </button>
        </div>
    </div>
    
</section>`))

        this.__$sectionWelcome__=this.$container.find('section')
        this.__$loginButton__=this.$container.find('button[id=login]')
        this.__$registerButton__=this.$container.find('button[id=register]')

    }

    set onWelcomeLogin(callback) {
        this.__$loginButton__.on('click', callback);
    }

    set onWelcomeRegister(callback) {
        this.__$registerButton__.on('click', callback);
    }
}


class LoginPanel extends Panel{
    constructor(){
        super($(`<section class="welcome">
        <section class="login__margins">
    <div class="login container pl-lg-5 pr-lg-5">
        <h2 class="col-2 mt-3">Login</h2>
        <form class="login__form form-group container mb-3 " >
            <div class="row">
                <label for="email" class="col col-md-3 col-sm-12 flex mt-1">Email</label>
                <input type="email" class="col col-md-9 col-12 form-control mt-1" name="email" placeholder="Email" required>
                <label for="password" class="col col-md-3 col-sm-12 flex mt-1">Password</label>
                <input type="text" class="col col-md-9 col-12 form-control mt-1" name="password" placeholder="Password" required>
            </div>
            <div class="row login-flex mt-3">
                <div class="col-md-3 col-0"></div>
                    <button type="submit" class="btn btn-dark col-12 col-sm-6 mr-2">Login</button>
                <div class="pt-2 pt-sm-0">
                    <a href="#" class="btn btn-outline-secondary login__register-link ">Register</a>
                </div>
            </div>
        </form>
    </div>
</section>
</section>`))

        var $form = this.$container.find('form');
        this.__$form__ = $form;

        var $inputs = $form.find('input');

        this.__$emailInput__ = $($inputs[0]);

        this.__$passwordInput__ = $($inputs[1]);

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$element);
        this.__errorPanel__ = errorPanel;

        var $registerLink = $form.find('a')
        this.__$registerLink__ = $registerLink;
    }

    set onLogin(callback){
        this.__$form__.on('submit', event=>{
            event.preventDefault()

            var email=this.__$emailInput__.val()
            var password=this.__$passwordInput__.val()

            callback(email,password)
        })
    }

    clear() {
        this.__$emailInput__.val('');
        this.__$passwordInput__.val('');
        this.__errorPanel__.message = '';
        this.__errorPanel__.hide();
    };

}

class HomePanel extends Panel{
    constructor(){
        super($(`<section class="welcome">
    <div class="welcome__banner">
        <h2 class="text-center pt-5 display-2"> Welcome, <span></span>!</h2>
        <p class="text-center mt-2 display-5">Search for an Artist to listen its music. </p>
        <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" name="query" placeholder="Search Artist..." aria-label="Search">
            <button class="btn btn-outline-info my-2 my-sm-0" type="submit">Search</button>
        </form>
    </div>
    
</section>`))

        var $title = this.$container.find('h2')

        var $userSpan = $title.find('span')
        this.__$userSpan__ = $userSpan;

        this.__$form__ = this.$container.find('form')
        this.__$query__ = this.__$form__.find('input')
    }

    set onSearch(callback) {
        this.__$form__.on("submit", event => {
            event.preventDefault()

            const query = this.__$query__.val()

            artistsPanel.clear()
            albumsPanel.clear()
            tracksPanel.clear()
            playPanel.clear()
            searchPanel.__$form__.show()
            navPanel.show()
            navPanel.__$artistLink__.show()

            albumsPanel.hide()
            tracksPanel.hide()
            playPanel.hide()

            callback(query)
        })

    }

    
    set user (user) {
        this.__$userSpan__.text(user.name);
    }


    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback);
    }
}


class ErrorPanel extends Panel{
    constructor(){
        super($(`<section class="error"></section>`))
    }

    set message(message){
        this.$container.text(message)
    }
}