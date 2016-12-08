// Title of Card
import React from 'react';
import Paper from 'material-ui/Paper'
import FontIcon from 'material-ui/FontIcon'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dropdown from './Dropdown';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import './AnswerMenu.css';

const styles = {
    option: {
        margin: 6,
        padding: 4,
        paddingLeft: 10,
        backgroundColor: '#EEEEEE',
    },
    questionButton: {
        marginLeft: 16,
    },
    regularButtonLabel: {
        textTransform: 'none',
    }
}

var AnswerMenu = React.createClass({
    render() {
        return(
            <div>
                {this.props.items.map((item, key) => (
                    <Paper style={styles.option} zDepth={1} key={'div-' + key}>
                        <FontIcon key={'icon-' + key} className='fa fa-commenting-o' />
                        <Dropdown key={'drop-' + key} edit={this.props.edit} value={item} click={this.props.click} options={this.props.options} />
                        <FontIcon key={'to-icon-' + key} className='fa fa-share' />
                        <RaisedButton label="This is the question it redirects to." style={styles.questionButton} labelStyle={styles.regularButtonLabel} />
                        {this.props.edit ? 
                            <FlatButton 
                                key={'rm-' + key}
                                icon={<FontIcon className='fa fa-minus-circle' />} 
                                secondary={true}
                                onClick={null} /> : null
                        }
                    </Paper>
                ))}


            </div>
        )
    }
});

export default AnswerMenu;