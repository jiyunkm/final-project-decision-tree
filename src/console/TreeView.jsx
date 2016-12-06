import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui';

import App from '../App';
import TreeCard from './TreeCard';
import '../index.css';

var treeFile = require('../d.json');

const styles = {
    head: {
        boxShadow: '0 4px 2px -2px gray',
        zIndex: 2,
    },
    view: {
        height: '100%',
    },
    root: {
        height: '100%',
    },
    list: {
        height: '100%',
        paddingBottom: 150,
        flex: 1,
        width: '100%',
        margin: '0 auto',
        overflowY: 'auto',
    },
};

class TreeView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styles.view}>
                <TreeToolbar />
                <TreeList 
                    type={this.props.type} 
                    treeData={treeFile} />
            </div>
        );
    }
}

class TreeToolbar extends React.Component {
    render() {
        return (
            <Toolbar style={styles.head}>
                <ToolbarGroup firstChild={true}>
                    <span>Nothing right now</span>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}

class TreeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCard: null,
            currentTree: null,
            currentList: null,
            // TODO: Future implementation includes search & filter
        };
        this.convertTreeToArray = this.convertTreeToArray.bind(this);
    }
    
    componentWillMount() {
        let tree = this.props.treeData;
        console.log(this.props.type);
        
        if (this.props.type === 'answers') {
            tree = tree['Answer'];
        } else {
            tree = tree['Question'];
        }
        
        let arr = this.convertTreeToArray(tree);
        this.setState({ 
            currentTree: tree,
            currentList: arr,
        });
    }
    
    convertTreeToArray(tree) {
        if (!tree || tree === null) return null;
        
        var arr = Object.keys(tree).map((key) => {
            var o = tree[key];
            o.id = key;
            return o;
        })
        
        return arr;
    }

    render() {
        let list = this.state.currentList;
        
        return (
            <div style={styles.root}>
                <div style={styles.list}>
                    {
                        list.map((nodeData, idx) => {
                            return <TreeCard 
                                       key={idx}
                                       type={this.props.type}
                                       index={idx}
                                       data={nodeData} />
                        })
                    }
                </div>
            </div>
        );
    }
}

export default TreeView;