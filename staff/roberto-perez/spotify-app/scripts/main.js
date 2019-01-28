spotifyApi.token = 'BQDRYF_TBN6VXT72o2sSgoY0N9YKoBXW5BSBBkGITohClqoPiRe-Dczo4FgRmYiF4bwewUyLuO_SWsqbTeAvSRTjDQ9sKd8Rs2gKNWDSY1EmKhs9Sb1F06iqLSwZmxTbIl7oW462HIh3Gg';

const searchPanel = new SearchPanel();
const headerPanel = new HeaderPanel();
const artistsPanel = new ArtistsPanel();
const albumsPanel = new AlbumsPanel();
const tracksPanel = new TracksPanel();
const trackPanel = new TrackPanel();
const errorPanel = new ErrorPanel();

const $root = $('#root')

artistsPanel.hide();
albumsPanel.hide();
tracksPanel.hide();
trackPanel.hide();

$root.append(searchPanel.$container);
$root.append(headerPanel.$container);
$root.append(artistsPanel.$container);
$root.append(albumsPanel.$container);
$root.append(tracksPanel.$container);
$root.append(trackPanel.$container);
$root.append(errorPanel.$container);

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if (error) errorPanel.error = error.message;
            else {
                
                headerPanel.hide();
                albumsPanel.hide();
                tracksPanel.hide();

                albumsPanel.clear();
                tracksPanel.clear();
                artistsPanel.clear();

                artistsPanel.artists = artists;

                artistsPanel.show();

                $(".artist").each(function(i) {
                    $(this).delay(70 * i).fadeIn(500);
                });
            }
        });
    } catch(err) {
        errorPanel.error = err.message;
    }
}

artistsPanel.onArtistSelected = function (artistId) {
    try {
        logic.retrieveAlbums(artistId, function (error, albums) {
            console.log(albums);
            if (error) errorPanel.error = error.message;
            else {
                artistsPanel.hide();

                albumsPanel.albums = albums;

                albumsPanel.show();

                $(".album").each(function(i) {
                    $(this).delay(70 * i).fadeIn(500);
                });

            }
        });
    } catch (err) {
        errorPanel.error = err.message;
    }
}

albumsPanel.onAlbumSelected = function (album) {
    try {
        logic.retrieveTracks(album.id, function (error, tracks) {
            if (error) errorPanel.error = error.message;
            else {
                albumsPanel.hide();
                
                tracksPanel.tracks = {tracks, album};

                tracksPanel.show();
            }
        });
    } catch (err) {
        errorPanel.error = err.message;
    }
}

albumsPanel.onBackToArtists = function(event) {
    event.preventDefault();
    albumsPanel.hide();
    albumsPanel.clear();
    artistsPanel.show();
}

tracksPanel.onPlayTrack = function($item) {

    $.each($('audio'), function (i) {
        if(!$(this)[0].paused) {
            pauseTrack($(this).parent('li'));
            $(this)[0].currentTime = 0;
        }   
    });

    playTrack($item);

}

tracksPanel.onPauseTrack = function($item) {
    pauseTrack($item);
}

tracksPanel.onEndTrack = function($item) {
    pauseTrack($item);
}

tracksPanel.onBackToAlbums = function(event) {
    event.preventDefault();
    tracksPanel.hide();
    tracksPanel.clear();
    albumsPanel.show();
}

errorPanel.onClose = function(event) {
    event.preventDefault();
    errorPanel.fadeOut();
}

const pauseTrack = function($item) {
    const audio = $item.find(".tracks-list__audio");
    const sound = audio[0];
    sound.pause();
    $item.removeClass('tracks-list__track--selected');
    $item.find('.tracks-list__music').show();
    $item.find('.tracks-list__play').show();
    $item.find('.tracks-list__pause').hide();
}

const playTrack = function($item) {
    const audio = $item.find(".tracks-list__audio");
    const sound = audio[0];
    sound.play();
    $item.addClass('tracks-list__track--selected');
    $item.find('.tracks-list__music').hide();
    $item.find('.tracks-list__play').hide();
    $item.find('.tracks-list__pause').show();
}