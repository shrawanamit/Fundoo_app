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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Divider from '@material-ui/core/Divider';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
let services = new NoteService();


export default class DisplayNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allNotes: [],
            open: false,
            id: '',
            title: '',
            discrreption: '',
            SnackbarOpen: false,
            SnackbarMessage: '',
            noteColor: null,
            noteCheckLists: [],
            collaborators: []
        };
    }



    handleClickOpen = (cardObject) => {
        this.setState({
            open: true,
            id: cardObject.id,
            title: cardObject.title,
            description: cardObject.description,
            noteColor: cardObject.color,
            noteCheckLists: cardObject.noteCheckLists,
            collaborators: cardObject.collaborators
        });
        console.log("======note color===========", this.state.noteColor);
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
            this.setState({ allNotes: data.data.data.data.filter(user => user.isDeleted === false) });

            console.log("allNotes Array", this.state.allNotes);
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
                {this.state.allNotes.reverse().map((row) => (
                    <div className="getNotes" style={{ backgroundColor: row.color }}>
                        <div className="displayImageContener">
                            <div className="displayImage"></div>
                        </div>
                        <div className="titleHidden">
                            <div className="displayTitle" onClick={() => this.handleClickOpen(row)}>
                                {row.title}
                            </div>
                            <div className="pinIcons">
                                <img src={pintask} class="pinImage" alt="pinTask" />
                            </div>
                        </div>

                        {/* if(row.description != ""){ */}
                        <div className="discreptionHidden">
                            {row.description}
                        </div>
                        <div>
                            {row.noteCheckLists.filter((value) => value.status === 'open').map((object) => (
                                <div className="discreptionHidden">
                                    <CheckBoxOutlineBlankIcon fontSize="small" color="inherit" style={{ opacity: 0.71 }} />
                                    <div className="listContener">
                                        {object.itemName}
                                    </div>
                                </div>
                            ))}

                            {row.noteCheckLists.filter((value) => value.status === 'close').map((object) => (
                                <div className="discreptionHidden">
                                    <CheckBoxOutlinedIcon fontSize="small" color="inherit" style={{ opacity: 0.71, cursor: 'pointer' }} />
                                    <div className="listContener">
                                        {object.itemName}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="displayCollaborater">
                            {row.collaborators.map((object) => (
                                <div className="collaboraterBody">
                                    {object.email[0]}
                                </div>
                            ))}


                        </div>
                        <div className="getIcons">
                            <Icons noteId={row} refraceNote={this.getAllNote} />
                        </div>

                    </div >
                ))}

                <div className="dilogBox" style={{ backgroundColor: this.state.noteColor }}>
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
                                {this.state.discrreption !== '' ?
                                    <div className="note1">
                                        <InputBase
                                            placeholder="Note"
                                            fullWidth
                                            multiline
                                            name="description"
                                            value={this.state.description}
                                            onChange={this.handleChangeText}
                                        />
                                    </div> :
                                    <div>
                                        {this.state.noteCheckLists.filter((value) => value.status === 'open').map((object) => (
                                            <div className="discreptionHidden">
                                                <CheckBoxOutlineBlankIcon fontSize="small" color="inherit" style={{ opacity: 0.71 }} />
                                                <div className="listContener">
                                                    <InputBase
                                                        fullWidth
                                                        multiline
                                                        name="updateList"
                                                        defaultValue={object.itemName}
                                                        onChange={this.handleChangeList}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {this.state.noteCheckLists.filter((value) => value.status === 'close').map((object) => (
                                            <div className="discreptionHidden">
                                                <CheckBoxOutlinedIcon fontSize="small" color="inherit" style={{ opacity: 0.71, cursor: 'pointer' }} />
                                                <div className="listContener">
                                                    <InputBase
                                                        fullWidth
                                                        multiline
                                                        name="updateList"
                                                        defaultValue={object.itemName}
                                                        onChange={this.handleChangeList}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }

                                <div className="displayCollaborater">
                                    {this.state.collaborators.map((object) => (
                                        <div className="collaboraterBody">
                                            {object.email[0]}
                                        </div>
                                    ))}
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
