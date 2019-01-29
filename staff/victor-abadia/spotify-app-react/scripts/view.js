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
        super($(`<section class="login container col-4">
    <form class="login__form p-2" >
        <h4 class="font-weight-light-normal">Login</h4>
        <div class="form-group">
            <label class="small" for="email">E-mail:</label>
            <input class="form-control input-sm" type="email" name="email" placeholder="example@gmail.com" required>
        </div>
        <div class="form-group">
            <label class="small" for="password">Password:</label>
            <input class="form-control" type="password" name="password" placeholder="password" required>
        </div>
        <button type="submit" class="btn btn-sm active green"><strong>Login</strong></button>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')

        this.__$emailInput__ = this.$container.find('input[type=email]')

        this.__$passwordInput__ = this.$container.find('input[type=password]')

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $registerLink = $('<a href="#" class="btn btn-secondary btn-sm active margin-top">Register</a>');
        this.__$form__.append($registerLink);
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
        super($(`<section class="register container col-6">
    <form class="register__form p-2">
        <h4 class="font-weight-light-normal">Register</h4>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label for="name" class="input-group-text" id="inputGroup-sizing-sm">Name</label>
            </div>
            <input class="form-control" type="text" name="name" aria-label="Small" aria-describedby="inputGroup-sizing-sm" required>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label for="surname" class="input-group-text" id="inputGroup-sizing-sm">Surame</label>
            </div>
            <input class="form-control" type="text" name="surname" required>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label for="email" class="input-group-text" id="inputGroup-sizing-sm">Email</label>
            </div>
            <input class="form-control" type="email" name="email" required>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label for="password" class="input-group-text" id="inputGroup-sizing-sm">Password</label>
            </div>
            <input class="form-control" type="text" name="password" required>
        </div>
        <div class="input-group input-group-sm mb-3">
            <div class="input-group-prepend">
                <label for="password" class="input-group-text" id="inputGroup-sizing-sm">Confirm password</label>
            </div>
            <input class="form-control" type="text" name="password-confirmation" required>
        </div>
        <button type="submit"class="btn btn-sm active green"><strong>Register</strong></button>
    </form>
</section>`))

        this.__$form__ = this.$container.find('form')

        this.__$nameInput__ = this.__$form__.find('input[name=name]')

        this.__$surnameInput__ = this.__$form__.find('input[name=surname]')

        this.__$emailInput__ = this.__$form__.find('input[type=email]')

        this.__$passwordInput__ = this.__$form__.find('input[name=password]')

        this.__$passwordConfirmationInput__ = this.__$form__.find('input[name=password-confirmation]')

        var errorPanel = new ErrorPanel
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel

        var $loginLink = $('<a href="#" class="btn btn-secondary btn-sm active margin-top">Login</a>')
        this.__$form__.append($loginLink)
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
    constructor() {
        super($(`<section class="search">
    <div class="row p-2">
        <div class="col-6">
            <h3>Welcome, <span class="search__name"></span>!</h3>
        </div>
        <div class="col-6 text-right">
            <button class="btn btn-secondary btn-sm active search__logout">Logout</button>
        </div>
    </div>    
    <form class="input-group input-group-sm mb-3 p-2">
        <input class="form-control" id="inputGroup-sizing-sm" placeholder="Search an artist" aria-describedby="button-addon2" type="text" name="query"></input>
        <div class="input-group-append">
            <button class="btn btn-sm active green" id="button-addon2" type="submit">Search</button>
        </div>
    <form>
</section>`))

        this.__$form__ = this.$container.find('form')
        this.__$title__ = this.$container.find('h3')

        this.__$query__ = this.__$form__.find('input')

        this.__$userSpan__ = this.__$title__.find('span')

        this.__$logoutButton__ = this.$container.find('.search__logout')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel
    }
    set onSearch(callback) {
        this.__$form__.on('submit', event => {
            event.preventDefault()

            const query = this.__$query__.val()

            callback(query)
        })
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    errorClear() {
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
    <h4>Artists</h4>
    <div class="card-columns"></div>    
</section>`))

        this.__$list__ = this.$container.find('div')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set artists(artists) {
        artists.forEach(({ id, name, images }) => {
            const image = images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item = $(`<div data-id=${id} class="cursor card">
    <img src="${image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
    </div>
</div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onArtistSelected__(id)
            })
            this.__$list__.append($item)
        })
    }
    set onArtistSelected(callback) {
        this.__onArtistSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }
    clear() {
        this.__$list__.empty()
    }
}

/* AlbumPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: albums to get album data to be displayed, add a click function to each of them with another set to get the id from the album to know which one has been chosen. onBackToArtists to trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class AlbumPanel extends Panel {
    constructor() {
        super($(`<section class="resultsAlbum container">
    <div class="row">
        <h4 class="col">Albums</h4>
        <div class="col text-right">
            <button class="btn btn-light btn-sm">Back to Artists</button>
        </div>
    </div>
    <article class="card-columns"></article>   
</section>`))

        this.__$list__ = this.$container.find('article')

        this.__$backBtn__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }
    set albums(albums) {
        albums.forEach(({ id, name, images, total_tracks }) => {
            const image = images[0] ? images[0].url : 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
            const $item = $(`<div data-id=${id} class="cursor card">
    <img src="${image}" class="card-img-top">
    <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Tracks :${total_tracks}</p>
</div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onAlbumSelected__(id)
            })
            this.__$list__.append($item)
        })
    }
    set onAlbumSelected(callback) {
        this.__onAlbumSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message;
        this.__errorPanel__.show()
    }
    set onBackToArtists(callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear() {
        this.__$list__.empty()
    }
}

/* TracksPanel defined from Panel. Constructor defined creating and HTML snippet. Four sets defined: tracks to get tracks data to be displayed, add a click function to each of them with another set to get the id from the track to know which one has been chosen. onBackToAlbumsto trigger callback function when back button is clicked. Error to send the error message to the error panel and display it. clear function created to empty the results list when needed. */

class TracksPanel extends Panel {
    constructor() {
        super($(`<section class="tracksAlbum container">
    <div class="row">
        <h4 class="col">Tracks</h4>
        <div class="col text-right">
            <button class="btn btn-light btn-sm">Back to Albums</button>
        </div>
    </div>
    <div class="list-group track"></div>    
</section>`))

        this.__$list__ = this.$container.find('.track')

        this.__$backBtn__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container);
        this.__errorPanel__ = errorPanel;
    }

    set tracks(tracks) {
        tracks.forEach(({ id, name }) => {
            const $item = $(`<div data-id=${id} class="cursor list-group-item list-group-item-action list-group-item-light">${name}</div>`)

            $item.click(() => {
                const id = $item.data('id')

                this.__onTrackSelected__(id)
            })
            this.__$list__.append($item)
        })
    }
    set onTrackSelected(callback) {
        this.__onTrackSelected__ = callback
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    set onBackToAlbums(callback) {
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
    <div class="row">
        <h3 class="col">Track</h3>
        <div class="col text-right">
            <button class="btn btn-light btn-sm">Back to Tracks</button>
        </div>
    </div>
    <div class="d-flex justify-content-center">
        <article class="card" style="width: 19rem;"></article>
    </div>    
</section>`))

        this.__$list__ = this.$container.find('article')

        this.__$backBtn__ = this.$container.find('button')

        var errorPanel = new ErrorPanel;
        this.$container.append(errorPanel.$container)
        this.__errorPanel__ = errorPanel
    }
    set track({ id, name, preview_url, uri }) {
        const image = 'https://developer.spotify.com/assets/branding-guidelines/icon3@2x.png'
        const $item = $(`<img data-id=${id} class="card-img-top" src="${image}" alt="Card image cap">
<div class=""card-body"">
    <h5 class="card-text p-2">${name}</h5>
    <audio src=${preview_url} controls> </audio>
    <a href=${uri} class="p-2 btn btn-link">Listen to full song on Spotify</a>
</div>`)

        this.__$list__.append($item)
    }
    set error(message) {
        this.__errorPanel__.message = message
        this.__errorPanel__.show()
    }
    set onBackToTracks(callback) {
        this.__$backBtn__.on('click', callback)
    }
    clear() {
        this.__$list__.empty()
    }
}

/* ErrorPanel defined from Panel. Constructor defined creating and HTML snippet to display the erros. Set defined to get and send message to be displayed in the errorPanel */

class ErrorPanel extends Panel {
    constructor() {
        super($(`<section class="error p-1"></section>`))
    }
    set message(message) {
        this.$container.text(message)
    }
}
