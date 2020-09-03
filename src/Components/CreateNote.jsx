import React from 'react';
import "../SCSS/createNote.scss";
import Icons from './Icons.jsx';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import NoteService from "../Services/NoteService";
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import BrushOutlinedIcon from '@material-ui/icons/BrushOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { Tooltip } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CloseIcon from '@material-ui/icons/Close';
import Checkbox from '@material-ui/core/Checkbox';
import Collaborator from './Collaborator';
import { connect } from 'react-redux';
// import { displayNote } from '../redux/index'


let services = new NoteService();
class CreateNote extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            SnackbarOpen: false,
            SnackbarMessage: '',
            noteOpen: true,
            listOpen: true,
            addListItem: true,
            listItem: '',
            checklist: null,
            inputItemValue: '',
            check: 'close',
            items: [],
            checked: true,
            colorCode: '',
            collaboraterData: [],
            displayAllNote: '',
            url: '',
            titleError: '',

        };
    }

    handelcheckList = (value, index) => {
        const items = [...this.state.items];

        if (value.status === 'open') {
            console.log("check",value)
            items[index].status = 'close'
            this.setState({
                items: items
            })
        }
        else {
            console.log("checked",value)
            items[index].status = 'open'
            this.setState({
                items: items
            })
        }
    }
    onInputChange = (e) => {

        this.setState({
            inputItemValue: e.target.value,

        });
        console.log(e.target.value, "mmmm", this.state.inputItemValue);

    }
    addItem = async (e) => {
        e.preventDefault();
        let items = [...this.state.items];
        await items.push({
            itemName: this.state.inputItemValue,
            isDeleted: false,
            notesId: '',
            status: 'open',
        });

        this.setState({
            items: items,
            addListItem: false,
            inputItemValue: " "
        });

        console.log("allitem", items);
    }
    popItem = (value, index) => {
        const items = [...this.state.items];
        items.splice(index, 1);
        this.setState({
            items: items
        })
    }

    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }
    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
   

    createNoteDisplay = () => {
        this.setState({ noteOpen: false });
    }
    createListDisplay = () => {
        this.setState({ listOpen: false });
    }

    changeColor = (colorCode) => {
        this.setState
            ({
                colorCode: colorCode,
            })
    }
    addColoboratorOnCreateNote = async (collaboraterData) => {
        console.log("collaborater====Data", collaboraterData);
        await this.setState
            ({
                collaboraterData: [...collaboraterData],
            })
        console.log("email=====", this.state.collaboraterData);
    }
    addImageOncreateNote = (imageData) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageData);
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({
                    url: reader.result,
                });
            }
        }
    }


    Createnote = () => {

        if (this.state.title === "") {
           this.setState({
               titleError:"title is empty"
           });
        }
        else{
            this.setState({
                titleError:""
            });
            const data = new FormData();
            data.append('title', this.state.title);
            data.append('description', this.state.description);
            data.append('color', this.state.colorCode);
            data.append('checklist', JSON.stringify(this.state.items));
            data.append('collaberators', JSON.stringify(this.state.collaboraterData));
            data.append('file', this.state.url);
            services
                .CreateNote(data)
                .then((json) => {
                    if (json.status === 200) {
                       
                        this.setState({
                            SnackbarOpen: true,
                            SnackbarMessage: 'note created Sucessfull !!',
                            noteOpen: true,
                            openList: true,
                            title:"",
                            description:"",
                            collaboraterData: [],
                        });
                        this.props.getAllNote();
                    }
                    console.log("data", json);
                    this.state.displayAllNote();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
       
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="createNote">
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
                <form onSubmit={this.handleSubmit} noValidate>
                    {this.state.noteOpen ?
                        <div className="noteBody1" onClick={() => this.createNoteDisplay()}>
                            <div className="note2">
                                <InputBase
                                    placeholder="Take a note..."
                                    fullWidth
                                    name="description"
                                />
                            </div>
                            <div className="noteIcon">
                                <div className="noteIcon1">
                                    <Tooltip title="New List">
                                        <IconButton color="inherit">
                                            <CheckBoxOutlinedIcon fontSize="small" color="inherit" onClick={() => this.createListDisplay()} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="noteIcon1">
                                    <Tooltip title="Add Note with Drawing">
                                        <IconButton edge="start" color="inherit" >
                                            <BrushOutlinedIcon fontSize="small" color="inherit" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className="noteIcon1">
                                    <Tooltip title="Add Image">
                                        <IconButton edge="start" color="inherit" >
                                            <ImageOutlinedIcon fontSize="small" color="inherit" />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                            </div>
                        </div> :
                        <div className="noteBody" style={{ backgroundColor: this.state.colorCode }}>

                            <div className="addImage">
                                <img src={this.state.url} className="imagedisplay" />
                            </div>
                            <div className="title">
                                <InputBase
                                    placeholder="Title"
                                    fullWidth
                                    multiline
                                    name="title"
                                    value={this.state.title}
                                    onChange={this.handleChangeText}
                                />

                                <span className='error'>{this.state.titleError}</span>
                            </div>
                            {this.state.listOpen ?
                                <div className="note1">
                                    <InputBase
                                        placeholder="Take a note..."
                                        fullWidth
                                        multiline
                                        name="description"
                                        value={this.state.description}
                                        onChange={this.handleChangeText}
                                    />
                                </div> :
                                // this.state.addListItem ?
                                <div>
                                    <Divider />
                                    <div>
                                        {this.state.items.filter((value) => value.status === 'open').map((value, index) => (

                                            <div className="listContener">
                                                <Divider />
                                                <div className="checkList">
                                                    <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} name='check' onClick={() => this.handelcheckList(value, index)} >
                                                        <CheckBoxOutlineBlankIcon fontSize="small" color="inherit" />
                                                    </IconButton>


                                                </div>
                                                <div className="listItem" >

                                                    {/* {value} */}
                                                    <InputBase
                                                        placeholder="..."
                                                        fullWidth
                                                        type="Text"
                                                        multiline
                                                        name="inputItemListValue"
                                                        defaultValue={value.itemName}
                                                        onChange={(value) => this.handelChangeList(value)}
                                                    />
                                                    {/* {this.setState({items:[]})} */}
                                                </div>
                                                <div>
                                                    <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} onClick={() => this.popItem(value, index)}>
                                                        <CloseIcon fontSize="small" color="inherit" />
                                                    </IconButton>
                                                </div>
                                                <Divider />
                                            </div>

                                        ))}
                                    </div>
                                    <div className="listContener" >
                                        <div className="checkList" onClick={(e) => this.addItem(e)}>
                                            <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }}>
                                                <AddIcon color="inherit" fontSize="small" />
                                            </IconButton>
                                        </div>
                                        <div className="listItem" >
                                            <InputBase
                                                placeholder="List Item"
                                                fullWidth
                                                multiline
                                                name="inputItemValue"
                                                value={this.state.inputItemValue}
                                                onChange={this.onInputChange}
                                            />
                                        </div>

                                    </div>
                                    <Divider />
                                </div>}
                            <div>
                                {this.state.items.filter((row) => row.status === 'close').map((row, index) => (
                                    <div className="listContener">
                                        <Divider />
                                        <div className="checkList">
                                            <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} name='check' onClick={() => this.handelcheckList(row, index)} >
                                                <CheckBoxOutlinedIcon fontSize="small" color="inherit" />
                                            </IconButton>
                                        </div>
                                        <div className="listItem" >
                                            <InputBase
                                                placeholder="..."
                                                fullWidth
                                                type="Text"
                                                multiline
                                                name="inputItemListValue"
                                                defaultValue={row.itemName}
                                                onChange={(row) => this.handelChangeList(row)}
                                            />
                                        </div>
                                        <div>
                                            <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} onClick={() => this.popItem(row, index)}>
                                                <CloseIcon fontSize="small" color="inherit" />
                                            </IconButton>
                                        </div>
                                        <Divider />
                                    </div>
                                ))}
                            </div>

                            <div className="displayCollaborater">
                                {this.state.collaboraterData.map((row) => (
                                    <div className="collaboraterBody">
                                        {row.email[0]}
                                    </div>
                                ))}
                            </div>
                            <div className="iconsBody">
                                <div className="iconDiv">
                                    <div className="iconPart1">
                                        <Icons changeColor={this.changeColor} addColoboratorOnCreateNote={this.addColoboratorOnCreateNote} addImageOncreateNote={this.addImageOncreateNote} />
                                    </div>
                                    <div className="iconPart2">
                                        <Button onClick={this.Createnote}>Close</Button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </form>
            </div>
        );
    }
}
const mapStateToProps = state =>{
    return{
        getAllNote : [...state.allNotes]
    };
    
}
// const mapDispatchToProps = dispatch =>{
//     return{
//         displayNote : (data) => dispatch(displayNote(data))
//     }
// }
export default connect(mapStateToProps)(CreateNote)