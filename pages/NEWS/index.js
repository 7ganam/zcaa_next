import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactLoading from "react-loading";
import NewsCardComponent from "components/News/NewsCardComponent/NewsCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsComponent from "components/News/NewsComponent";
// import { fetch_all_news } from '../../controllers/news_controller'
const { fetch_all_news } = require("../../controllers/news_controller");

function NEWS(props) {
  return (
    <>
      {props && props.news ? (
        <NewsComponent news={JSON.parse(props.news)} />
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export default NEWS;

export async function getStaticProps(context) {
  let data;
  let error;

  try {
    data = await fetch_all_news();
  } catch (dev_error) {
    console.log(`error fetching`, dev_error);
    throw new Error("Something went wrong");
    error = "Something went wrong";
  }

  if (!data) {
    return {
      notFound: true,
    };
  }

  let news_string = JSON.stringify(data.reverse());
  return {
    props: {
      news: news_string,
    },
    revalidate: 10, // In seconds
  };
}
