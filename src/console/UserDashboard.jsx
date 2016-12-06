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
            <div>
                <Header />
                <div style={styles.console}>
                    <UserConsole />
                </div>
                <Footer />
            </div>
        );
    }
}

class UserConsole extends React.Component {
    render() {
        return (
            <div style={styles.console}>
                <Tabs>
                    <Tab label="Steps">
                        <TreeView type="steps" style={styles.fullHeight} />
                    </Tab>
                    <Tab label="Answers">
                        <TreeView type="answers" style={styles.fullHeight} />
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