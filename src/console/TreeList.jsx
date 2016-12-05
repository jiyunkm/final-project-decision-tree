import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {GridList, GridTile} from 'material-ui';

class TreeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCard: null,
            // TODO: Future implementation includes search & filter
        };
    }

    render() {
        <GridList col={1} cellHeight='auto' padding={8}>
            {
                this.props.treeData.map((nodeData) => {
                    <TreeCard data={nodeData} />
                });
            }
        </GridList>
    }
}

export default TreeList;