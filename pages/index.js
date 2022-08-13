import Head from "next/head";
import styles from "components/home-sections/home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

import dynamic from "next/dynamic";
const { fetch_all_news } = require("../controllers/news_controller");

import About_section from "components/home-sections/About_section/About_section";
import News_section from "components/home-sections/News_section/News_section";
import Welcome_section from "components/home-sections/Welcom_section/Welcom_section";
// import Map_section from 'components/home/Map_section/Map_section'

const Map_section = dynamic(
  () => import("components/home-sections/Map_section/Map_section"),
  {
    ssr: false,
  }
);

export default function Home(props) {
  return (
    <div className={`p-0 ${styles.home_page}`}>
      <About_section />

      <News_section news={JSON.parse(props.news)} />

      <Welcome_section />

      <Map_section />
    </div>
  );
}

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

  let news_string = JSON.stringify(data);

  return {
    props: {
      news: news_string,
    },
    revalidate: 10, // In seconds
  };
}
