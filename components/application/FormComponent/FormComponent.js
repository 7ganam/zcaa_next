// components/contactus-form.component.js
import { useContext } from "react";
import { LoginContext } from "../../../contexts/loginContext"

import React, { useState, useCallback, useRef } from 'react'
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap'
// import './FormComponent.css'
import CollapsingUniCardComponent from './CollapsingUniCardComponent/CollapsingUniCardComponent'
import CollapsingEntityCardComponent from './CollapsingEntityCardComponent/CollapsingEntityCardComponent'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import * as Yup from 'yup';
import TextError from "./TextError"
import { Modal, ModalBody } from 'reactstrap';
import GooglebtnComponent from './GooglebtnComponent/GooglebtnComponent'
import ReactLoading from 'react-loading';

import DateView from 'react-datepicker'

import CreatableSelect from 'react-select/creatable';

import { useEffect } from 'react';
import { useHttpClient } from "../../../hooks/http-hook"











// const SignupSchema = Yup.object().shape({})
const SignupSchema = Yup.object().shape({
    first_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email'),
    // exp_field: Yup.string().required('Required'),
    phone: Yup.number("must be a number").positive("positive numbers only ").integer("integers only"),
    birth_date: Yup.string().required('Required'),
    // address: Yup.string().required('Required'),
    zc_id: Yup.number("must be a number").min(201300000, '201300000 min').required('Required'),
    grad_year: Yup.number("must be a number").min(2017, '2017 min').required('Required'),
    major: Yup.string().required('Required'),
    residency: Yup.object().shape({
        country: Yup.string().min(2, 'error').required('Required'),
        region: Yup.string().min(2, 'error'),
        // Rest of your amenities object properties
    }),
    exp_field: Yup.array()
        .min(1, 'Pick at least 1 field')
        .max(3, 'Pick  max 3 fields')
        .of(
            Yup.object().shape({
                label: Yup.string().required(),
                value: Yup.string().required(),
            })
        ),

});





















const FormComponent = (props) => {

    const { login, IsLoggedIn, Token } = useContext(LoginContext);

    // http states
    const [Response_json_content, setResponse_json_content] = useState({});
    const [Fetch_success, setFetch_success] = useState(false);
    const [Sending_data, setSending_data] = useState(false);
    const [Fetch_error, setFetch_error] = useState(false);
    const [Error_message, setError_message] = useState(null);

    // google modal states
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let [gdata, set_gdata] = useState(null)









    const { isLoading: Exp_fieldsIsLoading, error: Exp_fieldsError, sendRequest: sendExp_fieldsRequest, clearError } = useHttpClient();
    const [LoadedExp_fields, setLoadedExp_fields] = useState(null);
    const fetch_Exp_fields = useCallback(
        async () => {
            try {

                const responseData = await sendExp_fieldsRequest(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/experienceField`
                );

                let maped_ids_to_values = responseData.map((exp_field) => { exp_field.value = exp_field._id; return (exp_field) })
                setLoadedExp_fields(maped_ids_to_values);
                console.log('setLoadedExp_fields', maped_ids_to_values)
            } catch (err) {
                console.log({ err })
            }


        },
        [sendExp_fieldsRequest],
    );

    const { isLoading: UniesIsLoading, error: UniesError, sendRequest: sendUniesRequest, clearError: clearUniesError } = useHttpClient();
    const [LoadedUnies, setLoadedUnies] = useState(null);
    const fetch_Unies = useCallback(
        async () => {
            try {

                const responseData = await sendUniesRequest(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/university`
                );

                let maped_ids_to_values = responseData.map((uni) => {
                    uni.value = uni._id;
                    uni.label = uni.name;
                    return (uni)
                }
                )
                setLoadedUnies(maped_ids_to_values);
                console.log('setLoadedUnies', maped_ids_to_values)
            } catch (err) {
                console.log({ err })
            }


        },
        [sendUniesRequest],
    );

    const { isLoading: EntitiesIsLoading, error: EntitiesError, sendRequest: sendEntitiesRequest, clearError: clearEntitiesError } = useHttpClient();
    const [LoadedEntities, setLoadedEntities] = useState(null);
    const fetch_Entities = useCallback(
        async () => {
            try {

                const responseData = await sendEntitiesRequest(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/entity`
                );

                let maped_ids_to_values = responseData.map((uni) => {
                    uni.value = uni._id;
                    uni.label = uni.name;
                    return (uni)
                }
                )
                setLoadedEntities(maped_ids_to_values);
                console.log('setLoadedEntities', maped_ids_to_values)
            } catch (err) {
                console.log({ err })
            }


        },
        [sendEntitiesRequest],
    );

    useEffect(() => {
        fetch_Exp_fields();
        fetch_Unies();
        fetch_Entities()
    }, []);
















    const submit_applicant = async (google_data) => {
        try {
            toggle();
            setSending_data(true)

            let form_state = formRef.current.values;
            let id_token = google_data.tokenObj.id_token
            const body_data = { form_state, google_data }
            const response = await fetch(
                // ${process.env.NEXT_PUBLIC_BACKEND_URL}
                `/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data)
            });
            const response_json_content = await response.json()
            if (!response.ok) {
                setFetch_error(true)
                throw new Error(response_json_content.message || "can't fetch data ... could be a connection error or unhandled backend error");
            }
            setSending_data(false)
            setResponse_json_content(response_json_content)

            if (response_json_content.message === "success" || response_json_content.message === "already_applied_before") {
                setFetch_success(true)
                console.log(response_json_content)
                login(response_json_content.user, response_json_content.token, response_json_content.expirateion_date_string, true)
            }

        } catch (err) {
            setSending_data(false)
            setError_message(err.message)
            console.log(err);
        }
    };













    const formRef = useRef();

    return (
        <>
            <Container fluid style={{ position: 'relative', padding: '0', }}>
                <img
                    style={{ width: "100%", height: "auto", position: "absolute", top: "-190px", zIndex: "-1" }} src={"/about/bg2.png"} id="c" alt="oval" />
            </Container>

            <Formik
                validationSchema={SignupSchema}
                innerRef={formRef}
                initialValues={{
                    birth_date: '',
                    first_name: '', last_name: '', email: '', exp_field: [], residency: { country: "", region: "" }, content: '', phone: '', address: '', zc_id: '', grad_year: '', major: '', minor: '', other_undergraduate_data: '', universities: ['', ''], entities: [{}, {}]
                }}
                onSubmit={
                    (values) => { toggle() } // just show the google modal on submit ... it will call the submit function when google authenticate
                }
            >
                {(formik_object) => {
                    // the dispaly sequence as follows : if success state is true show the sucess component 
                    // else if the data is being sent show the loading component 
                    // else show the form component ... which contains the google modal.
                    return (
                        <Container>
                            {
                                IsLoggedIn ?
                                    <div id="application_sucess">
                                        <div style={{ marginBottom: "30px" }}>
                                            {
                                                <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                                                    <div id="login_card" style={{ backgroundColor: "white", marginTop: "50px" }}>

                                                        <div style={{ width: "20%", minWidth: "155px", position: "relative", height: "auto", marginTop: "50px" }}>
                                                            <img style={{
                                                                width: "100%", minWidth: "155px", height: "auto", marginTop: "20px", borderRadius: "50%", border: '11px solid #ADE3ED'

                                                            }} src={Fetch_success ? Response_json_content.user.g_picture : Token.g_picture} alt="logo" />

                                                            <img style={{
                                                                width: "30%", minWidth: "70px", height: "auto", position: "absolute", bottom: "-20px", right: "0px"
                                                                ,
                                                            }} src={"/logo.png"} alt="logo" />

                                                        </div>

                                                        <div style={{
                                                            width: "50%", marginTop: "10px", fontSize: '30px',
                                                            lineHeight: '125.5%', textAlign: 'center', textTransform: 'uppercase',
                                                            color: '#BDD7DB', fontFamily: "Cairo", fontStyle: 'normal', fontWeight: 'bold',
                                                        }}>
                                                            <div style={{ color: "gray", marginTop: "30px", }}>
                                                                Welocme
                                                            </div>
                                                            <div>
                                                                to the family
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Container>}
                                        </div>
                                    </div>
                                    :
                                    (Sending_data ?
                                        <div id="loading_spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }} >
                                            <div style={{ marginTop: "100px" }}>
                                                <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />
                                            </div>
                                        </div>
                                        :
                                        <div id="form_and_modal">

                                            <div id="google_modal" >
                                                <Modal
                                                    size="lg" style={{ maxWidth: '1600px', width: '80%', marginRight: "auto", marginLeft: "auto", backgroundColor: 'transparent' }}
                                                    isOpen={modal} toggle={toggle}>
                                                    {/* <ModalHeader toggle={toggle} style={{ borderBottom: "0px solid #dee2e6" }}></ModalHeader> */}
                                                    <div style={{}} ></div>
                                                    <ModalBody style={{ padding: "0px" }} >
                                                        <div style={{}}>
                                                            {!gdata && <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px" }}>
                                                                <div id="login_card" style={{}}>
                                                                    <img style={{ width: "200px", height: "auto", opacity: "0.5", marginTop: "50px" }} src={"/logo.png"} alt="logo" />
                                                                    <div id="login_disclimare" >
                                                                        <span className="font1">You need to have a </span>
                                                                        <span className="font2">zewailcity email </span>
                                                                        <span className="font1">to apply </span>
                                                                    </div>
                                                                    <div style={{ marginTop: "10px" }}>
                                                                        <GooglebtnComponent onclick={submit_applicant} />
                                                                    </div>
                                                                </div>
                                                            </Container>}
                                                        </div>
                                                    </ModalBody>
                                                    {/* <ModalFooter>
                                                        <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                                                        <Button color="secondary" onClick={toggle}>Cancel</Button>
                                                    </ModalFooter> */}
                                                </Modal>
                                            </div>
                                            {(LoadedEntities && LoadedUnies && LoadedExp_fields) ?
                                                <Form>

                                                    <div id="personal_info_section ">
                                                        <Row >
                                                            <Col xs="12" className="" >
                                                                <div
                                                                    style={{
                                                                        textAlign: "left",
                                                                        marginTop: "50px",
                                                                        marginBottom: "50px",
                                                                        borderBottomStyle: 'solid',
                                                                        borderBottomWidth: "0.5px",
                                                                        borderBottomColor: " #C5BCBC"
                                                                    }} className="form_section_title"
                                                                >
                                                                    Personal info
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="4">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="first_name" className="form_text">first name </label>
                                                                    <Field name="first_name" className="form-control in_field" type="text" />
                                                                    <ErrorMessage name='first_name' component={TextError} />
                                                                </div>
                                                            </Col>
                                                            <Col lg="4">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="last_name" className="form_text" >Last name</label>
                                                                    <Field name="last_name" className="form-control in_field" type="text" />
                                                                    <ErrorMessage name='last_name' component={TextError} />

                                                                </div>
                                                            </Col>


                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="8">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="email" className="form_text" style={{ letterSpacing: '0.2em' }}>prefered email for communication
                                                                        <span style={{ color: "gray", fontWeight: "bolder", fontSize: "11" }}>{" (Optional)"}</span>
                                                                    </label>
                                                                    <Field name="email" className="form-control in_field " type="email" />
                                                                    <ErrorMessage name='email' component={TextError} />

                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="8">
                                                                <label className="form_text">
                                                                    Birth date
                                                                </label>
                                                            </Col>

                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="8">
                                                                <Field name={`birth_date`} className="form-control in_field" >
                                                                    {({ form, field }) => {
                                                                        const { setFieldValue } = form
                                                                        const { value } = field
                                                                        return (
                                                                            <DateView className="form-control in_field"
                                                                                style={{
                                                                                    textAlign: "end"
                                                                                }}
                                                                                id={`birth_date`}
                                                                                {...field}
                                                                                selected={value}
                                                                                peekNextMonth
                                                                                showMonthDropdown
                                                                                showYearDropdown
                                                                                dropdownMode="select"
                                                                                onChange={val => setFieldValue(`birth_date`, val)}
                                                                            />
                                                                        )
                                                                    }}
                                                                </Field>
                                                                <ErrorMessage name='birth_date' component={TextError} />
                                                            </Col>
                                                        </Row>


                                                        <Row className="justify-content-end mt-3">
                                                            <Col lg="8">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="phone" className="form_text">phone
                                                                        <span style={{ color: "gray", fontWeight: "bolder", fontSize: "11" }}>{" (Optional)"}</span>
                                                                    </label>
                                                                    <Field name="phone" className="form-control in_field" type="text" />
                                                                    <ErrorMessage name='phone' component={TextError} />

                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="4">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="residency.country" className="form_text"> country of residence </label>
                                                                    <Field name="residency.country" className="form-control in_field" >
                                                                        {({ form, field }) => {
                                                                            const { setFieldValue } = form
                                                                            const { setFieldTouched } = form

                                                                            const value = field.value
                                                                            return (
                                                                                <CountryDropdown
                                                                                    valueType="short"
                                                                                    style={{ width: "100%" }}
                                                                                    className="in_field form-control"
                                                                                    value={value}
                                                                                    onClick={val => { console.log(formik_object) }}
                                                                                    onBlur={
                                                                                        val => setFieldTouched(`residency.country`)
                                                                                    }
                                                                                    onChange={val => { console.log(formik_object); setFieldValue(`residency.country`, val) }} />
                                                                            )
                                                                        }}
                                                                    </Field>
                                                                    <ErrorMessage name='residency.country' component={TextError} />
                                                                </div>
                                                            </Col>

                                                            <Col lg="4">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="residency.region" className="form_text">region/city </label>
                                                                    <Field name="residency.region" className="form-control in_field" >
                                                                        {({ form, field }) => {
                                                                            const { setFieldValue } = form
                                                                            const value = field.value
                                                                            return (
                                                                                <RegionDropdown
                                                                                    country={formik_object.values.residency.country}
                                                                                    style={{ width: "100%" }}
                                                                                    className="in_field form-control"
                                                                                    value={value}
                                                                                    countryValueType="short"
                                                                                    onChange={val => setFieldValue(`residency.region`, val)} />
                                                                            )
                                                                        }}
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        {/* <Row className="justify-content-end ">
                                                        <Col lg="8">
                                                            <div className="form-group" style={{ width: "100%" }}>
                                                                <label htmlFor="address" className="form_text">address </label>
                                                                <Field name="address" className="form-control in_field" type="text" />
                                                                <ErrorMessage name='address' component={TextError} />
                                                            </div>
                                                        </Col>
                                                    </Row> */}
                                                    </div>

                                                    <div id="undergrad_info_section ">
                                                        <Row >
                                                            <Col xs="12" className="" >
                                                                <div
                                                                    style={{
                                                                        textAlign: "left",
                                                                        marginTop: "50px",
                                                                        marginBottom: "50px",
                                                                        borderBottomStyle: 'solid',
                                                                        borderBottomWidth: "0.5px",
                                                                        borderBottomColor: " #C5BCBC"
                                                                    }} className="form_section_title"
                                                                >
                                                                    undergrad info
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="8">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="zc_id" className="form_text">Your ZC ID

                                                                        <div style={{ color: "gray", fontWeight: "bolder", fontSize: "12px", letterSpacing: ".1em", textTransform: 'lowercase' }}>
                                                                            {'[Note, ID is available in grad certificate]'}
                                                                        </div>
                                                                    </label>

                                                                    <Field name="zc_id" className="form-control in_field" type="text" />
                                                                    <ErrorMessage name='zc_id' component={TextError} />

                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="8">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="grad_year" className="form_text">graduation year </label>
                                                                    <Field name="grad_year" className="form-control in_field" type="text" />
                                                                    <ErrorMessage name='grad_year' component={TextError} />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="4">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="major" className="form_text">Major </label>
                                                                    <Field name="major" as="select" className="form-control in_field">
                                                                        <option value="">Select major</option>
                                                                        <option value="environmental engineering">Environmental engineering</option>
                                                                        <option value="nanotechnology engineering">Nanotechnology engineering</option>
                                                                        <option value="renewable energy engineering">Renewable energy engineering</option>
                                                                        <option value="Aerospace engineering">Aerospace engineering</option>
                                                                        <option value="communications engineering">Communications engineering</option>
                                                                        <option value="biomedical science">Biomedical science</option>
                                                                        <option value="materials science">Materials science</option>
                                                                        <option value="nanoscience">Nanoscience</option>
                                                                        <option value="physics of the earth and universe">Physics of the earth and universe</option>
                                                                    </Field>
                                                                    <ErrorMessage name='major' component={TextError} />
                                                                </div>
                                                            </Col>
                                                            <Col lg="4">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="minor" className="form_text">minor
                                                                        <span style={{ color: "gray", fontWeight: "bolder", fontSize: "11" }}>{" (Optional)"}</span>
                                                                    </label>
                                                                    <Field name="minor" as="select" className="form-control in_field">
                                                                        <option value="">Select minor</option>
                                                                        <option value="environmental engineering">Environmental engineering</option>
                                                                        <option value="nanotechnology engineering">Nanotechnology engineering</option>
                                                                        <option value="renewable energy engineering">Renewable energy engineering</option>
                                                                        <option value="Aerospace engineering">Aerospace engineering</option>
                                                                        <option value="communications engineering">Communications engineering</option>
                                                                        <option value="biomedical science">Biomedical science</option>
                                                                        <option value="materials science">Materials science</option>
                                                                        <option value="nanoscience">Nanoscience</option>
                                                                        <option value="physics of the earth and universe">Physics of the earth and universe</option>
                                                                    </Field>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end">
                                                            <Col lg="8">
                                                                <div className="form-group" style={{ width: "100%" }}>
                                                                    <label htmlFor="other_undergraduate_data" className="form_text">Others
                                                                        <span style={{ color: "gray", fontWeight: "bolder", fontSize: "11" }}>{" (Optional)"}</span>
                                                                    </label>
                                                                    <Field name="other_undergraduate_data" className="form-control in_field" type="text" />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                    <div id="career_info_section ">
                                                        <Row >
                                                            <Col xs="12" className="" >
                                                                <div
                                                                    style={{
                                                                        textAlign: "left",
                                                                        marginTop: "50px",
                                                                        marginBottom: "50px",
                                                                        borderBottomStyle: 'solid',
                                                                        borderBottomWidth: "0.5px",
                                                                        borderBottomColor: " #C5BCBC"
                                                                    }} className="form_section_title"
                                                                >
                                                                    career info
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-end ">
                                                            <Col lg="8">
                                                                {LoadedExp_fields && LoadedExp_fields.length > 0 &&
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label onClick={() => console.log(`clicked`)} htmlFor="exp_field" className="form_text">field of experience
                                                                            <div style={{ color: "gray", fontWeight: "bolder", fontSize: "12px", letterSpacing: ".1em", textTransform: 'lowercase' }}>
                                                                                {' If you can\'t find your choice Type it then press "ENTER" to be added to our list '}
                                                                            </div>
                                                                        </label>


                                                                        <Field name="exp_field" as="select" className="form-control in_field"  >
                                                                            {({ form, field }) => {
                                                                                const { setFieldValue } = form
                                                                                const { value } = field
                                                                                return (

                                                                                    <CreatableSelect
                                                                                        id='exp_field'
                                                                                        {...field}
                                                                                        isClearable
                                                                                        isMulti
                                                                                        onChange={
                                                                                            (newValue, actionMeta) => {
                                                                                                setFieldValue(`exp_field`, newValue)

                                                                                            }}
                                                                                        options={value.length === 3 ? [] : LoadedExp_fields}
                                                                                        noOptionsMessage={() => {
                                                                                            return value.length === 3 ? "you can select max of 3 fields of experiences" : 'No options available';
                                                                                        }}

                                                                                    />
                                                                                )
                                                                            }}

                                                                        </Field>
                                                                        <ErrorMessage name='exp_field' component={TextError} />
                                                                        <div style={{ color: 'red' }}>{formRef.current.errors.exp_field}</div>




                                                                    </div>
                                                                }
                                                            </Col>
                                                        </Row>



                                                        {formik_object.values.exp_field === "other" &&
                                                            <Row className="justify-content-end ">
                                                                <Col lg="8">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="new_exp_field" className="form_text"> type your field of experience </label>
                                                                        <Field name="new_exp_field" type="text" className="form-control in_field">
                                                                        </Field>
                                                                        <ErrorMessage name='new_exp_field' component={TextError} />

                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        }
                                                        <Row id="universities_card" className="justify-content-end" style={{ marginTop: "50px" }}>
                                                            <Col lg="8" >
                                                                <div className=" from_group_box">
                                                                    <div className="form_text3 " >Universities
                                                                        <div style={{ color: "#ADE3ED", fontWeight: "bolder", fontSize: "15px", letterSpacing: ".1em" }}>{" (Optional)"}</div>
                                                                    </div>
                                                                    <div className="form_text4 " >Which universities other than ZC have you visited?</div>
                                                                    <div className="d-flex ">
                                                                        <div className="form-group mx-3  ml-lg-4 " style={{ width: "100%" }}>
                                                                            <FieldArray name='universities'>
                                                                                {fieldArrayProps => {
                                                                                    const { push, remove, form } = fieldArrayProps
                                                                                    const { values } = form
                                                                                    const { universities } = values
                                                                                    return (
                                                                                        <div>
                                                                                            {universities.map((phNumber, index) => (
                                                                                                <div key={index} className="d-flex mt-5  mt-lg-4 mx-lg-0">
                                                                                                    <div key={index} style={{ width: "100%" }}>
                                                                                                        <CollapsingUniCardComponent unies={LoadedUnies} index={index} remove={remove} />
                                                                                                    </div>
                                                                                                    <div className="form-group  my-0 d-none d-lg-flex"
                                                                                                        style={{ width: "70px", color: "grey", fontSize: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                                                                    >
                                                                                                        {
                                                                                                            // index > 0 &&
                                                                                                            (
                                                                                                                <div className="trash_icon" title={`delete university ${index + 1}`} style={{}} onClick={() => remove(index)}>
                                                                                                                    <FontAwesomeIcon icon={faTrashAlt} className="pt-1" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                            < div style={{ display: "flex", justifyContent: "center", fontSize: "40px", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                                                                                                <div onClick={() => push('')} type="button" class="  plus_button ">
                                                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                                                </div>
                                                                                                <div className="plus_button_text">
                                                                                                    Add more universities
                                                                                                </div>
                                                                                            </div >
                                                                                        </div>
                                                                                    )
                                                                                }}
                                                                            </FieldArray>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <Row id="entities_card" className="justify-content-end" style={{ marginTop: "50px" }}>
                                                            <Col lg="8" >
                                                                <div className=" from_group_box">
                                                                    <div className="form_text3 " >{'companies & organizations '}
                                                                        <div style={{ color: "#ADE3ED", fontWeight: "bolder", fontSize: "15px", letterSpacing: ".1em" }}>{" (Optional)"}</div>
                                                                    </div>
                                                                    <div className="form_text4 " >Which entites did you visit during your career?</div>
                                                                    <div className="d-flex ">
                                                                        <div className="form-group mx-3  ml-lg-4 " style={{ width: "100%" }}>
                                                                            <FieldArray name='entities'>
                                                                                {fieldArrayProps => {
                                                                                    const { push, remove, form } = fieldArrayProps
                                                                                    const { values } = form
                                                                                    const { entities } = values

                                                                                    return (
                                                                                        <div>
                                                                                            {entities.map((phNumber, index) => (
                                                                                                <div className="d-flex mt-4">
                                                                                                    <div key={index} style={{ width: "100%" }}>
                                                                                                        <CollapsingEntityCardComponent entities={LoadedEntities} index={index} remove={remove}
                                                                                                            formik_object={formik_object} />
                                                                                                    </div>
                                                                                                    <div className="form-group  my-0 d-none d-lg-flex"
                                                                                                        style={{ width: "70px", color: "grey", fontSize: "30px", display: "flex", justifyContent: "center", alignItems: "center" }}
                                                                                                    >
                                                                                                        {
                                                                                                            // index > 0 &&
                                                                                                            (
                                                                                                                <div className="trash_icon" title={`delete entity ${index + 1}`} style={{}} onClick={() => remove(index)}>
                                                                                                                    <FontAwesomeIcon icon={faTrashAlt} className="pt-1" />
                                                                                                                </div>
                                                                                                            )}
                                                                                                    </div>
                                                                                                </div>
                                                                                            ))}
                                                                                            < div style={{ display: "flex", justifyContent: "center", fontSize: "40px", flexDirection: "column", justifyItems: "center", alignItems: "center" }}>
                                                                                                <div onClick={() => push({})} type="button" class="  plus_button ">
                                                                                                    <FontAwesomeIcon icon={faPlus} />
                                                                                                </div>
                                                                                                <div className="plus_button_text">
                                                                                                    Add more entities
                                                                                                </div>
                                                                                            </div >
                                                                                        </div>
                                                                                    )
                                                                                }}
                                                                            </FieldArray>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div >

                                                    {/* <div style={{ height: "100px", marginTop: "100px" }}>{JSON.stringify(formik_object.values, null, 2)}</div> */}
                                                    <div className="" style={{ marginTop: "100px", display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                        <button style={{ marginBottom: "100px" }} type="submit" className="btn btn-primary" disabled={!formik_object.isValid} >{!formik_object.isValid ? "form data not valid" : "Submit"}</button>
                                                        {/* <div style={{ height: "100px", marginTop: "100px" }}>{JSON.stringify(formik_object.isValid, null, 2)}</div> */}
                                                    </div>

                                                </Form>
                                                :
                                                <div style={{ height: '110vh', width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '200px' }}>

                                                    <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />

                                                </div>
                                            }
                                        </div>
                                    )
                            }
                        </Container>

                    )
                }}
            </Formik >

        </>);
};

export default FormComponent;