import React, { Component } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
// import "./GooglebtnComponent.css"
// import zc_logo from '../../zc_logo.png'
// import google_logo from './google_logo.png'
import { Alert } from 'reactstrap';


const CLIENT_ID = '1050309843237-hjb6hmp0ku18p9oblkk5fshpvp7g0v87.apps.googleusercontent.com';


class GooglebtnComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLogined: false,
            accessToken: '',
            show_alert: false

        };

        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login(response) {
        console.log(response)
        if (!response.profileObj.email.endsWith('@zewailcity.edu.eg')) {
            this.setState({ show_alert: true });
        }
        if (response.accessToken && response.profileObj.email.endsWith('@zewailcity.edu.eg')) {
            this.props.onclick(response)
            this.setState({ show_alert: false });
            // var xhr = new XMLHttpRequest();
            // xhr.open('POST', 'http://localhost:5000');
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            // xhr.onload = function () {
            //     console.log('Signed in as: ' + xhr.responseText);
            // };
            // xhr.send('idtoken=' + response.tokenObj.id_token)
            this.setState(state => ({
                isLogined: true,
                accessToken: response.accessToken
            }));
        }
    }

    logout(response) {
        this.setState(state => ({
            isLogined: false,
            accessToken: ''
        }));
    }

    handleLoginFailure(response) {
        // alert('Failed to log in')
    }

    handleLogoutFailure(response) {
        // alert('Failed to log out')
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
                    {
                        <GoogleLogin
                            style={{ width: "300px" }}
                            clientId={CLIENT_ID}
                            render={renderProps => (
                                <button id="verify_button"
                                    style={{ display: renderProps.disabled ? 'none' : '', alignItems: "center" }}
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <span style={{ marginLeft: "10px" }}>verfiy with google</span>
                                        <div style={{ flexGrow: "1" }}></div>
                                        <img style={{ width: "30px", height: "auto", opacity: "1", justifySelf: "end", marginRight: "7px" }} src={'/application/google_logo.png'} alt="logo" />
                                        <img style={{ width: "30px", height: "auto", opacity: "1", justifySelf: "end" }} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/zc_logo.png`} alt="logo" />
                                    </div>
                                </button>
                            )}
                            buttonText='Login'
                            onSuccess={this.login}
                            onFailure={this.handleLoginFailure}
                            cookiePolicy={'single_host_origin'}
                            responseType='code,token'
                            prompt="select_account"
                        />
                    }
                    {this.state.show_alert ?
                        <Alert color="danger" className="mt-3" style={{ width: "100%" }}>
                            you must use a zewailcity email
                        </Alert> : null
                    }
                </div>

            </React.Fragment>

        )
    }
}

export default GooglebtnComponent;
