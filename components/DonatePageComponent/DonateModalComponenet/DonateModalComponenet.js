import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { Container } from "reactstrap";
// import zc_logo from './zc_logo.png'

import styles from "./DonateModalComponenet.module.css";

const projects = [
  "Community_development_and_sustainability_award_honoring_Omar-El_Daghar",
  "Biomedical_science_research_Award_honoring_Ghada_Ragab",
  "Physics_of_Earth_and_universe_award_honoring_Ahmed_Thabet",
  "Green_energy_solutions_Award_honoring_Ahmed_Soliman",
  "Financial_aid_Award_honoring_Mahmoud_Ogaina_and_Mohamed_Nour_El-din",
  "Leadership_and_community_engagement_award_honoring_Noor_El-din_Mahmoud",
  "General_Donation_to_any_project",
];

const handlePayment = (values) => {
  let cause = projects[values.dontatedTo - 1];
  fetch("/api/stripe/checkout-sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: values.amount * 100,
      cause: cause,
    }),
  })
    .then((response) => response.json())
    .then((session) => {
      window.location.href = session.url;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function DonateModalComponenet(props) {
  const toggle = props.toggle;

  return (
    <div>
      <div id="google_modal">
        <Modal
          size="lg"
          style={{
            maxWidth: "1600px",
            width: "90%",
            marginRight: "auto",
            marginLeft: "auto",
            backgroundColor: "transparent",
          }}
          isOpen={props.isShown}
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
                        width: "130px",
                        height: "auto",
                        opacity: "0.5",
                        marginTop: "70px",
                      }}
                      src={"/logo.png"}
                      alt="logo"
                    />
                    <div style={{ marginBottom: "10px" }} className="font2">
                      your donation will go to
                    </div>

                    <div
                      id="login_disclimare"
                      style={{
                        maxWidth: "500px",
                        border: "1.5px dashed rgb(38, 173, 203)",
                        borderRadius: "10px",
                        padding: "10px",

                        borderColor: "rgb(38, 173, 203)",
                        borderStyle: "dashed",
                      }}
                    >
                      <div className="font2">
                        <div className={styles.donate_modal_subfield}>
                          Currency: EGP
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Beneficiary Name: Zewail City of Science and
                          Technology- NEW CAMPUS
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Bank Name: Commercial International bank (CIB)
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Bank Address: 21/23 Charles de Gaulle St., Giza, Egypt
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Branch Name: Giza Branch
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Branch code: 001
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Swift Code: CIBEEGCX001
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          Account number: 100021601912
                        </div>
                        <div className={styles.donate_modal_subfield}>
                          IBAN number: EG920010000100000100021601912
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "80%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "40px",
                      }}
                    >
                      <button
                        style={{ marginBottom: "100px" }}
                        className={`btn btn-primary ${styles.redirect_button}`}
                        // onClick={() => {
                        //   handlePayment(props.values);
                        // }}
                      >
                        <span style={{ marginRight: "5px" }}>
                          Go to payment webstie
                        </span>
                        <img
                          style={{
                            width: "30px",
                            height: "auto",
                            marginTop: "0px",
                          }}
                          src={"/arrow-right.png"}
                          alt="c"
                        />
                      </button>
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

export default DonateModalComponenet;
