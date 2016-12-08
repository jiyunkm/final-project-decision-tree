import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Chip} from 'material-ui';
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
    }
}

class TreeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 1,
            answers: [],
            edit: "Edit"
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleEditChange = () => {
        if(this.state.edit == "Edit"){
            this.setState({
                expanded: true,
                edit: "Done"
            });
        } else {
            this.setState({
                edit: "Edit"
            });
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

    render() {

        const chipAvatar = <Chip style={styles.chip}>{this.props.data.id}</Chip>;
        
        let title = '';
        let subtitle = '';
        let textComp = null;
        let dropDown = () => (
            <AnswerMenu value={this.state.value} click={this.handleClick} edit={this.state.edit} />
            );
        
        if (this.props.type === 'steps') {
            title = this.props.data.title;
            subtitle = this.props.data.answers.length + ' answers';
            textComp = (
                <CardText expandable={true}>
                     <p>{this.props.data.desc}</p>
                     <p>{dropDown()}</p>
                     <AddAnswer edit={this.state.edit} style={this.button}/>
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
                        <FlatButton label={this.state.edit} onClick={this.handleEditChange}/>
                        <FlatButton label="Delete" secondary={true} />
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default TreeCard;