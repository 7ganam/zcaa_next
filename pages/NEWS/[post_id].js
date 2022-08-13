import { useRouter } from "next/router";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsPostViewComponent from "components/News/NewsPostViewComponent/NewsPostViewComponent";

const {
  fetch_all_news,
  fetch_news_post_by_id,
} = require("../../controllers/news_controller");

function news_post_view(props) {
  return (
    <>
      {props && props.post ? (
        <NewsPostViewComponent post={JSON.parse(props.post)} />
      ) : (
        <div></div>
      )}
    </>
  );
}

export default news_post_view;

export async function getStaticPaths() {
  let data;
  let error;

  try {
    data = await fetch_all_news();
  } catch (dev_error) {
    console.log(error);
    error = error || "something went wrong";
  }

  if (!data) {
    return {
      notFound: true,
    };
  }
  const paths = data.map((post) => ({
    params: { post_id: post._id.toString() },
  }));

  return {
    paths,
    fallback: true, // See the "fallback" section below
  };
}

export async function getStaticProps({ params }) {
  // console.log(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/news/news_posts')
  let data;
  let error;
  let post;
  try {
    post = await fetch_news_post_by_id(params.post_id);
  } catch (dev_error) {
    console.log(`dev_error`, error);
    return {
      notFound: true,
    };
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post: JSON.stringify(post),
    }, // will be passed to the page component as props
  };
}
