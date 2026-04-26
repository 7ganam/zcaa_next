import React, { useContext } from "react";
import { Alert, Container, Modal, ModalBody } from "reactstrap";
import GooglebtnComponent from "components/shared/GooglebtnComponent/GooglebtnComponent";

import { AuthContext } from "contexts/AuthContext";
import ReactLoading from "components/shared/LoadingSpinner";
import styles from "./LoginModalComponent.module.css";

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
          className={styles.login_modal}
          style={{
            maxWidth: "980px",
            width: "92%",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "transparent",
          }}
          isOpen={IsLogInModalShown}
          toggle={toggle}
        >
          <div style={{}}></div>
          <ModalBody className={styles.modal_body}>
            <div>
              {
                <Container
                  fluid
                  className={styles.login_container}
                >
                  <div id="login_card" className={styles.login_card}>
                    <div className={styles.login_art}>
                      <div className={styles.eyebrow}>Member Access</div>
                      <h2>Welcome back to the ZCAA network.</h2>
                      <p>
                        Sign in with your Zewail City account to keep your
                        profile and alumni connections up to date.
                      </p>
                    </div>
                    <div className={styles.login_form}>
                    <img
                      className={styles.logo}
                      src={"/logo.png"}
                      alt="logo"
                    />
                    <div id="login_disclaimer" className={styles.login_disclaimer}>
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
                        <div className={styles.loading_row}>
                          <ReactLoading
                            type={"spin"}
                            color={"#00D2F9"}
                            width={"20px"}
                          />
                        </div>
                      )}
                    </div>
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
