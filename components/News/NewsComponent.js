import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactLoading from "react-loading";
import NewsCardComponent from "./NewsCardComponent/NewsCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";

import styles from "./NewsComponent.module.css";

import dbConnect from "../../utils/dbConnect";
import NewsPosts from "../../models/newsPosts";

var _ = require("lodash");

export default class NewsComponent extends Component {
  constructor(props) {
    super(props);
    this.render_news = this.render_news.bind(this);
  }

  render_news() {
    let posts = this.props.news.map((post, index) => (
      <NewsCardComponent key={post._id} post={post} />
    ));

    return posts;
  }

  render() {
    return (
      <div className={styles.news_wrapper}>
        {/* <img
          style={{
            width: "100%",
            height: "auto",
            position: "absolute",
            top: 0,
            zIndex: "-2",
            overflow: "hidden",
          }}
          src={"/about/bg2.png"}
          id="c"
          alt="oval"
        /> */}
        <Container>
          {Object.keys(this.props.news).length === 0 ? (
            <Row
              style={{
                height: "600px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{ marginTop: "px", position: "relative", top: "-10%" }}
              >
                <ReactLoading type={"spin"} color={"#00D2F9"} width={"10vw"} />
              </div>
            </Row>
          ) : (
            <Row>
              <Col id="categories_col" md={3}>
                <div
                  style={{
                    textAlign: "left",
                    marginTop: "30px",
                    marginBottom: "0px",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "0.5px",
                    borderBottomColor: " #C5BCBC",
                  }}
                  className={styles.category_head}
                >
                  Categories
                </div>
                <div
                  style={{
                    textAlign: "left",
                    marginLeft: "20px",
                    marginTop: "10px",
                    marginBottom: "50px",
                    borderBottomStyle: "solid",
                    borderBottomWidth: "0.5px",
                    borderBottomColor: " #C5BCBC",
                  }}
                  className="category"
                >
                  General
                </div>
              </Col>
              <Col id="news_cards_row" md={9}>
                {this.render_news()}
              </Col>
            </Row>
          )}
        </Container>
      </div>
    );
  }
}
