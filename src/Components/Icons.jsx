import React from 'react';
import '../SCSS/icons.scss'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import NoteService from "../Services/NoteService";
import Tooltip from '@material-ui/core/Tooltip';
import Collaborater from "./Collaborator.jsx";
import Image from "./Image.jsx"

let services = new NoteService();



export default class Icons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            SnackbarOpen: false,
            SnackbarMessage: '',
            NoteId: '',
            delet: true,
            open: false,
            collaboraterHandel: false,
            colorHandel: false,
            imageHandel: false,
            colorCodeState: '',
            noteList: '',
            purpel: "#fdcfe8",
            responseData: '',
            createNote: null,
            list: [
                { name: "purpael", Code: "#9B30FF" },
                { name: "pink", Code: "#fdcfe8" },
                { name: "brown", Code: "#e6c9a8" },
                { name: "grey", Code: "#e8eaed" },
                { name: "darkBlue", Code: "#aecbfa" },
                { name: "blue", Code: "#cbf0f8" },
                { name: "tiel", Code: "#a7ffeb" },
                { name: "green", Code: "#ccff90" },
                { name: "yellow", Code: "#fff475" },
                { name: "orange", Code: "#fbbc04" },
                { name: "red", Code: "#f28b82" },
                { name: "default", Code: "#e0e0e0" }
            ]
        };
    }

    deleteNote = async () => {
        if(this.props.noteId === undefined)
        {
            alert('first create note !!!')
        }
        else{
            await this.setState({ NoteId: this.props.noteId.id });
            const apiDataToDeleteNote = {
                isDeleted: this.state.delet,
                noteIdList: [this.state.NoteId]
            };
            services
                .deleteNote(apiDataToDeleteNote)
                .then((json) => {
                    if (json.status === 200) {
                        this.setState({
                            SnackbarOpen: true, SnackbarMessage: 'note deleted Sucessfull !!',
                        });
                        this.props.refraceNote();
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
       
    }


    handelColor = async (colorCode) => {
        if ( this.props.noteId === undefined) {
            this.props.changeColor(colorCode,this.props.refraceNote);
            console.log("color code", colorCode);
          
        }
        else{
            await this.setState({ noteList: this.props.noteId.id });
            const apiRequestData = {
                color: colorCode,
                noteIdList: [this.state.noteList]
            };
           
            services
                .addColorToNote(apiRequestData)
                .then((response) => {
                    console.log(response);
                    this.props.refraceNote();
                })
                .catch((err) => {
                    console.log(err);
                });
        }


    };


    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }

    handleToggle = () => {
        this.setState(state => ({ open: !this.state.open }));
    };
    handleToggleColor = () => {
        this.setState(state => ({ colorHandel: !this.state.colorHandel }));
    }

    handleClose = event => {
        this.setState({ open: false });
    };

    handleCollaboraterOpen = () => {
        this.setState({
            collaboraterHandel: true
        });
        console.log("open");
    }

    handleCollaboraterClose = () => {
        this.setState({ collaboraterHandel: false });
    }

    handleAddColorToggle = () => {
        this.setState(state => ({ colorHandel: !this.state.colorHandel }));
    };


    handleColorMenuColse = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({ colorHandel: false });
    };


    handalImageMenu = () => {
        this.setState({ imageHandel: true });
    }



    render() {
        const { open } = this.state;

        return (

            <React.Fragment>
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

                <div className="Iconbody">
                    <div className="iconf">
                        <Tooltip title="Notification" interactive>
                            <IconButton edge="start" color="inherit" >
                                <NotificationsActiveIcon fontSize="small" color="inherit" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="iconf">
                        <Tooltip title="Collaborater" interactive>
                            <IconButton edge="start" color="inherit" onClick={() => this.handleCollaboraterOpen()} >
                                <PersonAddOutlinedIcon fontSize="small" color="inherit" />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <div className="iconf">
                        <Tooltip title="Change Color" interactive>
                            <IconButton edge="start" color="inherit"
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                aria-owns={this.state.colorHandel ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleAddColorToggle}>
                                <ColorLensOutlinedIcon fontSize="small" color="inherit" />
                            </IconButton>
                        </Tooltip>
                        <Popper open={this.state.colorHandel} anchorEl={this.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{ transform: "translate3d(-100px, -135px, 0px)"}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={this.handleColorMenuColse}>
                                            <MenuList>
                                                <div className="colorCard">
                                                    {
                                                        this.state.list.map((row) => (
                                                            <div className="colorBody" style={{ backgroundColor: row.Code }} onClick={() => this.handelColor(row.Code)}></div>

                                                        ))}

                                                </div>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>

                    <div className="iconf">
                        <Image noteData={this.props.noteId} addImageOncreateNote={this.props.addImageOncreateNote} refraceNote={this.props.refraceNote}/>
                    </div>




                    <div className="iconf">
                        <Tooltip title="Archive" interactive>
                            <IconButton edge="start" color="inherit" aria-label="menu"  >
                                <ArchiveIcon fontSize="small" color="rgba(0, 0, 0, 0.54)" />
                            </IconButton>
                        </Tooltip>
                    </div>





                    <div className="iconf">
                        <Tooltip title="More" interactive>
                            <IconButton edge="start" color="inherit" buttonRef={node => {
                                this.anchorEl = node;
                            }}
                                aria-owns={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleToggle} >

                                <MoreVertOutlinedIcon fontSize="small" color="inherit" />
                            </IconButton>
                        </Tooltip>

                        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{  transform: "translate3d(-45px, -120px, 0px)"  }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={this.handleClose}>
                                            <MenuList>
                                                <MenuItem onClick={this.deleteNote}>Delete note</MenuItem>
                                                <MenuItem onClick={this.handleClose}>Add Label</MenuItem>
                                                <MenuItem onClick={this.handleClose}>Add drawing</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div >
                <Collaborater collabaroterState={this.state.collaboraterHandel} Id={this.props.noteId} closeMethod={this.handleCollaboraterClose}  addColoboratorOnCreateNote={this.props.addColoboratorOnCreateNote} updateNote={this.props.refraceNote}/>
            </React.Fragment>

        );
    }


}