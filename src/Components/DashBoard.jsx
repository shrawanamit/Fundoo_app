import React from 'react';
import "../SCSS/dashboard.scss";
import IconButton from '@material-ui/core/IconButton';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Logo from "../assetes/fundooLogo.png";
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArchiveIcon from '@material-ui/icons/Archive';
import Link from '@material-ui/core/Link';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Notes from "./Notes.jsx";
import Logout from "./Logout.jsx";
import Reminders from './Reminders.jsx';
import Archive from "./Archive.jsx";
import Delete from "./Delete.jsx";

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
                            <div class="heading" >
                                <img src={Logo} class="Logo" alt="Logo" />
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
                            </div>

                        </div>
                        <div className="icon3">
                            
                        </div>
                        <div className="icon2">
                            <Logout />
                        </div>
                    </div>
                </div>
                <div className="bodyContener">
                    <div className="drawer" >
                        <div className={this.state.open ? "sideNav1" : "sideNav"} >
                            <List aria-label="menu" edge="start">
                                <div className="note">
                                <Link href="/home/notes" variant="body2" className="link">
                                    <ListItem button autoFocus>
                                        <ListItemIcon>
                                            <NoteOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Notes" />
                                    </ListItem>
                                    </Link>
                                </div>
                                <div className="note">
                                <Link href="/home/reminders" variant="body2">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <NotificationsNoneOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Remainder" />
                                    </ListItem>
                                    </Link>
                                </div>
                                <div className="note">
                                <Link href="/home" variant="body2">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <EditOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit Labels" />
                                    </ListItem>
                                    </Link>
                                </div>
                                <div className="note">
                                <Link href="/home/archive" variant="body2">
                                    <ListItem button>
                                        <ListItemIcon>
                                            < ArchiveIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Archive" />
                                        
                                    </ListItem>
                                    </Link>
                                </div>
                                <div className="note">
                                <Link href="/home/trash" variant="body2">
                                    <ListItem button>
                                        <ListItemIcon >
                                            < DeleteOutlineOutlinedIcon />
                                        </ListItemIcon>
                                        <ListItemText primary="Trash" />
                                    </ListItem>
                                    </Link>
                                </div>
                            </List>
                        </div>
                    </div>
                    <Route  path="/home/notes" component={Notes} />
                    <Route  path="/home/reminders" component={Reminders} />
                    <Route  path="/home/archive" component={Archive} />
                    <Route  path="/home/trash" component={Delete} />
                </div>
            </div>


        );
    }
}