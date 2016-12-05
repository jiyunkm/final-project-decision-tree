import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {Tabs} from 'material-ui';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class UserConsole extends React.Component {
    render() {
        return (
            <div>
                <Tabs>
                    <Tab label="Steps">
                        <TreeView type="steps" />
                    </Tab>
                    <Tab label="Answers">
                        <TreeView type="answers" />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}