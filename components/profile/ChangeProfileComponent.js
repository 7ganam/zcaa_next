import React from "react";
import { Container, Button, Toast, ToastHeader, ToastBody } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import FormComponent from "./FormComponent/FormComponent";
import { useHttpClient } from "../../hooks/simple-http-hook";
import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import axios from "axios";
import styles from "./ChangeProfileComponent.module.css";
import { Modal, ModalBody } from "reactstrap";

export default function ChangeProfileComponent(props) {
  const { actions, state: authState } = useContext(AuthContext);
  const { user, zcaaToken } = authState;

  // GOOGLE submit variables , states , and handler
  const [FormData, setFormData] = useState(null); // form data will be saved here once submitted
  const [Sending_newdata, setSending_newdata] = useState(false);
  const [Fetch_success, setFetch_success] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const submit_applicant = async (form_data) => {
    try {
      setSending_newdata(true); // to show rotating spinner

      let formData = form_data;

      const response = await axios.put(
        `/api/users/${user._id}`,
        {
          formData,
          token: zcaaToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `bearer ${zcaaToken}`,
          },
        }
      );

      setSending_newdata(false);
      if (response.data.message === "success") {
        setShowSuccessModal(true);
        actions.fetchUser(zcaaToken);
      }
    } catch (error) {
      setSending_newdata(false);
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  //FORM submit handler
  let submit_form = (form_data) => {
    setFormData(form_data);
    submit_applicant(form_data);
  };

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
  }; // empty initial values to compensate for any unfilled data in the user profile

  const map_fetched_data_to_form_data = (Fetched_user_data) => {
    if (Fetched_user_data.birth_date) {
      Fetched_user_data.birth_date = new Date(Fetched_user_data.birth_date);
    }
    if (Fetched_user_data.universities) {
      Fetched_user_data.universities.map((uni) => {
        let new_uni = {};
        if (uni.grad_date) {
          uni.grad_date = new Date(uni.grad_date); //turn the date string into date object
        }
        uni.uni_name = {
          _id: uni.uni_ref[0]._id,
          name: uni.uni_ref[0].name,
          value: uni.uni_ref[0]._id,
          label: uni.uni_ref[0].name,
          __v: uni.uni_ref[0]?.__v,
        }; // makeing sure the uni will be in the same form as new created unis from the form and stored in formik state
        return new_uni;
      });
    }

    if (Fetched_user_data.entities) {
      Fetched_user_data.entities.map((entity, i) => {
        if (entity.start_date) {
          entity.start_date = new Date(entity.start_date);
        }
        if (entity.end_date) {
          entity.end_date = new Date(entity.end_date);
        }
        entity.entity_name = {
          _id: entity.entity_ref[0]?._id,
          name: entity.entity_ref[0]?.name,
          value: entity.entity_ref[0]?._id,
          label: entity.entity_ref[0]?.name,
          __v: entity.entity_ref[0]?.__v,
        };
        return entity;
      });
    }

    if (Fetched_user_data.experience_field) {
      Fetched_user_data.exp_field = Fetched_user_data.experience_field; // it's called exp_field in the front end and experience_field in the backend
      Fetched_user_data.exp_field.map((field) => {
        field.value = field._id;
        return field;
      });
    }

    return Fetched_user_data;
  }; //helper function to map backend data format to the format used in the front-end form

  // MAIN VIEW CONDITIONS
  const conditional_view = (user) => {
    if (!user) {
      return (
        <div
          style={{
            width: "100%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className={styles.message_text}
        >
          loading...
        </div>
      );
    } else {
      return (
        <>
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
              init_values={map_fetched_data_to_form_data(user)}
              submit_form={submit_form}
            />
            <Toast className={styles.toast} isOpen={showSuccessModal}>
              <ToastHeader
                toggle={() => {
                  setShowSuccessModal((old) => false);
                }}
              >
                Success
              </ToastHeader>
              <ToastBody>User updated successfully</ToastBody>
            </Toast>
          </Container>
        </>
      );
    }
  };

  return <React.Fragment>{conditional_view(user)}</React.Fragment>;
}
