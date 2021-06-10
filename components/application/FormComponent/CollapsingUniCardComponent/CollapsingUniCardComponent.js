import React, { useState } from 'react';
import { Container, Col, Row, FormGroup, Label, Input, Button } from 'reactstrap';
import { Collapse, } from 'reactstrap';
import { FormText } from 'reactstrap';
import { Card, CardHeader, CardBody, } from 'reactstrap';
// import "./CollapsingUniCardComponent.css"
import { Formik, Field, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons'
import DateView from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'


import CreatableSelect from 'react-select/creatable';
import { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import Select from "react-select";

import { Component } from "react";

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';



const height = 35;

class MenuList extends Component { // this is a component to use the react-window library to make big dropdown lists render quickly
    render() {
        const { options, children, maxHeight, getValue } = this.props;
        const [value] = getValue();
        const initialOffset = options.indexOf(value) * height;

        return (
            <List
                height={maxHeight}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
            >
                {({ index, style }) => <div style={style}>{children[index]}</div>}
            </List>
        );
    }
}

function CollapsingUniCardComponent(props) {
    const index = props.index;

    const [IsOpen, setIsOpen] = useState(false);












    return (
        <div>

            <Card className="mt-1 uni_card">
                <CardHeader className="session_card_head box_header p-0 d-flex m-0" style={
                    IsOpen ? {
                        borderColor: 'rgb(38, 173, 203)',
                        borderWidth: '.1px',
                    }
                        :

                        { borderWidth: "0px" }
                }>

                    <div className="header_forms  mx-lg-3 ">
                        <Container>
                            <Row className="justify-content-start mt-2">
                                <Col lg="8" className="pr-lg-1 px-2">
                                    <div className="form-group mb-1" style={{ width: "100%" }}>
                                        <label htmlFor={`university_${index}`} className="form_text mb-1" >{`university ${index + 1} name`} </label>
                                        {props.unies &&
                                            <Field name={`universities[${index}].uni_name`} as="select" className="form-control in_field"  >
                                                {({ form, field }) => {
                                                    const { setFieldValue } = form
                                                    const { value } = field
                                                    return (

                                                        <CreatableSelect
                                                            id='exp_field'
                                                            {...field}
                                                            isClearable
                                                            components={{ MenuList }}
                                                            filterOption={createFilter({ ignoreAccents: false })} // this makes all the difference!
                                                            onChange={
                                                                (newValue, actionMeta) => {
                                                                    setFieldValue(`universities[${index}].uni_name`, newValue)

                                                                }}
                                                            options={props.unies ? props.unies : []}

                                                        />
                                                    )
                                                }}

                                            </Field>
                                        }
                                    </div>





                                </Col>
                                <Col lg="4" className="pl-lg-1 px-2">
                                    <div className="form-group mb-1" style={{ width: "100%" }}>
                                        <label htmlFor={`universities[${index}].visit_type`} className="form_text mb-1"> visit type </label>
                                        <Field name={`universities[${index}].visit_type`} as="select" className="form-control in_field mb-3 mb-lg-0">
                                            <option value="PHD">PHD student</option>
                                            <option value="Masters">Masters student</option>
                                            <option value="intern">intern</option>
                                            <option value="Others">Others</option>
                                        </Field>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    <div className=" header_buttons">

                        <div className="header_addinfo_button noselect" onClick={() => setIsOpen(!IsOpen)} >
                            <FontAwesomeIcon icon={faChevronCircleDown} className="pt-lg-0 pb-1 add_info_icon" />
                            <div className="add_info_text" style={{ fontSize: "10px", marginTop: "5px", textAlign: "center", width: "80%" }}>add more info</div>
                        </div>

                        <div className="header_delete_button" style={{}} onClick={() => props.remove(index)}>
                            <FontAwesomeIcon icon={faTrashAlt} className="pt-1" />
                        </div>
                    </div>



                </CardHeader>

                <Collapse isOpen={IsOpen} style={{
                    borderColor: 'rgb(38, 173, 203)',
                    borderStyle: 'dashed',
                    borderWidth: '1.5px',
                    borderTopWidth: '0px'
                }}>
                    <CardBody>
                        <Container row>
                            <Row>
                                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                                    <div htmlFor={`universities[${index}].major`} className="card_body_labels mb-1">
                                        <div>
                                            Major
                                        </div>

                                    </div>
                                </Col>
                                <Col sm={9}>
                                    <Field name={`universities[${index}].major`} className="form-control in_field" >
                                        {/* <Field name={`university_${index}`} className="form-control in_field" > */}
                                    </Field>
                                </Col>
                                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                                    <div htmlFor={`universities[${index}].major`} className="card_body_labels mb-1">
                                        Graduation date
                                    </div>
                                </Col>

                                <Col sm={9}>
                                    {/* <Field name={`universities[${index}].major`} className="form-control in_field" >
                                    </Field> */}
                                    <Field name={`universities[${index}].grad_date`} className="form-control in_field" >
                                        {({ form, field }) => {
                                            const { setFieldValue } = form
                                            const { value } = field
                                            return (
                                                <DateView className="form-control in_field"
                                                    style={{
                                                        textAlign: "end"
                                                    }}
                                                    id={`universities[${index}].date`}
                                                    {...field}
                                                    selected={value}
                                                    dateFormat="MM/yyyy"
                                                    showMonthYearPicker
                                                    onChange={val => setFieldValue(`universities[${index}].grad_date`, val)}
                                                />
                                            )
                                        }}
                                    </Field>
                                </Col>










                                <Col sm={3} className="d-flex justify-content-md-end pr-0">

                                    <div htmlFor={`universities[${index}].country`} className="card_body_labels mb-1">
                                        country
                                    </div>

                                </Col>

                                <Col sm={9}>
                                    <Field name={`universities[${index}].country`} className="form-control in_field" >
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
                                                    onClick={val => { console.log(form.values) }}
                                                    onBlur={
                                                        val => setFieldTouched(`universities[${index}].country`)
                                                    }
                                                    onChange={val => { setFieldValue(`universities[${index}].country`, val) }} />
                                            )
                                        }}
                                    </Field>

                                </Col>



                                <Col sm={3} className="d-flex justify-content-md-end pr-0">

                                    <div htmlFor={`universities[${index}].country`} className="card_body_labels mb-1">
                                        region/city
                                    </div>
                                </Col>


                                <Col sm={9}>

                                    <Field name={`universities[${index}].region`} className="form-control in_field" >
                                        {({ form, field }) => {
                                            const { setFieldValue } = form
                                            const value = field.value
                                            return (
                                                <RegionDropdown
                                                    country={form.values.universities[index].country}
                                                    style={{ width: "100%" }}
                                                    className="in_field form-control"
                                                    value={value}
                                                    countryValueType="short"
                                                    onChange={val => setFieldValue(`universities[${index}].region`, val)} />
                                            )
                                        }}
                                    </Field>

                                </Col>








                                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                                    <div htmlFor={`universities[${index}].linkedin`} className="card_body_labels mb-1">
                                        university linkedin page URL
                                    </div>
                                </Col>
                                <Col sm={9}>
                                    <Field name={`universities[${index}].linkedin`} className="form-control in_field" >
                                        {/* <Field name={`university_${index}`} className="form-control in_field" > */}
                                    </Field>
                                </Col>
                            </Row>
                        </Container>
                    </CardBody>
                </Collapse>
            </Card>

        </div>
    )
}

export default CollapsingUniCardComponent
