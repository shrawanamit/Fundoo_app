import React from 'react';
import './icons.scss'
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import NoteService from "../Services/NoteService";
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
        };
        // console.log(this.props.noteId.id);
    }

    deleteNote = () => {
        this.setState({ NoteId: this.props.noteId.id });
        const apiDataToDeleteNote = {
            isDeleted: this.state.delet,
            noteIdList: [this.state.NoteId]
        };
        console.log(apiDataToDeleteNote.noteIdList);
        const token = localStorage.getItem('token');

        services
            .deleteNote(apiDataToDeleteNote,token)
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
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;
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
                    <IconButton edge="start" color="inherit" >
                        <NotificationsActiveIcon fontSize="small" color="inherit" />
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit" >
                        <PersonAddOutlinedIcon fontSize="small" color="inherit" />
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit"  >
                        <ColorLensOutlinedIcon fontSize="small" color="inherit" />
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit" >
                        <ImageOutlinedIcon fontSize="small" color="inherit" />
                    </IconButton>
                </div>

                <div className="iconf">
                    <IconButton edge="start" color="inherit" aria-label="menu"  onClick={this.deleteNote}>
                        <ArchiveIcon fontSize="small" color="rgba(0, 0, 0, 0.54)" />
                    </IconButton>
                </div>

                <div className="iconf">
                    <IconButton edge="start" color="inherit" buttonRef={node => {
                        this.anchorEl = node;
                    }}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle} >
                        <MoreVertOutlinedIcon  fontSize="small" color="inherit" />
                    </IconButton>
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
                                            <MenuItem >Delete note</MenuItem>
                                            <MenuItem onClick={this.handleClose}>Add Label</MenuItem>
                                            <MenuItem onClick={this.handleClose}>Add drawing</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </div>
            </div>
        );
    }
}