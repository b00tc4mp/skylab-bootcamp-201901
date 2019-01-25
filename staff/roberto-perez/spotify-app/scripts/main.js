const searchPanel = new SearchPanel();
const artistsPanel = new ArtistsPanel();

const $root = $('#root');


artistsPanel.hide();

$root.append(searchPanel.$container);
$root.append(artistsPanel.$container);

searchPanel.onSearch = function(query) {
    try {
        logic.searchArtists(query, function(error, artists) {
            if(error) {
                searchPanel.error = error;
            } else {
                artistsPanel.artists = artists;
                artistsPanel.show();
            }
        });
    } catch (err) {

    }
};