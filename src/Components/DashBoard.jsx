import React from 'react';
import "./dashboard.scss";
import MiniDrawer from './drawer.jsx';
import IconButton from '@material-ui/core/IconButton';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import CreateNote from './CreateNote.jsx';
import NoteService from "../Services/NoteService";
import DisplayNote from "./DisplayNote.jsx";
import "./dashboard.scss";
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';
import pintask from "../assetes/pintask.svg";
import { withStyles } from '@material-ui/core/styles';

export default class DashBord extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
        };
    }
    handleDrawerOpen = (event) => {
            this.setState({ open: !this.state.open });
    };
    render() {
        return (
            <div className="main">

                <div className="appbar">
                    <div className="header">
                        <div className="icon" onClick={this.handleDrawerOpen}>
                            <div className="menuIcon" >
                                <IconButton edge="start" color="inherit" aria-label="menu" >
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </div>
                            <div className="heading" >
                                <Typography variant="h6" >
                                    Fundoo
                                </Typography>
                            </div>

                        </div>
                        <div className="icon1">
                            <div className="searchBarContainer">
                                <div className="searchIcon">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <SearchIcon />
                                    </IconButton>

                                </div>
                                <div className="inputBox">
                                    <InputBase
                                        placeholder="Search"
                                        inputProps={{ 'aria-label': 'search' }}
                                        fullWidth
                                    />
                                </div>
                                <div className="clearIcon">
                                    <IconButton edge="start" color="inherit" aria-label="menu">
                                        <ClearIcon />
                                    </IconButton>

                                </div>
                            </div>

                        </div>
                        <div className="icon2">
                            <div className="refreshIcon">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <RefreshIcon />
                                </IconButton>
                            </div>
                            <div className="settingIcon">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <SettingsIcon />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="drawer" >

                    <div className={this.state.open ? "sideNav1" : "sideNav"} >

                        <List aria-label="menu" edge="start">
                            <div className="note">
                                <ListItem button>
                                    <ListItemIcon>
                                        <NoteOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Notes" />
                                </ListItem>
                            </div>
                            <div className="note">
                                <ListItem button>
                                    <ListItemIcon>
                                        <NotificationsNoneOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Remainder" />
                                </ListItem>
                            </div>
                            <div className="note">
                                <ListItem button>
                                    <ListItemIcon>
                                        <EditOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Edit Labels" />
                                </ListItem>
                            </div>
                            <div className="note">
                                <ListItem button>
                                    <ListItemIcon>
                                        < ArchiveIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Archive" />
                                </ListItem>
                            </div>
                            <div className="note">
                                <ListItem button>
                                    <ListItemIcon >
                                        < DeleteOutlineOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Trash" />
                                </ListItem>
                            </div>
                        </List>
                    </div>
                </div>
                <div className="mainBody">
                    <CreateNote />
                    <div className="getAllNote">
                        <DisplayNote />
                    </div>

                </div>
            </div>


        );
    }
}