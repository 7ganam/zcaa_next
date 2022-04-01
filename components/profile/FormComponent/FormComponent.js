import { useContext } from "react";
import { LoginContext } from "../../../contexts/loginContext";
import React, { useState, useCallback, useRef } from "react";
import { Formik, Field, Form, FieldArray, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import CollapsingUniCardComponent from "./CollapsingUniCardComponent/CollapsingUniCardComponent";
import CollapsingEntityCardComponent from "./CollapsingEntityCardComponent/CollapsingEntityCardComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import * as Yup from "yup";
import TextError from "./TextError";
import ReactLoading from "react-loading";
import DateView from "react-datepicker";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import SubmitModalComponent from "./SubmitModalComponent/SubmitModalComponent";
import { date } from "yup/lib/locale";
import styles from "./FormComponent.module.css";

// const SignupSchema = Yup.object().shape({})
const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email"),
  // exp_field: Yup.string().required('Required'),
  phone: Yup.number("must be a number")
    .positive("positive numbers only ")
    .integer("integers only"),
  birth_date: Yup.string().required("Required"),
  // address: Yup.string().required('Required'),
  zc_id: Yup.number("must be a number")
    .min(201300000, "201300000 min")
    .required("Required"),
  grad_year: Yup.number("must be a number")
    .min(2017, "2017 min")
    .required("Required"),
  major: Yup.string().required("Required"),
  residency: Yup.object().shape({
    country: Yup.string().min(2, "error").required("Required"),
    region: Yup.string().min(2, "error"),
    // Rest of your amenities object properties
  }),
  exp_field: Yup.array()
    .min(1, "Pick at least 1 field")
    .max(3, "Pick  max 3 fields")
    .of(
      Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      })
    ),
});

const FormComponent = (props) => {
  // HELPER FUNCTION: remap static props provided by next.js to a form suitable for react select library
  const map_selections_to_react_select_object = (
    exp_fields,
    unies,
    entities
  ) => {
    let maped_exp_fields = exp_fields.map((exp_field) => {
      exp_field.value = exp_field._id;
      return exp_field;
    });
    let maped_unies = unies.map((uni) => {
      uni.value = uni._id;
      uni.label = uni.name;
      return uni;
    });
    let maped_entities = entities.map((entity) => {
      entity.value = entity._id;
      entity.label = entity.name;
      return entity;
    });

    return [maped_exp_fields, maped_unies, maped_entities];
  };
  let [maped_exp_fields, maped_unies, maped_entities] =
    map_selections_to_react_select_object(
      props.exp_fields,
      props.unies,
      props.entities
    );

  // ref to formik object to be able to extract values in the submit
  const formRef = useRef();

  return (
    <>
      <Container fluid style={{ position: "relative", padding: "0" }}>
        <img
          className={styles.background_image}
          src={"/about/bg2.png"}
          id="c"
          alt="oval"
        />
      </Container>

      <Formik
        // validationSchema={SignupSchema}
        innerRef={formRef}
        initialValues={props.init_values}
        onSubmit={(values) => props.submit_form(values)}
      >
        {(formik_object) => {
          // the display sequence as follows : if success state is true show the success component
          // else if the data is being sent show the loading component
          // else show the form component ... which contains the google modal.
          return (
            <Container>
              {
                <div id="form_and_modal">
                  {/* print the form state for debugging */}
                  {/* <div>{JSON.stringify(formik_object.values.exp_field, null, 2)}</div> */}

                  <Form>
                    <div id="personal_info_section ">
                      <Row>
                        <Col xs="12" className="">
                          <div className={styles.form_section_title}>
                            Personal info
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="4">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="first_name" className="form_text">
                              first name{" "}
                            </label>
                            <Field
                              name="first_name"
                              className="form-control in_field"
                              type="text"
                            />
                            <ErrorMessage
                              name="first_name"
                              component={TextError}
                            />
                          </div>
                        </Col>
                        <Col lg="4">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="last_name" className="form_text">
                              Last name
                            </label>
                            <Field
                              name="last_name"
                              className="form-control in_field"
                              type="text"
                            />
                            <ErrorMessage
                              name="last_name"
                              component={TextError}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="8">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label
                              htmlFor="email"
                              className="form_text"
                              style={{ letterSpacing: "0.2em" }}
                            >
                              prefered email for communication
                              <span
                                style={{
                                  color: "gray",
                                  fontWeight: "bolder",
                                  fontSize: "11",
                                }}
                              >
                                {" (Optional)"}
                              </span>
                            </label>
                            <Field
                              name="email"
                              className="form-control in_field "
                              type="email"
                            />
                            <ErrorMessage name="email" component={TextError} />
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="8">
                          <label className="form_text">Birth date</label>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="8">
                          <Field
                            name={`birth_date`}
                            className="form-control in_field"
                          >
                            {({ form, field }) => {
                              const { setFieldValue } = form;
                              const { value } = field;
                              return (
                                <DateView
                                  className="form-control in_field"
                                  style={{
                                    textAlign: "end",
                                  }}
                                  id={`birth_date`}
                                  {...field}
                                  selected={value}
                                  peekNextMonth
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  onChange={(val) =>
                                    setFieldValue(`birth_date`, val)
                                  }
                                />
                              );
                            }}
                          </Field>
                          <ErrorMessage
                            name="birth_date"
                            component={TextError}
                          />
                        </Col>
                      </Row>
                      <Row className="justify-content-end mt-3">
                        <Col lg="8">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="phone" className="form_text">
                              phone
                              <span
                                style={{
                                  color: "gray",
                                  fontWeight: "bolder",
                                  fontSize: "11",
                                }}
                              >
                                {" (Optional)"}
                              </span>
                            </label>
                            <Field
                              name="phone"
                              className="form-control in_field"
                              type="text"
                            />
                            <ErrorMessage name="phone" component={TextError} />
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="4">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label
                              htmlFor="residency.country"
                              className="form_text"
                            >
                              {" "}
                              country of residence{" "}
                            </label>
                            <Field
                              name="residency.country"
                              className="form-control in_field"
                            >
                              {({ form, field }) => {
                                const { setFieldValue } = form;
                                const { setFieldTouched } = form;

                                const value = field.value;
                                return (
                                  <CountryDropdown
                                    valueType="short"
                                    style={{ width: "100%" }}
                                    className="in_field form-control"
                                    value={value}
                                    onClick={(val) => {
                                      console.log(formik_object);
                                    }}
                                    onBlur={(val) =>
                                      setFieldTouched(`residency.country`)
                                    }
                                    onChange={(val) => {
                                      console.log(formik_object);
                                      setFieldValue(`residency.country`, val);
                                    }}
                                  />
                                );
                              }}
                            </Field>
                            <ErrorMessage
                              name="residency.country"
                              component={TextError}
                            />
                          </div>
                        </Col>

                        <Col lg="4">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label
                              htmlFor="residency.region"
                              className="form_text"
                            >
                              region/city{" "}
                            </label>
                            <Field
                              name="residency.region"
                              className="form-control in_field"
                            >
                              {({ form, field }) => {
                                const { setFieldValue } = form;
                                const value = field.value;
                                return (
                                  <RegionDropdown
                                    country={
                                      formik_object.values?.residency?.country
                                    }
                                    style={{ width: "100%" }}
                                    className="in_field form-control"
                                    value={value}
                                    countryValueType="short"
                                    onChange={(val) =>
                                      setFieldValue(`residency.region`, val)
                                    }
                                  />
                                );
                              }}
                            </Field>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div id="undergrad_info_section ">
                      <Row>
                        <Col xs="12" className="">
                          <div className={styles.form_section_title}>
                            undergrad info
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="8">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="zc_id" className="form_text">
                              Your ZC ID
                              <div
                                style={{
                                  color: "gray",
                                  fontWeight: "bolder",
                                  fontSize: "12px",
                                  letterSpacing: ".1em",
                                  textTransform: "lowercase",
                                }}
                              >
                                {"[Note, ID is available in grad certificate]"}
                              </div>
                            </label>

                            <Field
                              name="zc_id"
                              className="form-control in_field"
                              type="text"
                            />
                            <ErrorMessage name="zc_id" component={TextError} />
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="8">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="grad_year" className="form_text">
                              graduation year{" "}
                            </label>
                            <Field
                              name="grad_year"
                              className="form-control in_field"
                              type="text"
                            />
                            <ErrorMessage
                              name="grad_year"
                              component={TextError}
                            />
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="4">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="major" className="form_text">
                              Major{" "}
                            </label>
                            <Field
                              name="major"
                              as="select"
                              className="form-control in_field"
                            >
                              <option value="">Select major</option>
                              <option value="environmental engineering">
                                Environmental engineering
                              </option>
                              <option value="nanotechnology engineering">
                                Nanotechnology engineering
                              </option>
                              <option value="renewable energy engineering">
                                Renewable energy engineering
                              </option>
                              <option value="Aerospace engineering">
                                Aerospace engineering
                              </option>
                              <option value="communications engineering">
                                Communications engineering
                              </option>
                              <option value="biomedical science">
                                Biomedical science
                              </option>
                              <option value="materials science">
                                Materials science
                              </option>
                              <option value="nanoscience">Nanoscience</option>
                              <option value="physics of the earth and universe">
                                Physics of the earth and universe
                              </option>
                            </Field>
                            <ErrorMessage name="major" component={TextError} />
                          </div>
                        </Col>
                        <Col lg="4">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label htmlFor="minor" className="form_text">
                              minor
                              <span
                                style={{
                                  color: "gray",
                                  fontWeight: "bolder",
                                  fontSize: "11",
                                }}
                              >
                                {" (Optional)"}
                              </span>
                            </label>
                            <Field
                              name="minor"
                              as="select"
                              className="form-control in_field"
                            >
                              <option value="">Select minor</option>
                              <option value="environmental engineering">
                                Environmental engineering
                              </option>
                              <option value="nanotechnology engineering">
                                Nanotechnology engineering
                              </option>
                              <option value="renewable energy engineering">
                                Renewable energy engineering
                              </option>
                              <option value="Aerospace engineering">
                                Aerospace engineering
                              </option>
                              <option value="communications engineering">
                                Communications engineering
                              </option>
                              <option value="biomedical science">
                                Biomedical science
                              </option>
                              <option value="materials science">
                                Materials science
                              </option>
                              <option value="nanoscience">Nanoscience</option>
                              <option value="physics of the earth and universe">
                                Physics of the earth and universe
                              </option>
                            </Field>
                          </div>
                        </Col>
                      </Row>
                      <Row className="justify-content-end">
                        <Col lg="8">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label
                              htmlFor="other_undergraduate_data"
                              className="form_text"
                            >
                              Others
                              <span
                                style={{
                                  color: "gray",
                                  fontWeight: "bolder",
                                  fontSize: "11",
                                }}
                              >
                                {" (Optional)"}
                              </span>
                            </label>
                            <Field
                              name="other_undergraduate_data"
                              className="form-control in_field"
                              type="text"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div id="career_info_section ">
                      <Row className="section_title_row">
                        <Col xs="12" className="">
                          <div className={styles.form_section_title}>
                            career info
                          </div>
                        </Col>
                      </Row>
                      <Row className="field_of_exp_row justify-content-end ">
                        <Col lg="8">
                          <div className="form-group" style={{ width: "100%" }}>
                            <label
                              onClick={() => console.log(`clicked`)}
                              htmlFor="exp_field"
                              className="form_text"
                            >
                              field of experience
                              <div
                                style={{
                                  color: "gray",
                                  fontWeight: "bolder",
                                  fontSize: "12px",
                                  letterSpacing: ".1em",
                                  textTransform: "lowercase",
                                }}
                              >
                                {
                                  ' If you can\'t find your choice Type it then press "ENTER" to be added to our list '
                                }
                              </div>
                            </label>

                            <Field
                              name="exp_field"
                              as="select"
                              className="form-control in_field"
                            >
                              {({ form, field }) => {
                                const { setFieldValue } = form;
                                const { value } = field;
                                return (
                                  <CreatableSelect
                                    id="exp_field"
                                    {...field}
                                    isClearable
                                    isMulti
                                    onChange={(newValue, actionMeta) => {
                                      setFieldValue(`exp_field`, newValue);
                                    }}
                                    options={
                                      (value && value.length) === 3
                                        ? []
                                        : maped_exp_fields
                                    }
                                    noOptionsMessage={() => {
                                      return (value && value.length) === 3
                                        ? "you can select max of 3 fields of experiences"
                                        : "No options available";
                                    }}
                                  />
                                );
                              }}
                            </Field>
                            <ErrorMessage
                              name="exp_field"
                              component={TextError}
                            />
                            <div style={{ color: "red" }}>
                              {formRef.current
                                ? formRef.current.errors.exp_field
                                : ""}
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        id="universities_card"
                        className="justify-content-end"
                        style={{ marginTop: "50px" }}
                      >
                        <Col lg="8">
                          <div className=" from_group_box">
                            <div className="form_text3 ">
                              Universities
                              <div
                                style={{
                                  color: "#ADE3ED",
                                  fontWeight: "bolder",
                                  fontSize: "15px",
                                  letterSpacing: ".1em",
                                }}
                              >
                                {" (Optional)"}
                              </div>
                            </div>
                            <div className="form_text4 ">
                              Which universities or institutes other than ZC
                              have you visited?
                            </div>
                            <div className="d-flex ">
                              <div
                                className="form-group mx-3  ml-lg-4 "
                                style={{ width: "100%" }}
                              >
                                <FieldArray name="universities">
                                  {(fieldArrayProps) => {
                                    const { push, remove, form } =
                                      fieldArrayProps;
                                    const { values } = form;
                                    const universities = values?.universities;
                                    return (
                                      <div>
                                        {universities.map((phNumber, index) => (
                                          <div
                                            key={index}
                                            className="d-flex mt-5  mt-lg-4 mx-lg-0"
                                          >
                                            <div
                                              key={index}
                                              style={{ width: "100%" }}
                                            >
                                              <CollapsingUniCardComponent
                                                unies={maped_unies}
                                                index={index}
                                                remove={remove}
                                              />
                                            </div>
                                            <div
                                              className="form-group  my-0 d-none d-lg-flex"
                                              style={{
                                                width: "70px",
                                                color: "grey",
                                                fontSize: "30px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                              }}
                                            >
                                              {
                                                // index > 0 &&
                                                <div
                                                  className="trash_icon"
                                                  title={`delete university ${
                                                    index + 1
                                                  }`}
                                                  style={{}}
                                                  onClick={() => remove(index)}
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="pt-1"
                                                  />
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        ))}
                                        <div
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            fontSize: "40px",
                                            flexDirection: "column",
                                            justifyItems: "center",
                                            alignItems: "center",
                                          }}
                                        >
                                          <div
                                            onClick={() => push("")}
                                            type="button"
                                            class="  plus_button "
                                          >
                                            <FontAwesomeIcon icon={faPlus} />
                                          </div>
                                          <div className="plus_button_text">
                                            Add more universities
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </FieldArray>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <Row
                        id="entities_card"
                        className="justify-content-end"
                        style={{ marginTop: "50px" }}
                      >
                        <Col lg="8">
                          <div className=" from_group_box">
                            <div className="form_text3 ">
                              {"companies & organizations "}
                              <div className={styles.optional_text}>
                                {" "}
                                {" (Optional)"}{" "}
                              </div>
                            </div>
                            <div className="form_text4 ">
                              Which entites did you visit during your career?
                            </div>
                            <div className="d-flex ">
                              <div
                                className="form-group mx-3  ml-lg-4 "
                                style={{ width: "100%" }}
                              >
                                <FieldArray name="entities">
                                  {(fieldArrayProps) => {
                                    const { push, remove, form } =
                                      fieldArrayProps;
                                    const { values } = form;
                                    const { entities } = values;

                                    return (
                                      <div>
                                        {entities.map((phNumber, index) => (
                                          <div className="d-flex mt-4">
                                            <div
                                              key={index}
                                              style={{ width: "100%" }}
                                            >
                                              <CollapsingEntityCardComponent
                                                entities={maped_entities}
                                                index={index}
                                                remove={remove}
                                                formik_object={formik_object}
                                              />
                                            </div>

                                            <div
                                              className={`form-group  my-0 d-none d-lg-flex ${styles.trash_icon_container}`}
                                            >
                                              {
                                                <div
                                                  className="trash_icon"
                                                  title={`delete entity ${
                                                    index + 1
                                                  }`}
                                                  onClick={() => remove(index)}
                                                >
                                                  <FontAwesomeIcon
                                                    icon={faTrashAlt}
                                                    className="pt-1"
                                                  />
                                                </div>
                                              }
                                            </div>
                                          </div>
                                        ))}
                                        <div
                                          className={styles.plus_button_button}
                                        >
                                          <div
                                            onClick={() => push({})}
                                            type="button"
                                            class="  plus_button "
                                          >
                                            <FontAwesomeIcon icon={faPlus} />
                                          </div>
                                          <div className="plus_button_text">
                                            Add more entities
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  }}
                                </FieldArray>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>

                    <div className={styles.form_submit_section}>
                      <button
                        style={{ marginBottom: "100px" }}
                        type="submit"
                        className="btn btn-primary"
                        disabled={!formik_object.isValid}
                      >
                        {!formik_object.isValid
                          ? "form data not valid"
                          : "Submit"}
                      </button>
                    </div>
                  </Form>
                </div>
              }
            </Container>
          );
        }}
      </Formik>
    </>
  );
};

export default FormComponent;
