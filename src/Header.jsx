import React from 'react';

// header component
var Header = React.createClass({
    render() {
        return (
            <header>
                <h1>DecisionTree</h1>
                <a className="waves-effect waves-light btn">button</a>
                {/* <button type="button">Click Me!</button> */}
            </header>
        )
    }
});

export default Header;
