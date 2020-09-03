import React from 'react';
import  DisplayNote  from "./DisplayNote.jsx";
import "../SCSS/trash.scss"
export default class Delete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="mainBody">
                <h3 className="trashHeading">Notes in Trash are deleted after 7 days. </h3>
                <DisplayNote />
            </div>
        );
    }
}