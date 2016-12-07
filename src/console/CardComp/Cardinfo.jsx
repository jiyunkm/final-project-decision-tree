// Title of Card
import React from 'react';
import TextField from 'material-ui/TextField';
import Raisedbutton from 'material-ui/RaisedButton';

var Cardinfo = React.createClass({
    render() {
        return(
            <div>
                <span>{this.props.number}</span>
                <TextField
                     defaultValue="Default Value"
                    floatingLabelText="Floating Label Text"
                 />
                 <span>{this.props.title}</span>
                 <RaisedButton label="Edit" style={style} onClick={this.props.editToggle}/>
                 <TextField
                     hintText="The hint text can be as long as you want, it will wrap."
                />
                <p>{this.props.desc}</p>
            </div>
           
        )
    }
});

export default Cardinfo;
