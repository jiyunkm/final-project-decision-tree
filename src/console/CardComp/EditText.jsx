// Title of Card
import React from 'react';
import TextField from 'material-ui/TextField';



var TextState = React.createClass({
    render() {
        let mode = null;
        
        if(this.props.editing) {
            mode = (
                <TextField
                  id="text-field-default"
                  multiLine={true}
                  defaultValue={this.props.title}
                  onChange={this.props.handle}
                />
            )
        } else {
            mode = this.props.title;
        }

        return(
            <div>
                {mode}
            </div>
            
        )
    }
});

export default TextState;