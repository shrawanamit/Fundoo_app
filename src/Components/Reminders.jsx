import React from 'react';
import CreateNote from './CreateNote.jsx';

export default class Reminders extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        return (
            <div className="mainBody">
                <CreateNote />
            </div>
        );
    }
}