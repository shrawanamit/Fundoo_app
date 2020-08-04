import React from 'react';
import "./dashboard.scss"
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import InputBase from '@material-ui/core/InputBase';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import NoteIcon from '@material-ui/icons/Note';
import DeleteIcon from '@material-ui/icons/Delete';

export default class DashBord extends React.Component {
    render() {
        return (
            <div className="main">
                <div className="appbar">
                    <div className="header">
                        <div className="icon">
                            <div className="menuIcon">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <MenuIcon />
                                </IconButton>
                            </div>
                            <div className="heading">
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

                <div className="sideNav">
                    <div>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <NoteIcon />
                        </IconButton>
                    </div>
                    <div>

                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <NotificationsNoneIcon />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <EditIcon />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <ArchiveIcon />
                        </IconButton>
                    </div>
                    <div>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            < DeleteIcon />
                        </IconButton>
                    </div>
                </div>
            </div>


        );
    }
}