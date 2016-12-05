import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui';

class TreeToolbar extends React.Component {
    render() {
        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <span>Nothing right now</span>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}