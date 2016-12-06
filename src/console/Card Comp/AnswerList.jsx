// Title of Card
import React from 'react';

var AnswerList = React.createClass({
    render() {
        return(
            <div>
                <Toggle onClick={this.props.toggle}
                    label="Simple"
                    style={styles.toggle}
                />
            </div>
        )
    }
});

export default AnswerList;