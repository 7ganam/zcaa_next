import React, { useState } from "react";
import { Container } from "reactstrap";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import WelcomeMessageComponent from "./FormComponent/WelcomeMessageComponent/WelcomeMessageComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import FormComponent from "./FormComponent/FormComponent";
import SubmitModalComponent from "components/shared/SubmitModalComponent/SubmitModalComponent";
import styles from "./ApplicationComponent.module.css";
import ReactLoading from "react-loading";

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
    exp_field: "",
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
  const [ShowModal, setModal] = useState(false);
  const toggle = () => setModal(!ShowModal);

  //FORM submit handler
  let submit_form = (form_data) => {
    setFormData(form_data);
    toggle();
  };

  const submit_applicant = async (google_data) => {
    console.log("google_data", google_data);
    toggle(); // hide the modal
    await actions.signUpUser(FormData, google_data.tokenObj.access_token);

    if (authState.signUpError === "already_applied_before") {
      alert("you already signed up before, your data was not updated");
    }

    // try {
    //   toggle(); // hide the modal
    //   setSending_data(true); // to show rotating spinner

    //   let formData = FormData;

    //   const signUpResponse = await signUp(formData, google_data);

    //   setSending_data(false);
    //   setForm_response(signUpResponse.data);

    //   // if success log in the user
    //   if (signUpResponse.data.message === "success") {
    //     setFetch_success(true);
    //     loginByZcaaToken(signUpResponse.data.token);
    //   }
    //   // if user already registered before show an alarm
    //   if (signUpResponse.data.message === "already_applied_before") {
    //     setFetch_success(true);
    //     alert("you already signed up before, your data was not updated");
    //   }
    // } catch (error) {
    //   if (error.response.data.message === "already_applied_before") {
    //     setFetch_success(true);
    //     alert("you already signed up before, your data was not updated");
    //   }
    //   setSending_data(false);
    //   // eslint-disable-next-line no-console
    //   console.log({ error });
    // }
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
            ShowModal={ShowModal}
            toggle={toggle}
          />
          <Container
            fluid
            style={{
              background: "rgba(164, 223, 234, 0.15)",
              minHeight: "80vh",
              padding: "0",
            }}
          >
            <FormComponent
              {...props}
              init_values={init_values}
              submit_form={submit_form}
            />
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
