import React from 'react';
import "./createNote.scss";
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

let services = new NoteService();


export default class CreateNote extends React.Component {

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
            list: [
                {
                    itemName: '',
                    isDeleted: '',
                    notesId: '',
                    status: '',
                }
            ],
            inputItemValue: '',
            
            check: 'open',
            items: [],

        };
    }

    // checkCheckBox = () => {
    //     this.setState({ checkBox: false });
    // }

    onInputChange(e) {
        this.setState({
            inputItemValue: e.target.value,
        });
    }
    addItem() {

        let items = this.state.items;
        items.push({
            itemName: this.state.inputItemValue,
            isDeleted: false,
            notesId: '',
            status: 'open',
        });
        this.setState({
            items
        });

        this.setState({ addListItem: false });
        console.log("allitem", items);
    }
    handelChangeList = (arrayObjevt) => {

        this.setState({
            // list.itemName:arrayObjevt,
            // list.status: this.state.check,
        })

    };

    popItem = () => {
        let items = this.state.items;
    }
    SnackbarClose = (event) => {
        this.setState({ SnackbarOpen: false });
    }


    handleChangeText = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    createNoteDisplay = () => {
        this.setState({ noteOpen: false });
    }
    createListDisplay = () => {
        this.setState({ listOpen: false });
    }




    Createnote = () => {

        // this.setState({
        //     checklist: JSON.stringify([{
        //         itemName: this.state.items,
        //         status: "open",
        //         isDeleted: false,
        //         notesId: "",
        //     }])
        // });

        const data = new FormData();
        data.append('title', this.state.title);
        data.append('description', this.state.description);
        data.append('checklist', JSON.stringify(this.state.items));

        services
            .CreateNote(data)
            .then((json) => {
                if (json.status === 200) {
                    this.setState({
                        SnackbarOpen: true,
                        SnackbarMessage: 'note created Sucessfull !!',
                        noteOpen: true,
                        openList: true,
                    });

                }
                console.log("data", json);
            })
            .catch((err) => {
                console.log(err);
            });
    }


    render() {
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
                <div className="collaboratorContainer">
                    <div className="ImageBody">

                    </div>
                </div>
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
                    <div className="noteBody">
                        <div className="title">
                            <InputBase
                                placeholder="Title"
                                fullWidth
                                multiline
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChangeText}
                            /></div>
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
                                    {this.state.items.map((value) => (

                                        <div className="listContener">
                                            <Divider />
                                            <div className="checkList">
                                                <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} name='check' onClick={this.handelChangeList} >
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
                                                <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} onClick={() => this.popItem()}>
                                                    <CloseIcon fontSize="small" color="inherit" />
                                                </IconButton>
                                            </div>
                                            <Divider />
                                        </div>

                                    ))}



                                </div>


                                <div className="listContener" >
                                    <div className="checkList" onClick={() => this.addItem()}>
                                        <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }}>
                                            <AddIcon color="inherit" fontSize="small" />
                                        </IconButton>
                                    </div>
                                    <div className="listItem" >
                                        <InputBase
                                            placeholder="List Item"
                                            fullWidth
                                            name="addItem"
                                            onChange={(e) => this.onInputChange(e)}
                                        />
                                    </div>

                                </div>
                                <Divider />
                            </div>}

                        <div>
                            {this.state.items.map((value) => (

                                <div className="listContener">
                                    <Divider />
                                    <div className="checkList">
                                        <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} name='check' onClick={this.handelChangeList} >
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
                                        <IconButton edge="start" color="inherit" style={{ opacity: 0.71 }} onClick={() => this.popItem()}>
                                            <CloseIcon fontSize="small" color="inherit" />
                                        </IconButton>
                                    </div>
                                    <Divider />
                                </div>

                            ))}
                        </div>

                        <div className="collaboratorContainer">
                            <div className="collaboratorBody">

                            </div>
                        </div>
                        <div className="iconsBody">
                            <div className="iconDiv">
                                <div className="iconPart1">
                                    <Icons />
                                </div>
                                <div className="iconPart2">
                                    <Button onClick={this.Createnote}>Close</Button>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}