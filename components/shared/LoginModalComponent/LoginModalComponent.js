import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { Container } from "reactstrap";
import GooglebtnComponent from "components/shared/GooglebtnComponent/GooglebtnComponent";

import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Alert } from "reactstrap";
import ReactLoading from "react-loading";

function LoginModalComponent() {
  const { actions, state, ToggleLoginModal, IsLogInModalShown } =
    useContext(AuthContext);

  const toggle = ToggleLoginModal;

  const submit_applicant = async (google_data) => {
    await actions.loginUser(google_data.tokenObj.access_token);
    if (state.user) {
      toggle();
    }
  };

  return (
    <div>
      <div id="google_modal">
        <Modal
          size="lg"
          style={{
            maxWidth: "1600px",
            width: "80%",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "transparent",
          }}
          isOpen={IsLogInModalShown}
          toggle={toggle}
        >
          <div style={{}}></div>
          <ModalBody style={{ padding: "0px" }}>
            <div style={{}}>
              {
                <Container
                  fluid
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0px",
                  }}
                >
                  <div id="login_card" style={{}}>
                    <img
                      style={{
                        width: "150px",
                        height: "auto",
                        opacity: "0.5",
                        marginTop: "70px",
                      }}
                      src={"/logo.png"}
                      alt="logo"
                    />
                    <div id="login_disclaimer">
                      <span className="font1">Use your </span>
                      <span className="font2">zewailcity email </span>
                      <span className="font1">to Login </span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <div style={{ position: "relative" }}>
                        <GooglebtnComponent onclick={submit_applicant} />
                        <div
                          style={{
                            position: "absolute",
                            top: "15px",
                            left: "45%",
                            zIndex: "0",
                          }}
                        >
                          <ReactLoading
                            type={"spin"}
                            color={"#00D2F9"}
                            width={"20px"}
                          />
                        </div>
                      </div>

                      {state.logInError && (
                        <Alert
                          color="danger"
                          className="mt-3"
                          style={{ width: "100%" }}
                        >
                          {state.logInError}
                        </Alert>
                      )}
                      {state.isLoggingIn && (
                        <div
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                          }}
                        >
                          <ReactLoading
                            type={"spin"}
                            color={"#00D2F9"}
                            width={"20px"}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </Container>
              }
            </div>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}

export default LoginModalComponent;
