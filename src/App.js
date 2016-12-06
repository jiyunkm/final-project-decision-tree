import React from 'react';
import firebase from 'firebase';
import FirebaseConfig from './Config';
import './App.css';
import SignIn from './SignIn';
import SignUp from './SignUp';
import MainPanel from './MainPanel';
import Footer from './Footer';
import 'materialize-css/bin/materialize.css'
import 'materialize-css/bin/materialize.js'
import Header from './Header';

var App = React.createClass({
    getInitialState(){
        return {
            checked:false,
            user:null,
            authOption:'sign-in'
        }
    },

    // When component mounts, check the user
    componentDidMount() {
        // Initialize app
        firebase.initializeApp(FirebaseConfig);

        // Check for authentication state change (test if there is a user)
        firebase.auth().onAuthStateChanged((user) => {
            if (this.state.checked !== true) {
                if(user) {
                    this.setState({user:user})
                }
            }

            // Indicate that state has been checked
            this.setState({checked:true})
        });
    },

    updateAuthSection(event) {
        console.log(event.target.text);
        if (event.target.text == 'Sign Up') {
            this.setState({authOption:'sign-up'});
        } else if (event.target.text == 'Sign In') {
            this.setState({authOption:'sign-in'});
        } else {
            firebase.auth().signOut().then(() => {
                this.setState({user:null});
                this.setState({authOption:'sign-in'});
            });
        }

    },

    signUp(event) {
        event.preventDefault();

        // Get form values
        let email = event.target.elements['email'].value;
        let password = event.target.elements['password'].value;
        let displayName = event.target.elements['displayName'].value;

        // Remember to enable email/password authentication on Firebase!
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
            user.updateProfile({
                displayName: displayName
            }).then(() => {
                this.setState({user:firebase.auth().currentUser});
                this.setState({authOption:'sign-out'});
            })
        });

        // Reset form
        event.target.reset();
    },

    signIn(event) {
        event.preventDefault();

        // Get form values
        let email = event.target.elements['email'].value;
        let password = event.target.elements['password'].value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
            this.setState({user:firebase.auth().currentUser});
            this.setState({authOption:'sign-out'});
        });

        // Clear form
        event.target.reset();

    },

    render() {
        if (!this.state.user) {
            if (this.state.authOption == 'sign-up') {
                var mainSection = <SignUp submit={this.signUp}/>
                    }
            else if (this.state.authOption == 'sign-in') {
                var mainSection = <SignIn submit={this.signIn}/>
                    }
        } else {
            var mainSection = <MainPanel />
                }
        return (
            <div>
                <Header user={this.state.user} update={this.updateAuthSection}/>
                <input id="searchBar" type="text" name="search" placeholder="Search.."></input>
                {mainSection}
                <Footer/>
            </div>

        )
    }
});



export default App;
