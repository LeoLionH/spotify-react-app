const { SearchBar } = require("../Components/SearchBar/SearchBar");

let accessToken = ""
let expiry = "";
const clientId = "3d42d9bdc09b493baf8041ff961669ef";
const redirectURI = process.env.REACT_APP_URL;
console.log(process.env.REACT_APP_URL);

const Spotify = {
    async getAccessToken() {
        console.log('script ran')
        if (accessToken !== "") {
            console.log('first if');
            return accessToken;
        }
        if (window.location.href === process.env.REACT_APP_URL) {
            console.log('second if statement');
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
        if (accessToken === "") {
            console.log('third if statement');
            //const url = "https://example.com/callback#access_token=NwAExzBV3O2Tk&token_type=Bearer&expires_in=3600&state=123";
            const url = window.location.href;
            console.log(url)
            let access_token = url.match(/access_token=([^&]*)/);
            let expires_in = url.match(/expires_in=([^&]*)/)
            accessToken = access_token[1];
            expiry = expires_in[1];
            console.log(accessToken, expiry)
            if (accessToken !== "" && expiry !== "") {
                window.setTimeout(() => accessToken = "", expiry * 1000);
                window.history.pushState('Access Token', "", '/')
            }

        }
    },
    async savePlaylist(playlist, URIs) {
        //Params
        let userId = "";
        let headers = {
            Authorization: `Bearer ${accessToken}`
        }
        //check content is popluated
        if (playlist === "" || URIs === []) return;
        //Check if playlist exists
        /*
        let checkPlaylist = await fetch(
            `https://api.spotify.com/v1/me/playlists`,
            { headers: headers }
        );
        let checkPlaylistRes = await checkPlaylist.json();
        let existingPlaylists = [];
        console.log(checkPlaylistRes.items[0]);
        let checkPlaylistRes2 = checkPlaylistRes.items.map(playlistMap => existingPlaylists.push(playlistMap.name));
        console.log(await checkPlaylistRes2.json());
        */

        //Create playlist
        let getUser = await fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        });
        console.log(playlist)
        let Json = await getUser.json();
        userId = Json.id;
        let createPlaylist = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
                name: playlist
            })
        })
        let response = await createPlaylist.json();
        console.log(response);
        let playlistID = await response.id
        let addTracksToPlaylist = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            headers: headers,
            method: 'POST',
            body: JSON.stringify({
                uris: URIs,
                position: 0
            })
        })
    },

    async search(term) {
        let trackArray = [];
        let result = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        let formatResult = await result.json()
        let getTracks = await formatResult.tracks.items
        let pushTracks = getTracks.map(track => trackArray.push({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }))
        return trackArray
    }
};

Spotify.getAccessToken();
export { Spotify }