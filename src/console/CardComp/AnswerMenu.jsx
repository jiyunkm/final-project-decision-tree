// Title of Card
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropdown from './Dropdown';
import FlatButton from 'material-ui/FlatButton';
import './AnswerMenu.css';

var AnswerMenu = React.createClass({
    render() {
        return(
            <div>
                <Dropdown className="menu" value={this.props.value} click={this.props.click}/>
                <FlatButton className="delete" label="Delete" secondary={true} />
                
            </div>
        )
    }
});

export default AnswerMenu;