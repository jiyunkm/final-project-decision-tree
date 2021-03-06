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
import UserDashboard from './console/UserDashboard';

var App = React.createClass({
    getInitialState(){
        return {
            checked: false,
            user: null,
            authOption:'sign-in',
            searchString:'',
            tree: null
        }
    },

    update: function(event) {
        var value = event.target.value;
        this.setState({searchString: value});
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

                var userRef = firebase.database().ref(this.state.user.displayName);
                userRef.once('value').then((snapshot) => {
                    let o = snapshot.val();
                    if (o === null || o[Object.keys(o)[0]] === null) {
                        userRef.set(null);
                        userRef.push({
                            'Question': {
                                'q1': {
                                    'title': 'Welcome. This is your first question!',
                                    'desc': 'This is the description area.',
                                    'answers': ['a1'],
                                },
                                'q2': {
                                    'title': 'This question does not have an answer!',
                                    'desc': 'Therefore it is a leaf of the tree.',
                                    'answers': [],
                                }
                            },
                            'Answer': {
                                'a1': {
                                    'text': 'This is your first answer.',
                                    'question': 'q1'
                                }
                            }
                        })
                    }
                });

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

    handleSubmit(event) {
        event.preventDefault();
        // this.userRef = firebase.database().ref(this.state.searchString);
        // this.userRef.on("value", function(snapshot) {
        //     snapshot.forEach(function(messageSnapshot) {
        //       var tree = messageSnapshot.val();
        //       console.log(tree);
        //     });
        // });
    },

    render() {
        if (this.state.searchString) {
            console.log("render: " + this.state.searchString);
            var mainSection = <MainPanel searchString={this.state.searchString} />;
        } else {
            if (!this.state.user || this.state.user === null) {
                if (this.state.authOption == 'sign-up') {
                    var mainSection = <SignUp submit={this.signUp}/>;
                }
                else if (this.state.authOption == 'sign-in') {
                    var mainSection = <SignIn submit={this.signIn}/>;
                }
            } else {
                var userRef = firebase.database().ref(this.state.user.displayName);

                var getTreeData = function(callback) {
                    userRef.once('value').then((snapshot) => {
                        callback(snapshot.val());
                    });
                };

                var setTreeData = function(newTree) {
                    userRef.set(null);
                    userRef.push(newTree);
                };

                var mainSection = <UserDashboard 
                                      getTreeData={getTreeData}
                                      setTreeData={setTreeData} />;
            }
        }
        // if (!this.state.user) {
        //     if (this.state.authOption == 'sign-up') {
        //         var mainSection = <SignUp submit={this.signUp}/>
        //             }
        //     else if (this.state.authOption == 'sign-in') {
        //         var mainSection = <SignIn submit={this.signIn}/>
        //             }
        // } else {
        //     var mainSection = <MainPanel />
        //         }
        return (
            <div>
                <Header user={this.state.user} update={this.updateAuthSection}/>
                <div id='search-container'>
                    <form id = "search">
                        <input id = "searchBar" value={this.state.searchString} onChange={this.update} type="text" placeholder="Search..." required  />
                        <input id = "searchButton" onClick={this.handleSubmit} type="submit" value="Search" />
                    </form>
                </div>
                {mainSection}
                <Footer/>
            </div>

        )
    }
});



export default App;
