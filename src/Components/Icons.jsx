import React from 'react';
import './icons.scss'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
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
            collaboraterHandel: false
        };
    }

    deleteNote = () => {
        this.setState({ NoteId: this.props.noteId.id });
        const apiDataToDeleteNote = {
            isDeleted: this.state.delet,
            noteIdList: [this.state.NoteId]
        };
        // console.log(apiDataToDeleteNote.noteIdList);
        // const token = localStorage.getItem('token');

        services
            .deleteNote(apiDataToDeleteNote)
            .then((json) => {
                if (json.status === 200) {
                    this.setState({
                        SnackbarOpen: true, SnackbarMessage: 'note deleted Sucessfull !!',
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }

    handleToggle = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleClose = event => {
        // if (this.anchorEl.contains(event.target)) {
        //     return;
        // }

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

    render() {
        const { open } = this.state;

        return (

            <div className="Iconbody">
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
                        <IconButton edge="start" color="inherit"  >
                            <ColorLensOutlinedIcon fontSize="small" color="inherit" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="iconf">
                    <Tooltip title="Add Image" interactive>
                        <IconButton edge="start" color="inherit" >
                            <ImageOutlinedIcon fontSize="small" color="inherit" />
                        </IconButton>
                    </Tooltip>
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
                </div>

                <div>
                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
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
                    <div><Collaborater  collabaroterState={this.state.collaboraterHandel}  Id={this.props.noteId}closeMethod={this.handleCollaboraterClose}/></div>
        
            </div>
        );
    }
}