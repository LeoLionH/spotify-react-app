const { SearchBar } = require("../Components/SearchBar/SearchBar");

let accessToken = ""
let expiry = "";
const clientId = "3d42d9bdc09b493baf8041ff961669ef";
const redirectURI = "http://localhost:3000/";
const validationURL = `https://accounts.spotify.com/en/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectURI}`


const Spotify = {
    getAccessToken() {
        console.log('script ran')
        if (accessToken !== "") {
            console.log('first if');
            return accessToken;
        }
        if (window.location.href === "http://localhost:3000/") {
            console.log('second if statement');
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
        }
        if (accessToken === "") {
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

    async search(term) {
        return new Promise(function (resolve) {
            let trackArray = [];
            fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
                .then(res => res.json())
                .then(res => res.tracks.items)
                .then(res => res.map(track => trackArray.push({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                })))
                .then((res) => {
                    //console.log(trackArray);
                    resolve(trackArray)
                })
        }
        )
    }
};


Spotify.getAccessToken();
module.exports = { Spotify }