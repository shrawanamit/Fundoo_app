import React from 'react';
import DisplayNote from "./DisplayNote.jsx";
export default class Archive extends React.Component {

    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div className="mainBody">
                <DisplayNote />
            </div>
        );
    }
}