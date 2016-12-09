import React from 'react';
import './Header.css';

// header component
var Header = React.createClass({

    render() {
        return (
            <header>
                <h1>DecisionTree</h1>
                {!this.props.user &&
                    <div>
                        <a id= "signUp" onClick={this.props.update} className="waves-effect waves-light btn">Sign Up</a>
                        <a id= "signIn" onClick={this.props.update} className="waves-effect waves-light btn">Sign In</a>
                    </div>
                }
                {this.props.user &&
                    <a id= "signOut" onClick={this.props.update} className="waves-effect waves-light btn">Sign Out</a>
                }
            </header>




        )
    }
});

export default Header;
