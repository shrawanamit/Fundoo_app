import React from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import NoteService from "../Services/NoteService";

let services = new NoteService();

export default class Image extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            selectedFile: null,
            url:'',
        };

    }
    async onChange(e) {
        await this.setState({
            selectedFile: e.target.files[0],
        });
        console.log("selcted file not url", this.state.selectedFile);

        if (this.props.noteData === undefined) {
            this.props.addImageOncreateNote(this.state.selectedFile);
        }
        else {
            const data = new FormData()
            data.append('file', this.state.selectedFile);
            data.append('noteId', this.props.noteData.id);
            data.append('title', this.props.noteData.title);
            data.append('description', this.props.noteData.description);

            services
                .updateNote(data)
                .then(res => {
                    console.log("=====", res);
                    this.props.refraceNote();
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }


    render() {
        return (
            <div >
                <Tooltip title="Add Image" interactive>
                    <IconButton edge="start" color="inherit"  >
                        <input type="file" id="BtnBrowseHidden" name="file" className="image" accept="image/*" onChange={(e) => this.onChange(e)} />
                        <label for="BtnBrowseHidden" id="LblBrowse">
                            <ImageOutlinedIcon fontSize="small" color="inherit" />
                        </label>
                    </IconButton >
                </Tooltip>
            </div>
        );
    }
}
