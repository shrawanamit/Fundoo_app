import React from 'react';
import "../SCSS/displayNote.scss";
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
import Config from "../Configuration/config";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { displayNote } from '../redux/Action/Action'

let services = new NoteService();
const baseURl = Config.imageBaseURl;


class DisplayNote extends React.Component {

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
            collaborators: [],
            imageUrl: '',
            newImageUrl: '',
            inputItemValue: '',
            checkListId: '',
            notesId: '',
            status: '',
            itemName: '',
        };
    }



    handleClickOpen = (cardObject) => {
        this.setState({
            open: true,
            id: cardObject.id,
            title: cardObject.title,
            description: cardObject.description,
            noteColor: cardObject.color,
            noteCheckLists: [...cardObject.noteCheckLists],
            collaborators: cardObject.collaborators,
            imageUrl: cardObject.imageUrl,
        });
        console.log("======note check list===========", cardObject.noteCheckLists);
    };

    updateList = (object, index) => {
        console.log("value ", object, "index", index);
        const noteCheckLists = [...this.state.noteCheckLists];
        if (object.status === 'open') {
            object.status = 'close';
            noteCheckLists[index].status = 'close';
            this.setState({
                noteCheckLists: noteCheckLists,
            })
        }
        else {
            object.status = 'open';
            noteCheckLists[index].status = 'open';
            this.setState({
                noteCheckLists: noteCheckLists,
            })
        }


        const apiRequestData = {
            checklistId: object.id,
            itemName: object.itemName,
            isDeleted: false,
            notesId: object.notesId,
            status: object.status,
        };
        services
            .updateList(apiRequestData)
            .then((json) => {
                if (json.status === 200) {
                    console.log(json);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };


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

    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
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
                {this.props.getAllNote.reverse().filter(value => value.isDeleted === false).map((row) => (
                    <div className="getNotes" style={{ backgroundColor: row.color }}>
                        <div className="pin">
                            <img src={pintask} class="pinImage" alt="pinTask" />
                        </div>
                        {row.imageUrl.includes("client") ?
                            <div className="displayImageContener">
                                <img src={baseURl + row.imageUrl.replace("client", "")} alt="uploaded image" className="displayImage" />

                            </div> :
                            <div className="displayImageContener">
                                <img src={baseURl + '/' + row.imageUrl} className="displayImage" />

                            </div>
                        }
                        <div className="titleHidden">
                            <div className="displayTitle" onClick={() => this.handleClickOpen(row)}>
                                {row.title}
                            </div>
                        </div>
                        <div className="discreptionHidden">
                            {row.description}
                        </div>
                        <div>
                            {row.noteCheckLists.filter((value) => value.status === 'open').map((object) => (
                                <div className="discreptionHidden">
                                    <CheckBoxOutlineBlankIcon fontSize="small" color="inherit" style={{ opacity: 0.71 }} onClick={() => this.handleCheckList(object)} />
                                    <div className="listContener">
                                        {object.itemName}
                                    </div>
                                </div>
                            ))}

                            {row.noteCheckLists.filter((value) => value.status === 'close').map((object) => (
                                <div className="discreptionHidden">
                                    <CheckBoxOutlinedIcon fontSize="small" color="inherit" style={{ opacity: 0.71, cursor: 'pointer' }} onClick={() => this.handleCheckList(object)} />
                                    <div className="listContenercheked">
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
                                {this.state.imageUrl.includes("client") ?
                                    <div className="displayImageUpdate">
                                        <img src={baseURl + this.state.imageUrl.replace("client", "")} alt="uploaded image" className="updatedisplayImage" />
                                        <div className="deleteIcon">
                                            <DeleteOutlineIcon />
                                        </div>
                                    </div> :
                                    <div></div>
                                }
                                <div className="title">
                                    <InputBase
                                        placeholder="Title"
                                        fullWidth
                                        multiline
                                        name="title"
                                        value={this.state.title}
                                        onChange={this.handleChangeText}
                                    /></div>
                                {this.state.description !== '' ?
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
                                        {this.state.noteCheckLists.filter((value) => value.status === 'open').map((object, index) => (
                                            <div className="discreptionHidden">
                                                <CheckBoxOutlineBlankIcon fontSize="small" color="inherit" style={{ opacity: 0.71 }} onClick={() => this.updateList(object, index)} />
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
                                        <Divider />
                                        {this.state.noteCheckLists.filter((value) => value.status === 'close').map((object, index) => (
                                            <div className="discreptionHidden">
                                                <CheckBoxOutlinedIcon fontSize="small" color="inherit" style={{ opacity: 0.71, cursor: 'pointer' }} onClick={() => this.updateList(object, index)} />
                                                <div className="listContenercheked" >
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
const mapStateToProps = state => {
    return {
        getAllNote: [...state.allNotes]
    };

}

export default connect(mapStateToProps)(DisplayNote)