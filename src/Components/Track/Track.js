import React from "react";
import './Track.css'

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.renderAction = this.renderAction.bind(this);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    renderAction(isRemoval) {
        if (isRemoval === "true") return <button className="Track-action" onClick={this.removeTrack}>-</button>;
        if (isRemoval === "false") return <button className="Track-action" onClick={this.addTrack}>+</button>
    }

    render() {
        let getButton = this.renderAction(this.props.isRemoval);
        let nameShortened = (trackname, num) => {
            if (trackname.length > 35) {
                return `${trackname.substring(0, num)}...`
            }
            else return trackname
        }
        let newName = nameShortened(this.props.track.name, 35);
        let newAlbum = nameShortened(this.props.track.album, 35)
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>
                        {newName}
                    </h3>
                    <p>
                        {this.props.track.artist}        |
                        {newAlbum}
                    </p>
                </div>
                {getButton}
            </div>
        )
    }
}