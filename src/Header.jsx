import React from 'react';

// header component
var Header = React.createClass({
    render() {
        return (
            <header>
                <h1>DecisionTree</h1>
                {!this.props.user &&
                  <div>
                    <a onClick={this.props.update} className="waves-effect waves-light btn">Sign Up</a>
                    <a onClick={this.props.update} className="waves-effect waves-light btn">Sign In</a>
                  </div>
                }
                {this.props.user &&
                  <a onClick={this.props.update} className="waves-effect waves-light btn">Sign Out</a>
                }

            </header>
        )
    }
});

export default Header;
