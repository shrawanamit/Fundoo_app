import React from 'react';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

export default class SearchMenuList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }



    render() {
        return (
            <div>
                <Paper >
                    <MenuList>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>My account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Paper>
            </div>
        );
    }
}