import React from 'react';
import CreateNote from './CreateNote.jsx';
import DisplayNote from "./DisplayNote.jsx";
import { connect } from 'react-redux';
import { displayNote } from '../redux/Action/Action';
import NoteService from "../Services/NoteService";

let services = new NoteService();
class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }

    componentDidMount() {
        this.getAllNote();
    }

    getAllNote = () => {
        services.getAllNotes().then((data) => {
            //calling redux action creater
            console.log("props",this.props);
            this.props.displayNote(data.data.data.data);
            console.log("allNotes Array", data.data.data.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="mainBody"> 
                <CreateNote  updateNote={this.getAllNote}/>
                <DisplayNote refraceNote={this.getAllNote}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayNote: (data) => dispatch(displayNote(data))
    }
}
export default connect(null, mapDispatchToProps)(Notes)