import React from 'react';

// Question component that displays the question and description.
var Question = React.createClass({
    render() {
        return (
            <div className="question">
                <h4>{this.props.title}</h4>
                <p>{this.props.desc}</p>
            </div>
        )
    }
});

export default Question;
