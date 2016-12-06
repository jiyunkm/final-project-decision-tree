import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText, Chip} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';

import '../index.css';

const styles = {
    card: {
        position: 'relative',
    },
    chip: {
        display: 'inline-block',
        margin: 2,
    }
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

        const chipAvatar = <Chip style={styles.chip}>{this.props.data.id}</Chip>;
        
        let title = '';
        let subtitle = '';
        let textComp = null;
        
        if (this.props.type === 'steps') {
            title = this.props.data.title;
            subtitle = this.props.data.answers.length + ' answers';
            textComp = (
                <CardText expandable={true}>
                    {this.props.data.desc}
                </CardText>
            );
        } else {
            title = this.props.data.text;
            subtitle = "";
        }
        
        return (
            <div style={styles.card}>
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardHeader
                        title={title}
                        subtitle={subtitle}
                        avatar={chipAvatar}
                        actAsExpander={true}
                        showExpandableButton={true}
                        />
                    {textComp}
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