import React from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';


export default class Image extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        return (
            <div >
                <Tooltip title="Add Image" interactive>
                    <IconButton edge="start" color="inherit" >
                        <input type="file" id="BtnBrowseHidden" name="files" className="image" accept="image/*" />
                        <label for="BtnBrowseHidden" id="LblBrowse">
                            <ImageOutlinedIcon fontSize="small" color="inherit" />
                        </label>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}
