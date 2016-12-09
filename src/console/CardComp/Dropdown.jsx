// Title of Card
import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

var Dropdown = React.createClass({
    render() {
        return(
            <DropDownMenu value={this.props.value} disabled={!this.props.edit} onChange={this.props.click} index={this.props.index}>
                {this.props.options.map((o) => (
                    <MenuItem key={o.value} value={o.value} primaryText={o.text} />
                ))}
            </DropDownMenu>
        )
    }
});

export default Dropdown;