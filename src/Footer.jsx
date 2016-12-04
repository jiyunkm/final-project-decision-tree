import React from 'react';

// header component
var Footer = React.createClass({
    render() {
        return (
            <footer>
                <a href="http://www.facebook.com"><img src="img/facebook.png" alt="facebook icon"/></a>
                <a href="http://www.twitter.com"><img src="img/twitter.png" alt="twitter icon"/></a>
                <p>Visit Us At: </p>
            </footer>
        )
    }
});

export default Footer;
