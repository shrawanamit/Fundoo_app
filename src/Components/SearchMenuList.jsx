import React from 'react';
import Paper from '@material-ui/core/Paper';
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
                    {this.props.emailList.map((row) => (
                        <MenuItem>{row.email}</MenuItem>
                    ))}
                    </MenuList>
                </Paper>
            </div>
        );
    }
}