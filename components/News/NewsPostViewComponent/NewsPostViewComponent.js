import React from "react";
// import EditorComponent from "./EditorComponent/EditorComponent"
import ReactLoading from "react-loading";
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
// import "./NewsPostViewComponent.css"
import styles from "./NewsPostViewComponent.module.css";

import dynamic from "next/dynamic";
const EditorComponent = dynamic(
  () => import("./EditorComponent/EditorComponent"),
  {
    ssr: false,
  }
);

function NewsPostViewComponent(props) {
  console.log(
    `props.post.meta_values[0].Title`,
    props.post.meta_values[0].Title
  );
  return (
    <div>
      {props.post.length === 0 ? (
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
      ) : (
        <>
          <Container>
            <Row className="justify-content-start" style={{}}>
              <Col md={12} style={{ margin: "50px 0px" }}>
                <div
                  id={styles.Post_title}
                  style={{ width: "100%", letterSpacing: "2px" }}
                >
                  {props.post.meta_values[0].Title}
                </div>
              </Col>
              <Col md={2} style={{ position: "" }}>
                <div style={{ position: "sticky", top: "0px" }}>
                  <div id="side_div">
                    <div style={{ margin: "10px 0px" }}>
                      <span>Category: </span>
                      <span style={{ fontSize: "20px", color: "#0091AC" }}>
                        {" "}
                        general
                      </span>
                    </div>
                    <div>
                      <span>date: </span>
                      <span style={{ fontSize: "20px", color: "#0091AC" }}>
                        {" "}
                        {moment(props.post.meta_values[0].Date).format(
                          "DD/MM/YYYY"
                        )}{" "}
                      </span>
                    </div>
                  </div>

                  {props.post.meta_values[0].Title ==
                    "Alumni Gathering 2021 Announcement" && (
                    <div
                      id="side_div side_div2"
                      style={{
                        padding: "1px",
                        marginBottom: "30px",
                        width: "100%",
                        display: "flex",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "100%", display: "flex" }}>
                          <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSeZj88Z8qxjdZWXbRk1CtbnOXaPCAaIt_UCA90I9z1YFASk1A/viewform"
                            className={styles.a_demo_four}
                            style={{ margin: "auto" }}
                          >
                            register now
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col md={8} lg={7} style={{ marginBottom: "40px " }}>
                <EditorComponent post={props.post} />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
}

export default NewsPostViewComponent;
