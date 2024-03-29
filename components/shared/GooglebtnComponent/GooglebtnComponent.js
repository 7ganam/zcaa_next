import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import { Alert } from "reactstrap";

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
      <React.Fragment>
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginLeft: "10px" }}>
                      verfiy with google
                    </span>
                    <div style={{ flexGrow: "1" }}></div>
                    <img
                      style={{
                        width: "30px",
                        height: "auto",
                        opacity: "1",
                        justifySelf: "end",
                        marginRight: "7px",
                      }}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/google_logo.png`}
                      alt="logo"
                    />
                    <img
                      style={{
                        width: "30px",
                        height: "auto",
                        opacity: "1",
                        justifySelf: "end",
                      }}
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/zc_logo.png`}
                      alt="logo"
                    />
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
      </React.Fragment>
    );
  }
}

export default GooglebtnComponent;
