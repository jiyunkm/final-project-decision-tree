import React from 'react';
import ReactDOM from 'react-dom';
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
import TextField from 'material-ui/TextField';
import TextState from "./CardComp/EditText";

import $ from 'jquery';

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
    
    text: {
        paddingTop: 0,
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
    
    editing: {
        backgroundColor: '#E1F5FE',
    }
}

class TreeCard extends React.Component {

    constructor(props) {
        super(props);
        console.log('---- Constructing card ----');
        console.log(this.props);
        console.log('---------------------------');
        this.state = {
            expanded: this.props.edit,
            value: 1,
            answers: this.props.data.answers,
            editing: this.props.edit,
            title: this.props.data.title,
            desc: this.props.data.desc,
            text: this.props.data.text,
            question: this.props.data.question,

            tempTitle: '',
            tempDesc: '',
            tempText: '',
            tempQuestion: '',
            tempAnswers: []
            
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
    };

    handleEditChange = (e) => {
        if(!this.state.editing){
            this.setState({
                expanded: true,
                editing: true,

                tempTitle: this.state.title,
                tempDesc: this.state.desc,
                tempText: this.state.text,
                tempQuestion: this.state.question,
                tempAnswers: this.state.answers
            });

        } else {
            // Saving
            let data = null;
            this.setState({
                editing: false,
            })

            if(this.props.type === 'steps'){
                data = {
                    "title": this.state.title,
                    "desc": this.state.desc,
                    "answers": this.state.answers
                }
            } else {
                data = {
                    "question": this.state.question,
                    "text": this.state.text
                }
            }

            console.log(data);
            this.props.setData(this.props.id, data)
        }
    };

    handleEditCancel = () => {
        if (this.state.editing) {
            this.setState({ 
                editing: false,

                answers: this.state.tempAnswers,
                title: this.state.tempTitle,
                desc: this.state.tempDesc,
                text: this.state.tempText,
                question: this.state.tempQuestion,
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

    

    handleTitleChange = (e) => {
        if(this.props.type === 'steps') {
            this.setState({
                title: e.target.value
            });
        } else {
            this.setState({
                text: e.target.value
            });
        }
        
    }
    
    handleDescChange = (e) => {
        this.setState({
            desc: e.target.value
        });
    }
    
    handleClick = (index, target, prop, value) => {
        if(this.props.type === 'steps') {
            var answers = this.state.answers;
            if(index + 1 > answers.length) {
                answers.push(value);
                
            } else {
                answers[index] = value;
            }
            this.setState({
                answers: answers
            })
        } else {
            this.setState({
                question: value
            })
            console.log(this.state.question)
        }
        // console.log(this.state.answers);
    }
    
    handleAddAnswer = () => {
        var answers = this.state.answers;
        answers.push("a1");
        this.setState({
            answers: answers
        })
        console.log(this.state.tempAnswers);
        
    }

    redirectHandle = (event) => {
        event.preventDefault();
        let btn = event.target;
        console.log(btn);
        let cid = btn.id.split(':')[0];
        
        let elem = $('#' + cid);
        if (elem && elem !== null) {
            $(window).scrollTop( elem.position().top );
        }
    }

    handleDelAnswer = (index) => {
        var answers = this.state.answers;
        var index = index;
        answers.splice(index, 1);
        this.setState({
            answers: answers
        })
    }
    
    getOptions = (data, type) => {
        let options = [];
        if (data.hasOwnProperty(type)) {
            for (var prop in data[type]) {
                if (!data[type].hasOwnProperty(prop)) continue;
                let text = prop + ': ';
                let redr = '';
                
                if (type === "Answer") {
                    text += data[type][prop]['text'];
                    redr = data[type][prop]['question'];
                    redr += (': ' + data['Question'][redr]['title']);
                } else if (type === 'Question') {
                    text += data[type][prop]['title'];
                }
                options.push({ value: prop, text: text, redr: redr});
            }
        }
        return options;
    };
    
    componentWillMount() {
        if(this.props.type === 'steps'){
                this.setState({
                    answers: this.props.data.hasOwnProperty('answers') ? this.props.data.answers : [],
                    title: this.props.data.title,
                    desc: this.props.data.desc
                })
            } else {
                this.setState({
                    question: this.props.data.question,
                    text: this.props.data.text
                })
            }
    }

    render() {
        const chipAvatar = <Chip style={styles.chip}>{this.props.data.id}</Chip>;
        
        let title = '';
        let subtitle = '';
        let textComp = null;
        let optionType = '';
        
        if (this.props.type === 'steps') {
            optionType = 'Answer';
        } else if (this.props.type === 'answers') {
            optionType = 'Question';
        }
        
        let dropDown = (itemsData) => (
            <AnswerMenu 
                type={this.props.type}
                edit={this.state.editing} 
                style={styles.answerMenu}
                value={this.state.value}
                click={this.handleClick} 
                redirectHandle={this.redirectHandle}
                handleDelAnswer={this.handleDelAnswer}
                edit={this.state.editing} 
                items={itemsData}
                options={this.getOptions(this.props.tree, optionType)} />
        );
        
        
        
        if (this.props.type === 'steps') {
            title = this.props.data.title;
            subtitle = this.props.data.hasOwnProperty('answers') ? 
                this.props.data.answers.length + ' answers' : 
                'No answer';
            textComp = (
                <CardText style={styles.text} expandable={true}>
                     <p>{<TextState title={this.state.desc} editing={this.state.editing} handle={this.handleDescChange}/> }</p>
                     {dropDown(this.state.answers)}
                    
                     <AddAnswer edit={this.state.editing} style={this.button} click={this.handleAddAnswer}/>
                </CardText>
            );
            
        } else if (this.props.type === 'answers') {
            title = this.state.text;
            textComp = (
                <CardText style={styles.text}>
                     {dropDown([this.state.question])}
                </CardText>
            );
        }
        
        
        return (
            <div id={this.props.data.id}  style={styles.card}>
                <Card style={this.state.editing ? styles.editing : null} 
                    expandable={this.props.type === 'steps'}
                    expanded={this.state.expanded} 
                    onExpandChange={this.handleExpandChange}>
                    
                    <CardHeader
                        title={<TextState title={title} editing={this.state.editing} handle={this.handleTitleChange}/> }
                        subtitle={subtitle}
                        avatar={chipAvatar}
                        actAsExpander={this.props.type === 'steps'}
                        showExpandableButton={this.props.type === 'steps'}
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
                        
                        <FlatButton icon={<FontIcon className='fa fa-trash' />} secondary={true} onClick={this.props.click}/>
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default TreeCard;