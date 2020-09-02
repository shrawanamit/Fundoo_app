import React from 'react';
import CreateNote from './CreateNote.jsx';
import DisplayNote from "./DisplayNote.jsx";
export default class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    render() {
        return (
            <div className="mainBody">
                <CreateNote />
                <DisplayNote />
            </div>
        );
    }
}