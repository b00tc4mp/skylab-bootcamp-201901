/**
 * main.js of the Spotify App
 */

 /* Token is set in global scope so that it can always be accesed. Has to be updated every hour */

 spotifyApi.token ='BQCg2AX-c8P5WiLwkXeQgQKJpeh90GhnuYRLdgkf4X3xNVDAWR5bdBjcRsLhQqTmby5d2jORPev2DLB9o-AzQ7P53UWS5nu3VHwRV5S9x0lgdDug1xeplF7GwWoNx1XWfCyN6cT7OtOfD3tijGM'

 
 
 const loginPanel = new LoginPanel
 const registerPanel = new RegisterPanel
 const searchPanel = new SearchPanel
 const artistPanel = new ArtistPanel
 const albumPanel = new AlbumPanel
 const tracksPanel = new TracksPanel
 const trackPanel = new TrackPanel
 const errorPanel = new ErrorPanel
 
 
 registerPanel.hide()
 searchPanel.hide()
 artistPanel.hide()
 albumPanel.hide()
 tracksPanel.hide()
 trackPanel.hide()
 errorPanel.hide()
 
 
 const $root = $('#root')
 
 $root.append(loginPanel.$container)
 $root.append(registerPanel.$container)
 $root.append(searchPanel.$container)
 $root.append(artistPanel.$container)
 $root.append(albumPanel.$container)
 $root.append(tracksPanel.$container)
 $root.append(trackPanel.$container)
 
 
 loginPanel.onLogin = function(email, password) {
     try {
         logic.login(email, password, function(user) {
             loginPanel.hide()
             loginPanel.clear()
 
             searchPanel.user = user
             searchPanel.show()
         });
     } catch(err) {
         loginPanel.error = err.message
     }
 };
 
 
 loginPanel.onGoToRegister = function() {
     loginPanel.hide()
     loginPanel.clear()
 
     registerPanel.show()
 };
 
 
 registerPanel.onRegister = function(name, surname, email, password, passwordConfirmation) {
     try {
         logic.register(name, surname, email, password, passwordConfirmation, function() {
             registerPanel.hide()
             registerPanel.clear()
 
             loginPanel.show()
         });
     } catch(err) {
         registerPanel.error = err.message
     }
 };
 
 
 registerPanel.onGoToLogin = function() {
     registerPanel.hide()
     registerPanel.clear()
 
     loginPanel.show()
 };
 
 
 searchPanel.onSearch = function (query) {
     artistPanel.clear()
     albumPanel.clear()
     tracksPanel.clear()
     trackPanel.clear()
     searchPanel.errorClear()
 
     artistPanel.hide()
     albumPanel.hide()
     tracksPanel.hide()
     trackPanel.hide()
     try {
         logic.searchArtists (query, function (error, artists){
             if (error) searchPanel.error = error.message
             else {
                 artistPanel.artists = artists
 
                 artistPanel.show()
             }
         })
     } catch (err) {
         searchPanel.error = err.message
     }
 }
 
 
 searchPanel.onLogout = function() {
     searchPanel.hide();
     searchPanel.errorClear()
 
     loginPanel.clear();
     loginPanel.show();
 };
 
 
 artistPanel.onArtistSelected = function(artistId) {
     try {
         logic.retrieveAlbums(artistId, function(error, albums) {
             if(error) artistPanel.error = error.message
             else {
                 artistPanel.hide()
 
                 albumPanel.albums = albums
 
                 albumPanel.show()
             }
         })
     } catch (err) {
         artistPanel.error = err.message
     }
 }
 
 
 albumPanel.onAlbumSelected = function (albumId) {
     try {
         logic.retrieveTracks (albumId, function(error, tracks) {
             if (error) albumPanel.error = error.message
             else {
                 albumPanel.hide()
 
                 tracksPanel.tracks = tracks
 
                 tracksPanel.show()
             }
         })
     } catch (err) {
         albumPanel.error = err.message
     }
 }
 
 
 albumPanel.onBackToArtists = function() {
     albumPanel.hide()
     albumPanel.clear()
 
     artistPanel.show()
 }
 
 
 tracksPanel.onTrackSelected = function(trackId) {
     try {
         logic.retrieveTrack (trackId, function (error, track) {
             if (error) tracksPanel.error = error.message
             else {
                 tracksPanel.hide()
 
                 trackPanel.track = track
 
                 trackPanel.show()
             }
         })
 
     } catch (err) {
         tracksPanel.error = error.message
     }
 }
 
 
 tracksPanel.onBackToAlbums = function() {
     tracksPanel.hide()
     tracksPanel.clear()
 
     albumPanel.show()
 }
 
 
 trackPanel.onBackToTracks = function() {
     trackPanel.hide()
     trackPanel.clear()
 
     tracksPanel.show()
 }