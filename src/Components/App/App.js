import './App.css';
import "./fonts/Poppins-Regular.ttf"
import "./fonts/WorkSans-VariableFont_wght.ttf"
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist'
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults:[
        { 
          name: "one",
          artist:"one",
          album:"one",
          id: "1"
        },
        { 
          name: "two",
          artist:"two",
          album:"two",
          id: "2"
        },
        { 
          name: "three",
          artist:"three",
          album:"three",
          id: "3"
        }
      ],
      playlistName: "string for playlist name",
      playlistTracks: [
        { 
          name: "one",
          artist:"one",
          album:"one",
          id: "1",
          uri: "www.one.com"
        },
        { 
          name: "two",
          artist:"two",
          album:"two",
          id: "2",
          uri: "www.two.com"
        },
        { 
          name: "three",
          artist:"three",
          album:"three",
          id: "3",
          uri: "www.three.com"
        }
      ]
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(playTrack => playTrack.id === track.id)) return;
    else this.state.playlistTracks.push(track);
  }

  removeTrack(track) {
    let index = this.state.playlistTracks.findIndex(playTrack => playTrack.id === track.id);
    if(typeof index === 'number') this.state.playlistTracks.splice(index);
    else return
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    console.log(trackURIs);
  }

  search(term) {
    console.log(term);
  }

  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults SearchResults={ this.state.searchResults } onAdd = {this.addTrack} onRemove={this.removeTrack}/>
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks} 
            onNameChange = {this.updatePlaylistName}
            onSave = {this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
  
}

export default App;
