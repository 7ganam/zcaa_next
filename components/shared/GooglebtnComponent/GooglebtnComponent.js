import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Alert } from "reactstrap";
import PropTypes from "prop-types";

const CLIENT_ID =
  "1050309843237-hjb6hmp0ku18p9oblkk5fshpvp7g0v87.apps.googleusercontent.com";

class GooglebtnComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      accessToken: "",
      show_alert: false,
    };

    this.handleResponse = this.handleResponse.bind(this);
  }

  handleResponse(response) {
    if (
      process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === "TRUE" &&
      !response.profileObj.email.endsWith(
        "@" + process.env.NEXT_PUBLIC_ALLOWED_EMAILS
      )
    ) {
      this.setState({ show_alert: true });
    }
    if (
      response.accessToken &&
      ((process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK === "TRUE" &&
        response.profileObj.email.endsWith(
          "@" + process.env.NEXT_PUBLIC_ALLOWED_EMAILS
        )) ||
        process.env.NEXT_PUBLIC_APPLY_EMAIL_CHECK !== "TRUE")
    ) {
      this.props.onclick(response);
      this.setState({ show_alert: false });
      this.setState(() => ({
        isLoggedIn: true,
        accessToken: response.accessToken,
      }));
    }
  }

  render() {
    return (
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          zIndex: "2",
          position: "relative",
        }}
      >
          {
            <GoogleLogin
              style={{ width: "300px" }}
              clientId={CLIENT_ID}
              render={(renderProps) => (
                <button
                  id="verify_button"
                  style={{
                    display: renderProps.disabled ? "none" : "",
                    alignItems: "center",
                  }}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <div className="verify_button_content">
                    <svg
                      className="google_logo_icon"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                      focusable="false"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                      />
                      <path
                        fill="#FF3D00"
                        d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.6 8.3 6.3 14.7z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24 44c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.1 26.7 36 24 36c-5.2 0-9.7-3.3-11.3-7.9l-6.5 5C9.4 39.5 16.1 44 24 44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.1 5.5l6.3 5.3C37.1 39.1 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
                      />
                    </svg>
                    <span>Verify with Google</span>
                  </div>
                </button>
              )}
              buttonText="Login"
              onSuccess={this.handleResponse}
              onFailure={this.handleLoginFailure}
              cookiePolicy={"single_host_origin"}
              responseType="code,token"
              prompt="select_account"
            />
          }
          {this.state.show_alert ? (
            <Alert color="danger" className="mt-3" style={{ width: "100%" }}>
              you must use a zewailcity email
            </Alert>
          ) : null}
      </div>
    );
  }
}

export default GooglebtnComponent;

GooglebtnComponent.propTypes = {
  onclick: PropTypes.func.isRequired,
};
