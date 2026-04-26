import React from "react";
import NewsCardComponent from "./NewsCardComponent/NewsCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import Link from "next/link";
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
    let thumbnailImage = "/logo.png";
    if (post.EditorData?.blocks) {
      const blocks = post.EditorData.blocks;
      for (const index in blocks) {
        if (blocks[index].type === "imageTool" && blocks[index].data.file) {
          thumbnailImage = blocks[index].data.file.url;
          break;
        } else if (blocks[index].type === "image") {
          thumbnailImage = blocks[index].data.url;
          break;
        }
      }
    }

    const Title = post.meta_values[0].Title;
    const newsDate = post.meta_values[0].Date;
    const thumbnail_text = post.meta_values[0].thumbnail_text;

    return (
      <NewsCardComponent
        key={`${post._id}-${index}`}
        img={thumbnailImage}
        title={Title}
        body_text={thumbnail_text}
        Date={newsDate}
        post_id={post._id}
      />
    );
  });

  return cards_view;
};

function News_section(props) {
  const news = props.news ? [...props.news].reverse() : [];

  return (
    <Container
      id="featured_news_container"
      className={styles.featured_news}
      fluid
    >
      <Container className={styles.featured_news_inner}>
        <div className={styles.section_header}>
          <div>
            <div className={styles.eyebrow}>Latest Dispatches</div>
            <h2>Featured news</h2>
            <p>
              A quick look at the newest stories and announcements from the
              ZCAA community.
            </p>
          </div>
          <Link href="/NEWS" className={styles.view_all}>
            View all news
          </Link>
        </div>

        <div className={styles.cards_grid}>{render_news_cards(news)}</div>
      </Container>
    </Container>
  );
}

export default News_section;
