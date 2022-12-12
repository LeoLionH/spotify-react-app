import React from "react";
import './SearchBar.css';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.state = { term: "" }
    }

    search() { 
        this.props.onSearch(this.state.term);
    }

    handleTermChange(e) {
        let myTerm = e.target.value;
        this.setState({ term: myTerm });
    }
    render() {
        return(
            <div className="SearchBar" onChange={this.handleTermChange}>
                <input placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton" onClick={this.search} >SEARCH</button>
            </div>
        )
    }
}