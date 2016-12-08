import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Chip, FontIcon} from 'material-ui';
import Dropdown from './CardComp/Dropdown';
import AnswerMenu from './CardComp/AnswerMenu';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import AddAnswer from './CardComp/button';

import '../index.css';

const styles = {
    card: {
        position: 'relative',
    },

    chip: {
        display: 'inline-block',
        margin: 2,
    },

    toggle: {
        marginBottom: 16,
    },

    block: {
        maxWidth: 250,
    },

    customWidth: {
        width: 200,
    },

    button: {
        marginRight: 20
    },
    
    answerMenu: {
        display: 'block',
    },
}

var data = require('../d.json');

class TreeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 1,
            answers: [],
            editing: false
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleEditChange = () => {
        if(!this.state.editing){
            this.setState({
                expanded: true,
                editing: true,
            });
        } else {
            this.setState({
                editing: false,
            });
        }
        
    };

    handleEditCancel = () => {
        if (this.state.editing) {
            this.setState({ editing: false });
        }
    };

    handleToggle = (event, toggle) => {
        this.setState({expanded: toggle});
    };

    handleExpand = () => {
        this.setState({expanded: true});
    };

    handleReduce = () => {
        this.setState({expanded: false});
    };

    handleChange = (event, index, value) => this.setState({value});

    handleAddAnswer = () => {
        this.answers.push();
        this.setState({answers: false});
    };

    getOptions = (data, type) => {
        let options = [];
        if (data.hasOwnProperty(type)) {
            for (var prop in data[type]) {
                if (!data[type].hasOwnProperty(prop)) continue;
                let text = prop + ': ';
                if (type === "Answer") {
                    text += data[type][prop]['text'];
                }
                options.push({ value: prop, text: text });
            }
        }
        return options;
    };

    render() {

        const chipAvatar = <Chip style={styles.chip}>{this.props.data.id}</Chip>;
        
        let title = '';
        let subtitle = '';
        let textComp = null;
        let dropDown = (itemsData) => (
            <AnswerMenu 
                edit={this.state.editing} 
                style={styles.answerMenu}
                value={this.state.value}
                click={this.handleClick} 
                edit={this.state.editing} 
                items={itemsData}
                options={this.getOptions(data, 'Answer')} />
        );
        
        if (this.props.type === 'steps') {
            title = this.props.data.title;
            subtitle = this.props.data.answers.length + ' answers';
            textComp = (
                <CardText expandable={true}>
                     <p>{this.props.data.desc}</p>
                     {dropDown(this.props.data.answers)}
                     <AddAnswer edit={this.state.editing} style={this.button}/>
                </CardText>
            );
        } else {
            title = this.props.data.text;
            subtitle = "";
        }
        
        return (
            <div style={styles.card}>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={title}
                        subtitle={subtitle}
                        avatar={chipAvatar}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                    
                    {textComp}
    
                    <CardActions>
                        {this.state.editing ? 
                            <FlatButton label="Save" onClick={this.handleEditChange} primary={true} /> :
                            <FlatButton icon={<FontIcon className='fa fa-pencil' />} onClick={this.handleEditChange} />                               
                        }
                        
                        {this.state.editing ?
                            <FlatButton label="Cancel" onClick={this.handleEditCancel} /> :
                            null
                        }
                        
                        <FlatButton icon={<FontIcon className='fa fa-trash' />} secondary={true} />
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default TreeCard;