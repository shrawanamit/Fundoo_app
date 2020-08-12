import React from 'react';
import './icons.scss'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import ArchiveIcon from '@material-ui/icons/Archive';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

export default class Icons extends React.Component {
    render() {
        return (
            <div className="Iconbody">
                <div className="iconf">
                    <IconButton edge="start" color="inherit" >
                        <NotificationsActiveIcon fontSize="small"  color="inherit"/>
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit" >
                        <PersonAddOutlinedIcon fontSize="small"  color="inherit"/>
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit"  >
                        <ColorLensOutlinedIcon fontSize="small"  color="inherit"/>
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit" >

                        <ImageOutlinedIcon fontSize="small"  color="inherit"/>
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit" >
                        <ArchiveIcon fontSize="small"  color="inherit"/>
                    </IconButton>
                </div>
                <div className="iconf">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MoreVertOutlinedIcon fontSize="small"  color="rgba(0, 0, 0, 0.54)"/>
                    </IconButton>
                </div>
            </div>
        );
    }
}