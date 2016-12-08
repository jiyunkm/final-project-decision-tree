import React from 'react';
import ReactDOM from 'react-dom';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle, RaisedButton} from 'material-ui';
import $ from 'jquery';

import App from '../App';
import TreeCard from './TreeCard';
import '../index.css';

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
        
        this.state = {
            treeData: null,
            editId: -1,
        }
    }
    
    componentWillMount() {
        this.setState({ treeData: require('../d.json') });
    }
    
    addClick = (e) => {
        e.preventDefault();
        let o = this.state.treeData;
        let p = null;
        let newProp = '';
        if (this.props.type === 'steps') {
            p = o['Question'];
            newProp = 'q';
        } else if (this.props.type === 'answers') {
            p = o['Answer'];
            newProp = 'a';
        }
        
        let max = 0;
        for (var prop in p) {
            if (!p.hasOwnProperty(prop)) continue;
            let idVal = parseInt(prop.substring(1));
            if (max < idVal) {
                max = idVal
            }
        }
        
        newProp += (max + 1).toString();
        console.log(newProp);
        
        if (this.props.type === 'steps') {
            o['Question'][newProp] = {
                'title': "What's the title of this question?",
                'desc': "What's the description of this question?",
                'answers': []
            }
        } else if (this.props.type === 'answers') {
            o['Answer'][newProp] = {
                'text': "This is a new answer.",
                'question': 'q1'
            }
        }
        
        this.setState({ treeData: o, editId: newProp, });
    }

    render() {
        return (
            <div style={styles.view}>
                <TreeToolbar addClick={this.addClick} />
                <TreeList 
                    ref='list'
                    type={this.props.type} 
                    treeData={this.state.treeData}
                    editId={this.state.editId} />
            </div>
        );
    }
}

class TreeToolbar extends React.Component {
    render() {
        return (
            <Toolbar style={styles.head}>
                <ToolbarGroup firstChild={true}>
                    <span></span>
                </ToolbarGroup>
                <ToolbarGroup>
                    <RaisedButton label='Add' primary={true} onClick={this.props.addClick} />
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
        this.init();
    }
    
    componentWillReceiveProps() {
        this.init();
    }
    
    componentDidUpdate() {
        if (this.props.editId < 0) return;
    
        let elem = $('#' + this.props.editId);
        
        if (elem && elem !== null) {
            $(window).scrollTop( elem.position().top );
        }
    }
    
    init = () => {
        if (this.props.treeData === null) return;
        
        let tree = this.props.treeData;
        console.log(this.props.treeData);
        
        if (this.props.type === 'answers') {
            tree = tree['Answer'];
        } else if (this.props.type === 'steps') {
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
        
        arr.sort((a, b) => {
            let idA = parseInt(a.id.substring(1));
            let idB = parseInt(b.id.substring(1));
            return idA - idB;
        })
        return arr;
    }

    render() {
        let list = this.state.currentList;
        
        console.log(list);
        
        return (
            <div style={styles.root}>
                <div style={styles.list}>
                    {list !== null ?
                        list.map((nodeData, idx) => {
                            return <TreeCard 
                                       id={nodeData.id}
                                       key={idx}
                                       type={this.props.type}
                                       index={idx}
                                       data={nodeData}
                                       edit={nodeData.id == this.props.editId} />
                        }) : null
                    }
                </div>
            </div>
        );
    }
}

export default TreeView;