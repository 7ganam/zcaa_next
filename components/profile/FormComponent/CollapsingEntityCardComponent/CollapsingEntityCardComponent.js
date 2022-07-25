import React, { useState } from "react";
import {
  Container,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Collapse } from "reactstrap";
import { FormText } from "reactstrap";
import { Card, CardHeader, CardBody } from "reactstrap";
// import "./CollapsingEntityCardComponent.css"
import { Formik, Field, Form } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import DateView from "react-datepicker";
// import 'react-datepicker/dist/react-datepicker.css'
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";

import CreatableSelect from "react-select/creatable";
import { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import Select from "react-select";

import { Component } from "react";

const height = 35;

class MenuList extends Component {
  // this is a component to use the react-window library to make big dropdown lists render quickly
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

function CollapsingEntityCardComponent(props) {
  const index = props.index;

  let form_value = props.formik_object.values;

  const [IsOpen, setIsOpen] = useState(false);
  const [Iscurrent, setIscurrent] = useState(
    form_value.entities[index]?.isCurrent
      ? form_value.entities[index]?.isCurrent
      : false
  );

  const toggle_current = () => {
    setIscurrent((prevstate) => {
      props.formik_object.values.entities[index].end_date = "";
      props.formik_object.values.entities[index].isCurrent = !prevstate;
      return !prevstate;
    });
    console.log(`formik_object`, props.formik_object);
  };

  return (
    <div>
      <Card className="mt-1 enty_card">
        <CardHeader
          className="session_card_head box_header p-0 d-flex m-0"
          style={
            IsOpen
              ? {
                  borderColor: "rgb(38, 173, 203)",
                  borderWidth: ".1px",
                }
              : { borderWidth: "0px" }
          }
        >
          <div className="header_forms  mx-lg-3 ">
            <Container>
              <Row className="justify-content-start mt-2">
                <Col lg="8" className="pr-lg-1 px-2">
                  <div className="form-group mb-1" style={{ width: "100%" }}>
                    <label
                      htmlFor={`entities[${index}].entity_name`}
                      className="form_text mb-1"
                    >
                      {`entity ${index + 1} name`}{" "}
                    </label>
                    {/* <Field name={`entities[${index}].entity_name`} className="form-control in_field" >
                                            <Field name={`university_${index}`} className="form-control in_field" >
                                        </Field> */}
                    {props.entities && (
                      <Field
                        name={`entities[${index}].entity_name`}
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
                              components={{ MenuList }}
                              filterOption={createFilter({
                                ignoreAccents: false,
                              })} // this makes all the difference!
                              defaultInputValue={
                                form.values.entities[index].name &&
                                form.values.entities[index].name
                              }
                              onChange={(newValue, actionMeta) => {
                                setFieldValue(
                                  `entities[${index}].entity_name`,
                                  newValue
                                );
                              }}
                              options={props.entities ? props.entities : []}
                            />
                          );
                        }}
                      </Field>
                    )}
                  </div>
                </Col>

                <Col lg="4" className="pl-lg-1 px-2">
                  <div className="form-group mb-1" style={{ width: "100%" }}>
                    <label
                      htmlFor={`entities[${index}].job_title`}
                      className="form_text mb-1"
                    >
                      {" "}
                      job title{" "}
                    </label>
                    <Field
                      name={`entities[${index}].job_title`}
                      className="form-control in_field mb-3 mb-lg-0"
                    ></Field>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          <div className=" header_buttons">
            <div
              className="header_addinfo_button noselect "
              onClick={() => setIsOpen(!IsOpen)}
            >
              <FontAwesomeIcon
                icon={faChevronCircleDown}
                className="pt-lg-0 pb-1 add_info_icon"
              />
              <div
                className="add_info_text"
                style={{
                  fontSize: "10px",
                  marginTop: "5px",
                  textAlign: "center",
                  width: "80%",
                }}
              >
                add more info
              </div>
            </div>

            <div
              className="header_delete_button"
              style={{}}
              onClick={() => props.remove(index)}
            >
              <FontAwesomeIcon icon={faTrashAlt} className="pt-1" />
            </div>
          </div>
        </CardHeader>

        <Collapse
          isOpen={IsOpen}
          style={{
            borderColor: "rgb(38, 173, 203)",
            borderStyle: "dashed",
            borderWidth: "1.5px",
            borderTopWidth: "0px",
          }}
        >
          <CardBody>
            <Container row>
              <Row>
                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                  <div
                    htmlFor={`entities[${index}].country`}
                    className="card_body_labels mb-1"
                  >
                    country
                  </div>
                </Col>

                <Col sm={9}>
                  <Field
                    name={`entities[${index}].country`}
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
                            console.log(form.values);
                          }}
                          onBlur={(val) =>
                            setFieldTouched(`entities[${index}].country`)
                          }
                          onChange={(val) => {
                            setFieldValue(`entities[${index}].country`, val);
                          }}
                        />
                      );
                    }}
                  </Field>
                </Col>

                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                  <div
                    htmlFor={`entities[${index}].country`}
                    className="card_body_labels mb-1"
                  >
                    region/city
                  </div>
                </Col>

                <Col sm={9}>
                  <Field
                    name={`entities[${index}].region`}
                    className="form-control in_field"
                  >
                    {({ form, field }) => {
                      const { setFieldValue } = form;
                      const value = field.value;
                      return (
                        <RegionDropdown
                          country={form.values.entities[index].country}
                          style={{ width: "100%" }}
                          className="in_field form-control"
                          value={value}
                          countryValueType="short"
                          onChange={(val) =>
                            setFieldValue(`entities[${index}].region`, val)
                          }
                        />
                      );
                    }}
                  </Field>
                </Col>

                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                  <div
                    htmlFor={`entities[${index}].start_date`}
                    className="card_body_labels mb-1"
                  >
                    Start date
                  </div>
                </Col>
                <Col sm={9}>
                  {/* <Field name={`entities[${index}].major`} className="form-control in_field" >
                                    </Field> */}
                  <Field
                    name={`entities[${index}].start_date`}
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
                          id={`entities[${index}].start_date`}
                          {...field}
                          selected={value}
                          dateFormat="MM/yyyy"
                          showMonthYearPicker
                          onChange={(val) =>
                            setFieldValue(`entities[${index}].start_date`, val)
                          }
                        />
                      );
                    }}
                  </Field>
                </Col>

                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                  <div
                    htmlFor={`entities[${index}].end_date`}
                    className="card_body_labels mb-1"
                  >
                    End date
                  </div>
                </Col>
                <Col sm={9}>
                  {/* <Field name={`entities[${index}].major`} className="form-control in_field" >
                                    </Field> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    {!Iscurrent && (
                      <Field
                        name={`entities[${index}].end_date`}
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
                              id={`entities[${index}].end_date`}
                              {...field}
                              selected={value}
                              dateFormat="MM/yyyy"
                              showMonthYearPicker
                              onChange={(val) =>
                                setFieldValue(
                                  `entities[${index}].end_date`,
                                  val
                                )
                              }
                            />
                          );
                        }}
                      </Field>
                    )}
                    <Button
                      color={Iscurrent ? "success" : "secondary"}
                      onClick={toggle_current}
                      style={{
                        width: Iscurrent ? "100%" : "100px",
                        transition: "width 1s",
                        marginLeft: "auto",
                      }}
                    >
                      current
                    </Button>
                  </div>
                </Col>

                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                  <div
                    htmlFor={`entities[${index}].department`}
                    className="card_body_labels mb-1"
                  >
                    department
                  </div>
                </Col>
                <Col sm={9}>
                  <Field
                    name={`entities[${index}].department`}
                    className="form-control in_field"
                  >
                    {/* <Field name={`university_${index}`} className="form-control in_field" > */}
                  </Field>
                </Col>

                <Col sm={3} className="d-flex justify-content-md-end pr-0">
                  <div
                    htmlFor={`entities[${index}].linkedin`}
                    className="card_body_labels mb-1"
                  >
                    entity linkedin page URL
                  </div>
                </Col>
                <Col sm={9}>
                  <Field
                    name={`entities[${index}].linkedin`}
                    className="form-control in_field"
                  >
                    {/* <Field name={`university_${index}`} className="form-control in_field" > */}
                  </Field>
                </Col>
              </Row>
            </Container>
          </CardBody>
        </Collapse>
      </Card>
    </div>
  );
}

export default CollapsingEntityCardComponent;
