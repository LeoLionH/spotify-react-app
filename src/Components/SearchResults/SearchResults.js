import React from "react";
import './SearchResults.css';
import { TrackList } from "../TrackList/TrackList";



export class SearchResults extends React.Component {
    render() {
        return (
            <div className="SearchResults">
                <h2 id="result">Results</h2>
                <TrackList tracks={this.props.SearchResults} onAdd={this.props.onAdd} isRemoval="false" />
            </div>
        )
    }
}