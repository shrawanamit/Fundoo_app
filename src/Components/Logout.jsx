import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "../SCSS/logout.scss";
import logo from "../assetes/AccountLogo.jpg";
import auth from "./Auth";
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import IconButton from '@material-ui/core/IconButton';
import { browserHistory } from 'react-router';

export default class Logout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            imageUrl:''
        };
    }
   

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    handelLogOut = () => {
        auth.logout(() => {
            this.props.history.push("/");
        })
    }
    addImage=(e)=> {
        console.log("image");
       
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    imageUrl: reader.result,
                });
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <div
                    aria-owns={anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                >
                    <img src={logo} class="logoImage" alt="pinTask" />
                </div>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    style={{ transform: "translate3d(-20px, 40px, 0px)" }}>
                    <div className="logout">
                        <div className="accountimage">
                            <img src={this.state.imageUrl?this.state.imageUrl:logo} class="displayAccountImage" />
                            <div className="camera">
                                <IconButton edge="start" color="inherit" aria-label="menu">
                                    <input type="file" id="BtnBrowseHidden" name="file" className="image" accept="image/*" onChange={this.addImage} />
                                    <label for="BtnBrowseHidden" id="LblBrowse">
                                        <CameraAltOutlinedIcon fontSize="small" color="inherit" />
                                    </label>
                                </IconButton>
                            </div>
                        </div>
                        <div className="name">
                            <span>Amit kumar</span><br />
                            <span>amitkumar06111@gmail.com</span>
                        </div>
                        <div className="btnLogout">
                            <br /><br />
                            <Button variant="outlined" onClick={this.handelLogOut}>
                                logout
                            </Button>
                        </div>

                    </div>
                </Menu>
            </div>
        );
    }
}