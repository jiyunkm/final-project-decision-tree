// Title of Card
import React from 'react';
import FontIcon from 'material-ui/FontIcon'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropdown from './Dropdown';
import FlatButton from 'material-ui/FlatButton';
import './AnswerMenu.css';

var AnswerMenu = React.createClass({
    render() {
        return(
            <div>
                {this.props.items.map((item, key) => (
                    <div key={'div-' + key}>
                        <Dropdown key={'drop-' + key} value={item} click={this.props.click} options={this.props.options} />
                        {this.props.edit ? 
                            <FlatButton 
                                key={'rm-' + key}
                                icon={<FontIcon className='fa fa-minus-circle' />} 
                                secondary={true}
                                onClick={null} /> : 
                        null}
                    </div>
                ))}


            </div>
        )
    }
});

export default AnswerMenu;