// Title of Card
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropdown from './Dropdown';
import FlatButton from 'material-ui/FlatButton';
import './AnswerMenu.css';

var AnswerMenu = React.createClass({
    render() {
        let button = null;
        if(this.props.edit == "Done") {
            button = (
                <FlatButton label="Delete" secondary={true} />
            )
        }
        return(
            <div>
                <Dropdown value={this.props.value} click={this.props.click}/>
                {button}
                
            </div>
        )
    }
});

export default AnswerMenu;