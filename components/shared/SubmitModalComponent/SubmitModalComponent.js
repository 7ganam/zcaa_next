import React, { useContext } from "react";
import { Modal, ModalBody } from "reactstrap";
import GooglebtnComponent from "components/shared/GooglebtnComponent/GooglebtnComponent";
import { Container } from "reactstrap";
import ReactLoading from "react-loading";
import { AuthContext } from "contexts/AuthContext";

function SubmitModalComponent(props) {
  const { state } = useContext(AuthContext);
  return (
    <>
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
          isOpen={props.ShowModal}
          toggle={props.toggle}
        >
          {/* <ModalHeader toggle={toggle} style={{ borderBottom: "0px solid #dee2e6" }}></ModalHeader> */}
          <div style={{}}></div>
          <ModalBody style={{ padding: "0px" }}>
            <div style={{}}>
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
                      marginTop: "50px",
                    }}
                    src={"/logo.png"}
                    alt="logo"
                  />
                  <div id="login_disclaimer">
                    <span className="font1">You need to have a </span>
                    <span className="font2">zewailcity email </span>
                    <span className="font1">to apply </span>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ position: "relative" }}>
                      <GooglebtnComponent onclick={props.submit_applicant} />
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
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default SubmitModalComponent;
