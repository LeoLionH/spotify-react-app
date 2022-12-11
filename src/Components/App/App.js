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
      ]
    } 
  }
  render() {
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults SearchResults={ this.state.searchResults } />
            <Playlist />
          </div>
        </div>
      </div>
    )
  }
  
}

export default App;
