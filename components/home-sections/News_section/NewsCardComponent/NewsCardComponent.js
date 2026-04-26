import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import Link from "next/link";
import styles from "./NewsCardComponent.module.css";

const FALLBACK_NEWS_IMAGE = "/logo.png";

const NewsCardComponent = (props) => {
  const [imageSrc, setImageSrc] = useState(props.img || FALLBACK_NEWS_IMAGE);
  const isFallbackImage = imageSrc === FALLBACK_NEWS_IMAGE;

  useEffect(() => {
    setImageSrc(props.img || FALLBACK_NEWS_IMAGE);
  }, [props.img]);

  const handleImageError = () => {
    setImageSrc(FALLBACK_NEWS_IMAGE);
  };

  return (
    <article className={styles.news_card}>
      <Link href={`/NEWS/${props.post_id}`} className={styles.image_link}>
        <img
          className={`${styles.card_image} ${
            isFallbackImage ? styles.fallback_img : ""
          }`}
          src={imageSrc}
          alt={isFallbackImage ? "ZCAA logo" : props.title}
          onError={handleImageError}
        />
      </Link>

      <div className={styles.card_body}>
        <div className={styles.card_sub}>
          {moment(props.Date).format("DD MMM YYYY")}
        </div>
        <Link href={`/NEWS/${props.post_id}`} className={styles.title_link}>
          <h3>{props.title}</h3>
        </Link>
        <p className={styles.card_body_text}>{props.body_text}</p>
      </div>
    </article>
  );
};

NewsCardComponent.propTypes = {
  Date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.number,
    PropTypes.string,
  ]),
  body_text: PropTypes.string,
  img: PropTypes.string,
  post_id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  title: PropTypes.string,
};

export default NewsCardComponent;
