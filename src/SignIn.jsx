// Sign in
import React from 'react';

var SignIn = React.createClass({
    render() {
        return(
            <section className="container">
                <h3>Sign Into Your Account</h3>
                <form onSubmit={this.props.submit} className="col s12 authenticate" id="sign-in">
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="email" type="email" className="validate" />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <button className="btn btn-primary">Sign In</button>
                </form>
            </section>
        )
    }
});

export default SignIn;
