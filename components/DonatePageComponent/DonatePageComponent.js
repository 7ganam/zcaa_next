import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap'
import * as Yup from 'yup';
import { Formik, Field, Form, FieldArray, ErrorMessage } from 'formik';
import TextError from "./TextError"
import AmountComponent from './AmountComponent/AmountComponent';
import DonationTargetComponent from './DonationTargetComponent/DonationTargetComponent';
import DonateModalComponenet from './DonateModalComponenet/DonateModalComponenet';


import styles from './DonatePageComponent.module.css'
const DonateSchema = Yup.object().shape({
    your_name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    phone: Yup.number("must be a number").positive("positive numbers only ").integer("integers only"),
    address: Yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required('Required'),
    amount: Yup.number("____must be a number").positive("positive numbers only ").integer("integers only").required('Required').typeError('A number is required'),
    dontatedTo: Yup.string().required('Required')

});


export default function DonatePageComponent(props) {

    const formRef = useRef();
    const [AmountIsOther, setAmountIsOther] = useState(false)
    const [ModalIsShown, setModalIsShown] = useState(false)
    const [DonationString, setDonationString] = useState('')

    const ToggleModal = () => {
        setModalIsShown(!ModalIsShown);
    }


    return (
        <React.Fragment>
            {
                <div>
                    <DonateModalComponenet toggle={ToggleModal} isShown={ModalIsShown} DonationString={DonationString} />
                    <Container fluid style={{ background: "rgba(164, 223, 234, 0.15)", minHeight: "80vh", padding: '0' }}>
                        <div id="application_sucess" style={{}}>
                            <div style={{ marginBottom: "0px" }}>
                                <Container fluid className={styles.donate_container}>
                                    <div id="donate_card" className={styles.donate_card}>

                                        <div className={styles.text_div}>
                                            <div style={{ color: "gray", marginTop: "30px", }}>
                                                donation gate
                                            </div>
                                            <div className={styles.subtitle} >
                                                fill in the form and you will be transfered to the payment page
                                            </div>
                                        </div>

                                        <Formik
                                            validationSchema={DonateSchema}
                                            innerRef={formRef}
                                            initialValues={{ your_name: '', email: '', phone: '', address: '', amount: '', dontatedTo: '' }}
                                            onSubmit={(values) => { console.log(values); ToggleModal() }}
                                        >
                                            {(formik_object) => {

                                                return (
                                                    <Container >
                                                        {/* <div>{JSON.stringify(formik_object.values)}</div> */}
                                                        <Form>
                                                            <Row className="justify-content-around">
                                                                <Col lg="6">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="your_name" className="form_text">your name </label>
                                                                        <Field name="your_name" className={` ${styles.input_field}`} type="text" />
                                                                        <ErrorMessage name='your_name' component={TextError} />
                                                                    </div>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="phone" className="form_text" >phone number</label>
                                                                        <Field name="phone" className={` ${styles.input_field}`} type="text" />
                                                                        <ErrorMessage name='phone' component={TextError} />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="justify-content-around">
                                                                <Col lg="6">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="email" className="form_text">email </label>
                                                                        <Field name="email" className={` ${styles.input_field}`} type="text" />
                                                                        <ErrorMessage name='email' component={TextError} />
                                                                    </div>
                                                                </Col>
                                                                <Col lg="6">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="address" className="form_text" >address</label>
                                                                        <Field name="address" className={` ${styles.input_field}`} type="text" />
                                                                        <ErrorMessage name='address' component={TextError} />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row className="justify-content-around">


                                                                <Col lg="6">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="amount" className="form_text">amount </label>
                                                                        {/* <Field name="amount" className={` ${styles.input_field}`} type="text" /> */}
                                                                        <Field name="amount" className="form-control in_field" >
                                                                            {
                                                                                ({ form, field }) => {
                                                                                    const { setFieldValue } = form
                                                                                    const { value } = field
                                                                                    return (
                                                                                        <AmountComponent setFieldValue={setFieldValue} init={value} formik_object={formik_object} setAmountIsOther={setAmountIsOther} />
                                                                                    )
                                                                                }
                                                                            }

                                                                        </Field>
                                                                        {/* <ErrorMessage name='amount' component={TextError} /> */}
                                                                    </div>

                                                                </Col>
                                                                <Col lg="6">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <div style={{ width: "100%", display: 'flex', flexDirection: "row", justifyContent: 'start' }}>
                                                                            {AmountIsOther ?
                                                                                <Field name="amount" className={` ${styles.price_field}`} type="text" placeholder="Enter donation amount here *" style={{ fontSize: '16px' }} />
                                                                                :
                                                                                <input name="amount" className={` ${styles.price_field}`} type="text" readOnly value={formik_object.values.amount} />
                                                                            }
                                                                            <div className={` ${styles.price_tag}`}> EGP</div>
                                                                        </div>
                                                                        <ErrorMessage name='amount' component={TextError} />

                                                                    </div>

                                                                </Col>

                                                            </Row>
                                                            <Row className="justify-content-around mt-5">
                                                                <Col lg="12">
                                                                    <div className="form-group" style={{ width: "100%" }}>
                                                                        <label htmlFor="dontatedTo" className="form_text">donate to </label>
                                                                        {/* <Field name="your_name" className={` ${styles.input_field}`} type="text" /> */}
                                                                        <Field name="dontatedTo" className="form-control in_field" >
                                                                            {
                                                                                ({ form, field }) => {
                                                                                    const { setFieldValue } = form
                                                                                    const { value } = field
                                                                                    return (
                                                                                        <DonationTargetComponent setFieldValue={setFieldValue} setDonationString={setDonationString} />
                                                                                    )
                                                                                }
                                                                            }
                                                                        </Field>
                                                                        <ErrorMessage name='dontatedTo' component={TextError} />
                                                                    </div>
                                                                </Col>
                                                            </Row>

                                                            <div className="" style={{ marginTop: "100px", display: "flex", justifyContent: 'flex-end', alignItems: 'flex-end', }}>
                                                                <button
                                                                    style={{ marginBottom: "100px" }} type="submit" className="btn btn-primary" disabled={!formik_object.isValid}
                                                                >
                                                                    {!formik_object.isValid ? "form data not valid" : "Submit"}
                                                                </button>
                                                            </div>

                                                        </Form>
                                                    </Container>

                                                )
                                            }}
                                        </Formik >



                                    </div>
                                </Container>

                            </div>
                        </div>
                    </Container>
                </div>
            }
        </React.Fragment>
    )
}