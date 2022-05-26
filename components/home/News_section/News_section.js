import React from "react";
import NewsCardComponent from "./NewsCardComponent/NewsCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Col, Row } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "next/link";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";

import styles from "./News_section.module.css";

const render_news_cards = (news_posts) => {
  let first_three_posts = [];
  if (news_posts.length > 3) {
    first_three_posts = news_posts.slice(0, 3);
  } else {
    first_three_posts = news_posts;
  }

  let cards_view = first_three_posts.map((post, index) => {
    if (!post.EditorData) {
      return;
    }
    let thumbnailimage = process.env.NEXT_PUBLIC_BACKEND_URL + "/logo.png";
    if (post.EditorData && post.EditorData.blocks) {
      const blocks = post.EditorData.blocks;
      for (const index in blocks) {
        if (blocks[index].type === "imageTool" && blocks[index].data.file) {
          thumbnailimage = blocks[index].data.file.url;
          break;
        } else if (blocks[index].type === "image") {
          thumbnailimage = blocks[index].data.url;
          break;
        }
      }
    }

    const Title = post.meta_values[0].Title;
    const Date = post.meta_values[0].Date;
    const thumbnail_text = post.meta_values[0].thumbnail_text;

    return (
      <Col key={post._id} xs="9" md="4" className="mt-5">
        <NewsCardComponent
          img={thumbnailimage}
          title={Title}
          body_text={thumbnail_text}
          Date={Date}
          post_id={post._id}
        />
      </Col>
    );
  });

  return cards_view;
};

function News_section(props) {
  return (
    <Container
      id="featured_news_container"
      className=""
      style={{ marginTop: "10px" }}
    >
      <Row>
        <Col xs="12" className="">
          <div
            style={{
              textAlign: "left",
              marginTop: "50px",
              borderTopStyle: "solid",
              borderTopWidth: "0.5px",
              borderTopColor: " #C5BCBC",
            }}
            className={"section_title"}
          >
            featured news
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {props.news && render_news_cards(props.news.reverse())}
      </Row>
    </Container>
  );
}

export default News_section;
