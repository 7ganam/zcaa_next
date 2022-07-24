import React, { Fragment, useState } from "react";
import { useFormik, Field, FormikProvider } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";

// import EditorComponent from "./EditorComponent/EditorComponent"
const EditorComponent = dynamic(
  () => import("./EditorComponent/EditorComponent"),
  {
    ssr: false,
  }
);
// import "./News_form.css"
import DateView from "react-datepicker";
import ReactLoading from "react-loading";
import { Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

export default function News_form() {
  const [Sending_data, setSending_data] = useState(false);
  const [FetchError, setFetchError] = useState("");
  const [SubmitFailed, setSubmitFailed] = useState(false);
  const [SubmitSuccessed, setSubmitSuccessed] = useState(false);
  const [EditorData, setEditorData] = useState();

  const { User } = useContext(AuthContext);

  const news_post_submit_handler = async (data) => {
    try {
      setSending_data(true);
      // -----  sending the json data -----

      const response = await fetch(
        // ${process.env.NEXT_PUBLIC_BACKEND_URL}
        `/api/news/new_post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: this.context.token ? ('Bearer ' + this.context.token) : ""
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setSubmitFailed(true);
        setSending_data(false);
        throw new Error(responseData.message);
      }
      setSending_data(false);
      setSubmitFailed(false);
      setSubmitSuccessed(true);
    } catch (err) {
      setSending_data(false);
      setFetchError(err.message || "something went wrong");
    }
  };

  const formik = useFormik({
    initialValues: {
      Title: "",
      thumbnail_text: "",
      Date: new Date(),
    },
    validationSchema: Yup.object({
      Title: Yup.string()
        .min(10, "Must be at least 10 characters ")
        .required("Required"),
      thumbnail_text: Yup.string()
        .min(10, "Must be at least 10 characters ")
        .required("Required"),
      Date: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const news_data = { meta_values: values, EditorData: EditorData };
      news_post_submit_handler(news_data);
    },
  });

  if (!!User && User.admin) {
    return (
      <Fragment Fragment>
        {Sending_data ? (
          <div
            style={{
              height: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ marginTop: "px", position: "relative", top: "-10%" }}>
              <ReactLoading type={"spin"} color={"#00D2F9"} width={"10vw"} />
            </div>
          </div>
        ) : SubmitSuccessed ? (
          <div
            style={{
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: "100px" }}>
              {/* <i class="far fa-check-circle"></i> */}
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="pt-lg-0 pb-1 add_info_icon"
              />
            </div>
            <div style={{ fontSize: "60px", textAlign: "center" }}>
              {" "}
              post created successfully
            </div>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="form_entry">
              {!!FetchError && (
                <Alert
                  color="danger"
                  className="mt-3"
                  style={{ width: "100%" }}
                >
                  {FetchError}
                </Alert>
              )}
              <div className="label_div" style={{}}>
                <label className="meta_label" htmlFor="Title">
                  Title
                </label>
              </div>

              <div className="input_div" style={{}}>
                <textarea
                  className="meta_input"
                  id="Title"
                  name="Title"
                  rows="2"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Title}
                />
              </div>

              {formik.touched.Title && formik.errors.Title ? (
                <div className="form_error_text">{formik.errors.Title}</div>
              ) : null}
            </div>

            <div className="form_entry">
              <div className="label_div" style={{}}>
                <label className="meta_label" htmlFor="thumbnail_text">
                  Thumbnail text
                </label>
                <span style={{ fontSize: "11px" }}>
                  {
                    " (the text that appears in the posts card .. it's usually the first paragraph of the post"
                  }
                </span>
              </div>

              <div className="input_div" style={{}}>
                <textarea
                  className="meta_input"
                  id="thumbnail_text"
                  name="thumbnail_text"
                  rows="6"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.thumbnail_text}
                />
              </div>
              {formik.touched.thumbnail_text && formik.errors.thumbnail_text ? (
                <div className="form_error_text">
                  {formik.errors.thumbnail_text}
                </div>
              ) : null}
            </div>

            <div className="form_entry">
              <div className="label_div" style={{}}>
                <label className="meta_label" htmlFor="Title">
                  Date
                </label>
              </div>
              <FormikProvider value={formik}>
                <Field name={`Date`} className="form-control in_field">
                  {({ form, field }) => {
                    const { setFieldValue } = form;
                    const { value } = field;
                    return (
                      <DateView
                        className="form-control in_field"
                        style={{
                          textAlign: "end",
                          zIndex: "1",
                        }}
                        dateFormat="dd/MM/yyyy"
                        id={`Date`}
                        {...field}
                        selected={value}
                        onChange={(val) => {
                          setFieldValue(`Date`, val);
                        }}
                      />
                    );
                  }}
                </Field>
              </FormikProvider>
            </div>
            <div className="form_entry">
              <div className="label_div" style={{ marginTop: "60px" }}>
                <label className="meta_label" htmlFor="Title">
                  The Post
                </label>
              </div>
              <EditorComponent
                pass_data_up={setEditorData}
                style={{ marginTop: "100px" }}
              />
            </div>
            <div className="form_entry">
              {!!FetchError && (
                <Alert
                  color="danger"
                  className="mt-3"
                  style={{ width: "100%" }}
                >
                  {FetchError}
                </Alert>
              )}
              <button
                style={{ marginBottom: "100px", marginTop: "50px" }}
                type="submit"
                className="btn btn-primary"
                disabled={!formik.isValid}
              >
                {!formik.isValid ? "form data not valid" : "Submit"}
              </button>
            </div>
          </form>
        )}
      </Fragment>
    );
  } else {
    return <div></div>;
  }
}
