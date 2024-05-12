import React from 'react';

class Login extends React.Component {
    login() {
        console.log("login");

        chrome.runtime.sendMessage({
            type: 'sign in'
        });
    }

    render() {
        return (
            <p>
                <a onClick={this.login}>Sing In With Figma</a>
            </p>
        )
    }
}

export default Login;