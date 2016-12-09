import React from 'react';
import ReactDOM from 'react-dom';

import {Tabs, Tab} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import App from '../App';
import Header from '../Header';
import Footer from '../Footer';
import TreeView from './TreeView';
import '../index.css';

const styles = {
    console: {
        height: '85%',
        margin: 'auto',
    },
    fullHeight: {
        height: '100%',
    }
}

class UserDashboard extends React.Component {
    render() {
        return (
            <div style={styles.console}>
                <UserConsole 
                    getTreeData={this.props.getTreeData}
                    setTreeData={this.props.setTreeData}/>
            </div>
        );
    }
}

class UserConsole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: null,
        };
    }
    
    setTreeState = (treeObj) => {
        this.setState({ tree: treeObj[Object.keys(treeObj)[0]] });
    }
    
    componentDidMount() {
        this.props.getTreeData(this.setTreeState);
    }
    
    setTree = (newTree) => {
        this.setState({ tree: newTree });
        this.props.setTreeData(newTree);
    }
    
    render() {
        console.log('----- Rendering views -----');
        console.log(this.state.tree);
        console.log('---------------------------');
        return (
            <div style={styles.console}>
                <Tabs>
                    <Tab label="Steps">
                        <TreeView type="steps" style={styles.fullHeight} tree={this.state.tree} setTree={this.setTree} />
                    </Tab>
                    <Tab label="Answers">
                        <TreeView type="answers" style={styles.fullHeight} tree={this.state.tree} setTree={this.setTree} />
                    </Tab>
                </Tabs>
            </div>
        );
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
}

UserConsole.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default UserDashboard;