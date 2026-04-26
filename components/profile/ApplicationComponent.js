import React, { useContext, useState } from "react";
import { Container } from "reactstrap";
import { AuthContext } from "../../contexts/AuthContext";
import WelcomeMessageComponent from "./FormComponent/WelcomeMessageComponent/WelcomeMessageComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import FormComponent from "./FormComponent/FormComponent";
import SubmitModalComponent from "components/shared/SubmitModalComponent/SubmitModalComponent";
import styles from "./ApplicationComponent.module.css";
import ReactLoading from "components/shared/LoadingSpinner";

export default function ApplicationComponent(props) {
  // LOGIN CONTEXT
  const { actions, state: authState } = useContext(AuthContext);

  //FORM initial and return variables
  const [FormData, setFormData] = useState(null); // form data will be saved here once submitted
  let init_values = {
    birth_date: "",
    first_name: "",
    last_name: "",
    email: "",
    exp_field: [],
    residency: { country: "", region: "" },
    content: "",
    phone: "",
    address: "",
    zc_id: "",
    grad_year: "",
    major: "",
    minor: "",
    other_undergraduate_data: "",
    universities: [{}],
    entities: [{}],
  };

  // GOOGLE MODAL states
  const [showModal, setShowModal] = useState(false);
  const toggle = () => setShowModal(!showModal);

  //FORM submit handler
  let submit_form = (form_data) => {
    setFormData(form_data);
    toggle();
  };

  const submit_applicant = async (google_data) => {
    toggle(); // hide the modal
    await actions.signUpUser(FormData, google_data.tokenObj.access_token);
  };

  // MAIN VIEW CONDITIONS
  const conditional_view = () => {
    if (authState.user) {
      return <WelcomeMessageComponent />;
    } else if (authState.isSingingUp) {
      return (
        <div id="loading_spinner" className={styles.loading_spinner}>
          <div style={{ marginTop: "100px" }}>
            <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />
          </div>
        </div>
      );
    } else {
      return (
        <>
          <SubmitModalComponent
            submit_applicant={submit_applicant}
            ShowModal={showModal}
            toggle={toggle}
          />
          <Container fluid className={styles.application_page}>
            <Container className={styles.application_hero}>
              <div>
                <div className={styles.eyebrow}>Membership</div>
                <h1>Apply for ZCAA membership.</h1>
                <p>
                  Share your profile, studies, and career journey so the alumni
                  network can stay connected and useful.
                </p>
              </div>
              <div className={styles.hero_badge}>
                <img src="/logo.png" alt="ZCAA logo" />
              </div>
            </Container>

            <Container className={styles.form_surface}>
              <FormComponent
                {...props}
                init_values={init_values}
                submit_form={submit_form}
              />
            </Container>
          </Container>
        </>
      );
    }
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      {/* <div>{JSON.stringify(authState, null, 2)}</div> */}
      {conditional_view()}
    </div>
  );
}
