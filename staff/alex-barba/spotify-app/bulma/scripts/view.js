/**
 * view.js of Sporify App 
 */

/* Panel class defined with a jQuery element. Two functions created for this object. */ 

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

/* LoginPanel defined from Panel. Constructor defined creating and HTML snippet. Three sets defined: onLogin to send the inputs value to the callback function when clicking on the login button, error to send the error message to the error panel and display it and onGoToRegister to trigger callback function when register button is clicked . clear function created to empty inputs of the panel when needed. */

class LoginPanel extends Panel {
    constructor() {
        super($(`<section class="login container">
    <div class="columns">
        <form class="login__form column is-half is-offset-one-quarter" >
            <h4 class="subtitle is-4">Login</h4>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-small is-rounded" type="email" name="email" placeholder="Email" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-small is-rounded" type="password" name="password"placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field is-grouped btn_grp">
                <p class="control">
                    <button class="button is-success is-small is-rounded" type="submit">
                    Login
                    </button>
                </p>
            </div>
        </form>
    </div>
</section>`))

        this.__$form__ = this.$container.find('form')

        this.__$emailInput__ = this.$container.find('input[type=email]')

        this.__$passwordInput__ = this.$container.find('input[type=password]')

        this.__$btn_grp__ = this.$container.find('.btn_grp')

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $registerLink = $(`<p class="control"><a href="#" class="button is-outlined is-small is-rounded" >Register</a></p>`);
        this.__$btn_grp__.append($registerLink);
        this.__$registerLink__ = $registerLink;
    }
    set onLogin(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            var email = this.__$emailInput__.val()
            var password = this.__$passwordInput__.val()

            callback(email, password)
        });
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    clear() {
        this.__$emailInput__.val('')
        this.__$passwordInput__.val('')
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
    }
    set onGoToRegister(callback) {
        this.__$registerLink__.on('click', callback)
    }
}

/* RegisterPanel defined from Panel. Constructor defined creating and HTML snippet. Three sets defined: onRegister to send the inputs value to the callback function when clicking on the register button, error to send the error message to the error panel and display it and onGoToLogin to trigger callback function when register button is clicked. clear function created to empty inputs of the panel when needed. */

class RegisterPanel extends Panel {
    constructor() {
        super($(`<section class="register container">
    <div class="columns">
        <form class="register__form column is-half is-offset-one-quarter">
            <h4 class="subtitle is-4">Register</h4>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-small is-rounded" type="text" name="name" placeholder="Name" required>
                    <span class="icon is-small is-left">
                        <i class="far fa-user"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
            <p class="control has-icons-left has-icons-right">
                <input class="input is-small is-rounded" type="text" name="surname" placeholder="Surame" required>
                <span class="icon is-small is-left">
                    <i class="far fa-user"></i>
                </span>
                <span class="icon is-small is-right">
                    <i class="fas fa-check"></i>
                </span>
            </p>
            </div>
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input is-small is-rounded" type="email" name="email" placeholder="Email" required>
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                    <span class="icon is-small is-right">
                        <i class="fas fa-check"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-small is-rounded" type="password" name="password"placeholder="Password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input is-small is-rounded" type="password" name="password-confirmation"placeholder="Confirm password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field is-grouped btn_grp">
                <p class="control">
                    <button class="button is-success is-small is-rounded" type="submit">
                    Register
                    </button>
                </p>
            </div>
        </form>
    </div>
</section>`))

        this.__$form__ = this.$container.find('form')

        this.__$nameInput__ = this.__$form__.find('input[name=name]')

        this.__$surnameInput__ = this.__$form__.find('input[name=surname]')

        this.__$emailInput__ = this.__$form__.find('input[type=email]')

        this.__$passwordInput__ = this.__$form__.find('input[name=password]')

        this.__$passwordConfirmationInput__ = this.__$form__.find('input[name=password-confirmation]')

        this.__$btn_grp__ = this.$container.find('.btn_grp')

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $loginLink = $(`<p class="control"><a href="#" class="button is-outlined is-small is-rounded">Login</a></p>`)
        this.__$btn_grp__.append($loginLink)
        this.__$loginLink__ = $loginLink
    }
    set onRegister(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            var name = this.__$nameInput__.val()
            var surname = this.__$surnameInput__.val()
            var email = this.__$emailInput__.val()
            var password = this.__$passwordInput__.val()
            var passwordConfirmation = this.__$passwordConfirmationInput__.val()

            callback(name, surname, email, password, passwordConfirmation)
        })
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    clear() {
        this.__$nameInput__.val('')
        this.__$surnameInput__.val('')
        this.__$emailInput__.val('')
        this.__$passwordInput__.val('')
        this.__$passwordConfirmationInput__.val('')
        this.__errorPanel__.message = ''
        this.__errorPanel__.hide()
    }
    set onGoToLogin(callback) {
        this.__$loginLink__.on('click', callback)
    }
}

/* SearchPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: onSearch to send the query value to the callback function  when clicking on the search button, user to get and send the username, onLogout to trigger callback function when logout button is clicked error to send the error message to the error panel and display it. errorClear function created to hide errorPanel when needed. */

class SearchPanel extends Panel {
    constructor(){
        super($(`<section class="search">
    <div class="level">
        <div class="level-item">
            <h4 class="level-item subtitle is-4" >Welcome,<span class="search__name"></span>!</h4>
        </div>
        <div class="level-item">
            <button class="level-item button is-rounded is-small search__logout"><i class="fas fa-sign-out-alt"></i></button>
        </div>
    </div>
    <div class="columns is-centered">
    <dic class="column is-four-fifths"> 
    <form class="field has-addons has-addons-centered">
        <div class="control has-icons-left is-expanded">
            <input class="input is-small is-rounded" placeholder="Find an artist" type="text" name="query"></input>
            <span class="icon is-small is-left">
                <i class="fas fa-music"></i>
            </span>
        </div>
        <div class="control">
            <button class="button is-small is-rounded is-success"type="submit">Find!</button>
        </div>
    <form>
    </div>
    </div>
</section>`))
        
        this.__$form__ = this.$container.find('form')
        this.__$title__ = this.$container.find('h4')

        this.__$query__ = this.__$form__.find('input')

        this.__$userSpan__ = this.__$title__.find('span')

        this.__$logoutButton__ = this.$container.find('.search__logout')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel
    }
    set onSearch(callback) {
        this.__$form__.on('submit',  event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    errorClear(){
        this.__errorPanel__.hide()
    } 
    set user(user) {
        this.__$userSpan__.text(user.name)
    }
    set onLogout(callback) {
        this.__$logoutButton__.on('click', callback)
    }
    clear() {
        this.__$query__.val('')
    }   
    
}

/* ArtistPanel defined from Panel. Constructor defined creating and HTML snippet. Three sets defined: artists to get artists data to be displayed, add a click function to each of them with another set to get the id from the artist to know which one has been chosen. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class ArtistPanel extends Panel {
    constructor() {
        super($(`<section class="resultsArtist container">
    <div class="columns is-mobile is-multiline is-centered"></div>    
</section>`))

        this.__$list__ = this.$container.find('div')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set artists (artists){
        artists.forEach(({ id, name, images, popularity, genres }) =>{
            const genre = genres[0] ? genres[0] : 'No genre defined'
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item =$(`<div data-id=${id} class="cursor column is-one-third-widescreen is-half-tablet card is-three-quarters-mobile is-centered">
    <div class="card-image">
        <figure class="image is-centered">
            <img src="${image}">
        </figure>
    </div>
    <div class="card-content is-centered">
        <h4 class="title is-4">${name}</h4>
        <h5 class="subtitle is-6">Popularity Index :#${popularity}</h5>
    </div>
    <div class="card-footer">
        <p class="subtitle is-6">Genre: ${genre}</p>
    </div>
</div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onArtistSelected__(id)                
            })
            this.__$list__.append($item)
        })
    }
    set onArtistSelected (callback) {
        this.__onArtistSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }
    clear () {
        this.__$list__.empty()
    } 
}

/* AlbumPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: albums to get album data to be displayed, add a click function to each of them with another set to get the id from the album to know which one has been chosen. onBackToArtists to trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="resultsAlbum container">
    <div class="level">
        <h4 class="level-left">Albums</h4>
        <div class="level-right">
            <button class="button is-dark is-small is-rounded"><i class="fas fa-chevron-circle-left"></i> Back to Artists</button>
        </div>
    </div>
    <div class="albums columns is-mobile is-multiline is-centered"></div>   
</section>`))

        this.__$list__ = this.$container.find('.albums')

        this.__$backBtn__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set albums (albums){
        albums.forEach(({ id, name, images, release_date, total_tracks }) =>{
            const image = images[0] ? images[0].url :  'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item =$(`<div data-id=${id} class="cursor column card is-one-third-widescreen is-half-tablet is-three-quarters-mobile is-centered">
    <div class="card-image">
        <figure class="image is-centered">
            <img src=${image}>
        </figure>
    </div>
    <div class="card-content is-centered">
        <h4 class="title is-4">${name}</h4>
        <h5 class="subtitle is-6">Tracks :${total_tracks} </h5>
    </div>
    <div class="card-footer">
        <p class="subtitle is-6">Released date: ${release_date}</p>
    </div>
</div>
    `)
           
            $item.click(() => {
                const id = $item.data('id')

                this.__onAlbumSelected__(id)                
            })
            this.__$list__.append($item)
        })
    }
    set onAlbumSelected (callback) {
        this.__onAlbumSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }
    set onBackToArtists (callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear () {
        this.__$list__.empty()
    } 
}

/* TracksPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: tracks to get tracks data to be displayed, add a click function to each of them with another set to get the id from the track to know which one has been chosen. onBackToAlbumsto trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class TracksPanel extends Panel {
    constructor(){
        super($(`<section class="tracksAlbum container">
    <div class="level">
        <h4 class="level-left">Tracks</h4>
        <div class="level-right">
            <button class="button is-dark is-small is-rounded"><i class="fas fa-chevron-circle-left"></i>  Back to Albums</button>
        </div>
    </div>
    <nav class="panel list-group track"> 
</section>`))

    this.__$list__ = this.$container.find('.track')

    this.__$backBtn__ = this.$container.find('button')

    var errorPanel = new ErrorPanel;
    this.$container.append(errorPanel.$container);
    this.__errorPanel__ = errorPanel;
    }

    set tracks (tracks) {
        tracks.forEach(({id, name}) => {
            const $item = $(`<a data-id=${id} class="panel-block">
    <span class="panel-icon">
        <i class="fas fa-music" aria-hidden="true"></i>
    </span>
    ${name}
</a>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onTrackSelected__(id)
            })
            this.__$list__.append($item)
        })
    }
    set onTrackSelected (callback) {
        this.__onTrackSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    set onBackToAlbums (callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear() {
        this.__$list__.empty()
    } 
}

/* TrackPanel defined from Panel. Constructor defined creating and HTML snippet. Three sets defined: track to get track data to be displayed, onBackToTracks to trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class TrackPanel extends Panel {
    constructor() {
        super($(`<section class="trackChosen container">
    <div class="level">
        <h4 class="level-left">Track</h4>
        <div class="level-right">
            <button class="button is-dark is-small is-rounded"><i class="fas fa-chevron-circle-left"></i>  Back to Tracks</button>
        </div>
    </div>
    <div class="columns">
        <div class="column card is-half is-offset-one-quarter is-centered"></div>
    </div>    
</section>`))

        this.__$list__ = this.$container.find('.card')

        this.__$backBtn__ = this.$container.find('button')
       
        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel
    }
    set track ({id, name, preview_url, uri}) {
            const image = 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item = $(`<div data-id=${id} class="card-image">
    <figure class="image">
        <img src=${image}>
    </figure>
</div>
<div class="card-content">
    <h4 class="title is-4">${name}</h4>
</div>
<div class="card-footer">
    <div class="field is-grouped"
        <p class="control">
            <audio src=${preview_url} controls></audio>
        </p>
        <p class="control">
            <a href=${uri} class="button is-link is-small is-rounded">Listen to full song on Spotify</a>
        </p>
    </div>    
</div>`)

            this.__$list__.append($item)
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    set onBackToTracks (callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear() {
        this.__$list__.empty()
    } 
}

/* ErrorPanel defined from Panel. Constructor defined creating and HTML snippet to display the erros. Set defined to get and send message to be displayed in the errorPanel */

class ErrorPanel extends Panel {
    constructor() {
        super($(`<div class="columns">
    <div class="column is-half is-offset-one-quarter is-centered button is-small is-inverted is-danger">
    </div>
</div>`))
        this.__$error__= this.$container.find('.column')
    }
    set message(message) {
        this.__$error__.text(message)
    }
}
