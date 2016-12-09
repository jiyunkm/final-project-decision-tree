import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

var AddAnswer = React.createClass({
    
    render() {
        let button = null;
        if(this.props.edit) {
            button = (
                <FloatingActionButton mini={true} style={this.props.style} onClick={this.props.click}>
                    <ContentAdd />
                </FloatingActionButton>
            )
        }
        return(
            <div>
                {button}
            </div>
        )
    }
});

export default AddAnswer;