import React from "react";
import { Modal, ModalBody } from "reactstrap";
import GooglebtnComponent from "./GooglebtnComponent/GooglebtnComponent";
import { Container, Row, Col } from "reactstrap";

function SubmitModalComponent(props) {
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
          isOpen={props.modal}
          toggle={props.toggle}
        >
          {/* <ModalHeader toggle={toggle} style={{ borderBottom: "0px solid #dee2e6" }}></ModalHeader> */}
          <div style={{}}></div>
          <ModalBody style={{ padding: "0px" }}>
            <div style={{}}>
              {!props.gdata && (
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
                      <GooglebtnComponent onclick={props.submit_applicant} />
                    </div>
                  </div>
                </Container>
              )}
            </div>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}

export default SubmitModalComponent;
