import React from 'react';
import "./displayNote.scss";
import Icons from './Icons.jsx';
import InputBase from '@material-ui/core/InputBase';
import pintask from "../assetes/pintask.svg";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent'
import NoteService from "../Services/NoteService";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

let services = new NoteService();


export default class DisplayNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            History: [],
            open: false,
            id: '',
            title: '',
            discrreption: '',
            SnackbarOpen: false,
            SnackbarMessage: '',
        };
    }

    handleClickOpen = (cardObject) => {
        this.setState({
            open: true,
            id: cardObject.id,
            title: cardObject.title,
            description: cardObject.description
        });
    };
    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }
    updateNote = () => {

        const apiUpdateedInputData = {
            title: this.state.title,
            description: this.state.description,
            noteId: this.state.id,
        };
        services
            .updateNote(apiUpdateedInputData)
            .then((json) => {
                if (json.status === 200) {
                    this.setState({
                        SnackbarOpen: true, SnackbarMessage: 'note update Sucessfull !!', open: false,
                    });
                    this.getAllNote();
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //for fetching  notes from database
    componentDidMount() {
        this.getAllNote();
    }

    getAllNote = () => {
        services.getAllNotes().then((data) => {
            this.setState({ History: data.data.data.data.filter(user => user.isDeleted === false) });

            console.log("History Array", this.state.History);
        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <div className="displayNote" >
                <Snackbar
                    anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    open={this.state.SnackbarOpen}
                    autoHideDuration={3000}
                    onClose={this.SnackbarClose}
                    message={<span id="message-id">{this.state.SnackbarMessage}</span>}
                    action={[
                        <IconButton key="close" aria-label="close"
                            color="inherit" onClick={this.SnackbarClose}>x</IconButton>
                    ]}
                />
                {this.state.History.reverse().map((row) => (
                    <div className="getNotes"  >
                        <div className="titleHidden">
                            <div className="displayTitle" onClick={() => this.handleClickOpen(row)}>
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
                            <Icons noteId={row} />
                        </div>
                    </div >
                ))}

                <div className="dilogBox">
                    <Dialog open={this.state.open}
                        onClose={this.handleClose} >
                        <DialogContent>
                            <div className="dilogBody">
                                <div className="title">
                                    <InputBase
                                        placeholder="Title"
                                        fullWidth
                                        multiline
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChangeText}
                                    /></div>
                                <div className="note1">
                                    <InputBase
                                        placeholder="Note"
                                        fullWidth
                                        multiline
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChangeText}
                                    />
                                </div>
                                <div className="iconsBody">
                                    <div className="iconDiv">
                                        <div className="iconPart1">
                                            <Icons />
                                        </div>
                                        <div className="iconPart2">
                                            <Button onClick={this.updateNote}>close</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        );
    }
}
