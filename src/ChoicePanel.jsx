import React from 'react';


/*
    The panel that holds the choices
*/
class ChoicePanel extends React.Component {
    render() {
        return (
            <div className="row flex-box">
                {this.props.choiceList.map(
                    (choiceOpt, i) =>
                    <Choice
                        key={i}
                        clickHandler={this.props.clickHandler}
                        choiceText={choiceOpt.text}
                        questionId={choiceOpt.question} />
                )}
            </div>
        );
    }
}

class Choice extends React.Component {t
    render() {
        return (
            <div className="flex-item">
                <a className="waves-effect waves-light btn"
                    onClick={this.props.clickHandler}
                    id={this.props.questionId}>
                    {this.props.choiceText}
                </a>
            </div>
        );
    }
}

export default ChoicePanel;
