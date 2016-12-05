import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

class TreeView extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div>
                <TreeToolbar />
                <TreeList />
            </div>
        );
    }
}