import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Avatar} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';

import '../index.css';

const styles = {
    card: {
        position: 'relative',
    },
}

class TreeCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
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

    render() {

        const avatar = (
            <Avatar>
                {this.props.data.id}
            </Avatar>
        );

        return (
            <div style={styles.card}>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={this.props.data.title}
                        avatar={avatar}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                    <CardText expandable={true}>
                        {this.props.data.desc}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Edit" />
                        <FlatButton label="Delete" secondary={true} />
                    </CardActions>
                </Card>
            </div>

        );
    }
}

export default TreeCard;