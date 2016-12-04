import React from 'react';
import firebase from 'firebase';
import FirebaseConfig from './Config';
import './App.css';
import MainPanel from './MainPanel';
import Header from './Header';
import Footer from './Footer';
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'

var App = React.createClass({

    render() {
        return (
            <div>
                <Header/>
                <MainPanel/>
                <Footer/>
            </div>

        )
    }
});

export default App;
