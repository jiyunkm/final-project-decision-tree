// Title of Card
import React from 'react';

var Toggle = React.createClass({
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

export default Toggle;