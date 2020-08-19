import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import NoteService from "../Services/NoteService";
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CheckOutlinedIcon from '@material-ui/icons/CheckOutlined';
let services = new NoteService();


export default class Collaborator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInput: '',
            filteredList: [],
            open: true,
            firstName:'',
            lastName:'',
            userId:'',
            Id:'',

        };
    }


   


    handelClick = (arrarObject) => {
        this.setState({ 
            open: !this.state.open,
            userInput: arrarObject.email,
            firstName:arrarObject.firstName,
            lastName:arrarObject.lastName,
            userId:arrarObject.userId,
            filteredList:[],
            
        });
    }

    handelSearch = (e) => {
        this.setState({ userInput: e.target.value });
        const apiRequestData = {
            searchWord: e.target.value,
        };
        services
            .searchUserList(apiRequestData)
            .then((data) => {
                this.setState({ filteredList: data.data.data.details });
                console.log("user list", data);
            })
            .catch((err) => {
                console.log(err);
            });

    }
    addColaborater = ()=>{
        console.log(this.props.Id.id);
        const apiRequest = {
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email: this.state.userInput,
            userId:this.state.userId,
            id:this.props.Id.id,
        };
        services
        .colaboratesNote(apiRequest)
        .then((data) => {
            console.log("colaborate notes", data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        const myBest = this.state.filteredList.slice(0, 10);
        return (
            <div>
                <div className="collaboraterContainer" >
                    <Dialog open={this.props.collabaroterState}
                        onClose={this.handleCollaboraterClose}>
                        <DialogTitle id="alert-dialog-slide-title">
                            Collaborators
                        </DialogTitle>
                        <Divider light />
                        <DialogContent>
                            <div className="CollaboretarBody">
                                <div className="personIcons">
                                    <IconButton edge="start" color="inherit" >
                                        <PersonAddOutlinedIcon fontSize="small" color="inherit" />
                                    </IconButton>
                                </div>
                                <div className="searchemail">
                                    <div className="userInputId">
                                        <InputBase
                                            placeholder="person or email to share with"
                                            fullWidth
                                            type="text"
                                            name="userInput"
                                            value={this.state.userInput}
                                            onChange={this.handelSearch}
                                        />
                                    </div>
                                    <div className="AutoComplite">
                                        <Paper>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList>
                                                    {myBest.map((row) => (
                                                        <MenuItem onClick={() => this.handelClick(row)}>{row.email}</MenuItem>
                                                    ))}
                                                </MenuList>
                                            </ClickAwayListener >
                                        </Paper>
                                    </div>
                                </div>
                                <div className="check" onClick={this.addColaborater}>
                                        <IconButton edge="start" color="inherit" >
                                            <CheckOutlinedIcon fontSize="small" color="inherit" />
                                        </IconButton>
                                    </div>
                            </div>
                        </DialogContent>

                        <div className="dilogAction">
                            <DialogActions>
                                <div className="cbtn">
                                    <Button onClick={this.props.closeMethod}>
                                        Cancel
                                </Button>
                                </div>
                                <div className="cbtn1">
                                    <Button onClick={this.props.closeMethod} >
                                        Save
                                </Button>
                                </div>
                            </DialogActions>
                        </div>
                    </Dialog>
                </div>
            </div>
        );
    }
}