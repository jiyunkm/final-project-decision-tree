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
            tree: this.props.tree,
            editId: -1,
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.tree !== null) {
            this.setState({ tree: nextProps.tree });
        }
    }
    
    addClick = (e) => {
        e.preventDefault();
        let o = this.state.tree;
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
                max = idVal;
            }
        }
        
        newProp += (max + 1).toString();
        
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
        
        this.setState({ tree: o, editId: newProp, });
    }

    render() {
        console.log('----- Rendering lists -----');
        console.log(this.state.tree);
        console.log('---------------------------');
        return (
            <div style={styles.view}>
                <TreeToolbar addClick={this.addClick} />
                <TreeList 
                    ref='list'
                    type={this.props.type} 
                    tree={this.state.tree}
                    setTree={this.props.setTree}
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
            currentList: null,
            // TODO: Future implementation includes search & filter
        };
    }
    
    componentWillMount() {
        this.init(this.props.tree, this.props.type);
    }
    
    componentWillReceiveProps(nextProps) {
        this.init(nextProps.tree, nextProps.type);
    }
    
    componentDidUpdate() {
        if (this.props.editId < 0) return;
    
        let elem = $('#' + this.props.editId);
        
        if (elem && elem !== null) {
            $(window).scrollTop( elem.position().top );
        }
    }
    
    init = (tree, type) => {
        if (tree === null) return;
        
        let o = tree;
        
        if (type === 'answers') {
            o = tree['Answer'];
        } else if (type === 'steps') {
            o = tree['Question'];
        }
        
        let arr = this.convertTreeToArray(o);
        this.setState({ 
            currentList: arr,
        });
    }
    
    convertTreeToArray = (tree) => {
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

    // This function changes the data of the given node in the tree. 
    // It is passed to each individual card to save its changes.
    setData = (id, nodeData) => {
        let o = null;
        console.log(this.props);
        if (this.props.type === 'answers') {
            o = this.props.tree['Answer'];
        } else if (this.props.type === 'steps') {
            o = this.props.tree['Qeustion'];
        }
        console.log(o);
        
        for (var prop in o) {
            if (!prop.hasOwnProperty(prop)) continue;
            
            if (prop == id) {
                o[prop] = nodeData;
            }
        }
        
        this.props.setTree(o);
    }

    render() {
        let list = this.state.currentList;
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
                                       setData={this.setData}
                                       edit={nodeData.id == this.props.editId} />
                        }) : null
                    }
                </div>
            </div>
        );
    }
}

export default TreeView;