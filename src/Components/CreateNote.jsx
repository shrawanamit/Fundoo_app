import React from 'react';
import "./createNote.scss";
import Icons from './Icons.jsx';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import NoteService from "../Services/NoteService";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { Tooltip } from '@material-ui/core';
let services = new NoteService();


export default class CreateNote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            SnackbarOpen: false,
            SnackbarMessage: '',
            noteOpen:true,

        };
    }

    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }

    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    createNoteOpen = () => {
        this.setState({ noteOpen: false });
    }


    Createnote = () => {
        
        const apiInputData = {
            title: this.state.title,
            description: this.state.description,
        };
        
        services
            .CreateNote(apiInputData)
            .then((json) => {
                if (json.status === 200) {
                    this.setState({
                        SnackbarOpen: true, 
                        SnackbarMessage: 'note created Sucessfull !!',
                        noteOpen: true
                    });
                   
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
        return (
            <div className="createNote">
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
                {this.state.noteOpen ?
                 <div className="noteBody1" onClick={() => this.createNoteOpen()}>
                    <div className="note2">
                        <InputBase
                            placeholder="Take a note..."
                            fullWidth
                            name="description"
                        />
                    </div>
                    <div className="noteIcon">
                        <div className="noteIcon1">
                        <Tooltip title="New List">
                            <IconButton  color="inherit">
                                <CheckBoxOutlinedIcon fontSize="small" color="inherit" />
                            </IconButton>
                            </Tooltip>
                        </div>
                        <div className="noteIcon1">
                        <Tooltip title="Add Note with Drawing">
                            <IconButton edge="start" color="inherit" >
                                <BrushOutlinedIcon fontSize="small" color="inherit" />
                            </IconButton>
                            </Tooltip>
                        </div>
                        <div className="noteIcon1">
                            <Tooltip title="Add Image">
                            <IconButton edge="start" color="inherit" >
                                <ImageOutlinedIcon  fontSize="small" color="inherit" />
                            </IconButton>
                            </Tooltip>
                           
                        </div>
                    </div>
                </div>:
                <div className="noteBody">
               
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
                                placeholder="Take a note..."
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
                                <Button  onClick={this.Createnote}>Close</Button>
                                </div>
                            </div>
                        </div> 
                    </div>  }


                    {/* <div className="noteBody">
               
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
                      placeholder="Take a note..."
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
                      <Button  onClick={this.Createnote}>close</Button>
                      </div>
                  </div>
              </div> 
          </div> */}

            </div>
        );
    }
}