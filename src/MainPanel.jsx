import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import Question from './Question';
import ChoicePanel from './ChoicePanel';
import $ from 'jquery';
import firebase from 'firebase';
import FirebaseConfig from './Config';

/* The main panel that holds the Question/Choice elements and
    manage data reading and updating */
class MainPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // Question title
            title: "",

            // Question description
            desc: "",

            // List of choices with {choiceText, questionId}
            // e.g. {choiceText: "First choice", questionId: 2}
            choices: []
        }

        this.handleChoiceClick = this.handleChoiceClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchString != this.props.searchString) {
            this.updateQuestion(nextProps.searcjString, 'q1');
        }
    }

    // After initialization, load the panel with Question #0 and its
    // choices
    componentWillMount() {
        this.updateQuestion(this.props.searchString, 'q1');
    }

    // Called when either choice is clicked
    handleChoiceClick(event) {
        console.log(event);
        event.stopPropagation();
        event.preventDefault();

        // The DOM being chosen
        var choice = event.currentTarget;

        console.log(choice.id);
        this.updateQuestion(this.props.searchString, choice.id);
    }

    // Reads from JSON/Database, and retrieve the element related
    // to the given question id, then set the state to represent
    // the question
    updateQuestion(s, id) {
        var tree = null;
        console.log(s);
        var userRef = firebase.database().ref(s);
        if (!userRef || userRef === null) return;

        var updateTree = function(newTree) {
            var choices = [];
            var answers = newTree['Question'][id].answers;
            for(var i = 0; i < answers.length; i++) {
                choices.push(newTree['Answer'][answers[i]]);
            }
            console.log(choices);
            this.setState({
                title: newTree['Question'][id].title,
                desc: newTree['Question'][id].desc,
                choices: choices
            }, () => {console.log(this.state.choices);});
        }

        userRef.on("child_added", function(snapshot) {
            console.log('---- tree ----');
            console.log(snapshot.val());

            let o = snapshot.val();
            if (!o || o === null) return;

            tree = o[Object.keys(o)[0]];
            if (!tree || tree === null) return;

            updateTree(tree);
        });



        //var tree = require('./d.json');

        var choices = [];
        var answers = tree['Question'][id].answers;
        for(var i = 0; i < answers.length; i++) {
            choices.push(tree['Answer'][answers[i]]);
        }
        console.log(choices);
        this.setState({
            title: tree['Question'][id].title,
            desc: tree['Question'][id].desc,
            choices: choices
        }, () => {console.log(this.state.choices);});

    }

    render() {
        const choicePanel = (
            <ChoicePanel
                choiceList={this.state.choices}
                clickHandler={this.handleChoiceClick} />
        );
        return (
            <div className="mainSection">
                <div className="container">
                    <Question
                        title={this.state.title}
                        desc={this.state.desc} />
                    {this.state.choices.length > 0 ? choicePanel : null}
                </div>
            </div>
        );
    }
}

export default MainPanel;
