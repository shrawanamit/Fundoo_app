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
import MenuList from "./SearchMenuList.jsx";
let services = new NoteService();


export default class Collaborator extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            email:'',
            userList: []
        };
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
// //for fetching  notes from database
//     componentDidMount() {
//         this. handelSearch();
//     }

    handelSearch = () =>{
        const apiRequestData={
            searchWord:this.state.email
        };
        
        
        services
        .searchUserList(apiRequestData)
        .then((resPonse)=>{
          
                this.setState({userList: resPonse.data.details.email});

                console.log("user list", this.state.userList);
         
        })
        .catch((err) => {
            console.log(err);
        });

    }
   

    render() {
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
                                <div className="emailId">
                                    <InputBase
                                        placeholder="person or email to share with"
                                        fullWidth
                                        fullWidth
                                        type="email"
                                        name="email"
                                        label="Username"
                                        defaultValue={this.state.email}
                                        onChange={this.handleChange} 
                                        onKeyUp={this. handelSearch}

                                    />
                                </div>
                                {/* <div><MenuList /></div> */}
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