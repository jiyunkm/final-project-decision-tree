import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

class UserDashboard extends React.Component {
    render() {
        return (
            <div class='container'>
                <UserConsole />
            </div>
        );
    }
}