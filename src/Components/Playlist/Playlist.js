import React from "react"
import { TrackList } from "../TrackList/TrackList"
import './Playlist.css'

export class Playlist extends React.Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        console.log(e.target.value)
        this.props.onNameChange(e.target.value)
    }
    render() {
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} placeholder="New Playlist" />
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval="true" />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
