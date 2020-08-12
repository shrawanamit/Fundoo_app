import React from 'react';
import "./displayNote.scss";
import Icons from './Icons.jsx';
import InputBase from '@material-ui/core/InputBase';
import pintask from "../assetes/pintask.svg";
import NoteService from "../Services/NoteService";
let services = new NoteService();


export default class DisplayNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            History: [],

        };
    }

    //for fetching  notes from database
    componentDidMount() {
        this.history();
    }

    history = () => {
        const token = localStorage.getItem('token')
        console.log(token);
        services.getAllNotes(token).then((data) => {
            console.log(" All historyfound ", data.data.data);
            this.setState({ History: data.data.data.data });
            console.log("History Array", this.state.History);
        }).catch((err) => {
            console.log(err);

        })
    }

    render() {
        return (
            <div className="displayNote">
                {this.state.History.map((row) => (
                    <div className="getNotes">
                    
                        <div className="titleHidden">
                            <div className="displayTitle">
                                {row.title}
                            </div>
                            <div className="pinIcons">
                                <img src={pintask} class="pinImage" alt="pinTask" />
                            </div>
                        </div>
                        <div className="discreptionHidden">
                            {row.description}
                        </div>
                        <div className="getIcons">
                            <Icons />
                        </div>
                    </div >
                ))}
            </div>
        );
    }
}