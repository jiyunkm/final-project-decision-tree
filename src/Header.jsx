import React from 'react';
import './Header.css';

// header component
var Header = React.createClass({

  getInitialState: function() {
     return {searchString: ''};
 },

 update: function(event) {
    var value = event.target.value;
    this.setState({searchString: value});
},

  handleSubmit(event) {
  
 },

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
                <form id = "search">
                    <input id = "searchBar" value={this.state.searchString} onChange={this.update} type="text" placeholder="Search..." required  />
                    <input id = "searchButton" onClick={this.handleSubmit} type="submit" value="Search" />
                </form>
            </header>




        )
    }
});

export default Header;
