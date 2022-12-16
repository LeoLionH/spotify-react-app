import './App.css';
import "./fonts/Poppins-Regular.ttf"
import "./fonts/WorkSans-VariableFont_wght.ttf"
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import React from 'react';
import { Spotify } from './../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let findTrackId = this.state.playlistTracks.find(playTrack => playTrack.id === track.id);
    if (findTrackId !== undefined) return console.log('ID Exists');
    if (findTrackId === undefined) this.setState(prevState => ({
      playlistTracks: [...prevState.playlistTracks, track]
    }));
  }

  removeTrack(track) {
    const matchTrackId = input => input.id === track.id;
    let matchedIndex = this.state.playlistTracks.findIndex(matchTrackId);
    if (matchedIndex !== -1) {
      let newPlaylist = this.state.playlistTracks.filter((track, index) => index !== matchedIndex);
      this.setState({ playlistTracks: newPlaylist })
    }
    else return
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    if (this.state.playlistName === "") return alert("Please add a playlist name");
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    let playlistName = this.state.playlistName
    Spotify.savePlaylist(playlistName, trackURIs);
    this.setState({ playlistName: "New Playlist", playlistTracks: [] });
    console.log(playlistName, trackURIs);
  }

  async search(term) {
    let result = await Spotify.search(term);
    console.log(result);
    this.setState({ searchResults: result })
    console.log(this.state.searchResults)
  }

  render() {
    console.log('rendered');
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              SearchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default App;
