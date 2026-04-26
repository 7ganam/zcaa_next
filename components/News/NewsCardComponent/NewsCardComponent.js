import React, { useContext, useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { AuthContext } from "../../../contexts/AuthContext";
import styles from "./NewsCardComponent.module.css";

const FALLBACK_NEWS_IMAGE = "/logo.png";

function NewsCardComponent(props) {
  const [DeletedSuccess, setDeletedSuccess] = useState(false);

  const [modal, setModal] = useState(false);

  const { User } = useContext(AuthContext);
  const toggle = () => setModal(!modal);

  const delete_this_post = () => {
    fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL +
        "/api/news/news_posts/" +
        props.post._id,
      { method: "DELETE" }
    )
      .then(async (response) => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = data?.message || response.status;
          throw error;
        }

        setDeletedSuccess(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const blocks = props.post?.EditorData?.blocks || [];

  let thumbnailImage = FALLBACK_NEWS_IMAGE;
  for (const index in blocks) {
    if (blocks[index].type === "imageTool" && blocks[index].data.file) {
      thumbnailImage = blocks[index].data.file.url;
      break;
    } else if (blocks[index].type === "image") {
      thumbnailImage = blocks[index].data.url;
      break;
    }
  }

  const title = props.post.meta_values[0].Title;
  const thumbnailText = props.post.meta_values[0].thumbnail_text;
  const category = "general";
  const newsDate = props.post.meta_values[0].Date;
  const handleThumbnailError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_NEWS_IMAGE;
    event.currentTarget.alt = "ZCAA logo";
    event.currentTarget.style.objectFit = "contain";
    event.currentTarget.style.padding = "24px";
  };

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{ backgroundColor: "white" }}
      >
        <ModalHeader toggle={toggle}>
          Are you suer you want to delete this post
        </ModalHeader>
        <ModalBody>{title}</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={() => {
              delete_this_post();
              toggle();
            }}
          >
            Yes Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {DeletedSuccess ? (
        <Alert color="danger" className="mt-3" style={{ width: "100%" }}>
          Deleted post
        </Alert>
      ) : (
        <article className={styles.card}>
          <Link href={`/NEWS/${props.post._id}`} className={styles.image_link}>
            <img
              src={thumbnailImage}
              alt={title || "ZCAA news"}
              onError={handleThumbnailError}
              className={styles.card_image}
            />
          </Link>

          <div className={styles.card_body}>
            <div className={styles.meta_row}>
              <span>{category}</span>
              <span>{moment(newsDate).format("DD MMM YYYY")}</span>
            </div>

            <Link href={`/NEWS/${props.post._id}`} className={styles.title_link}>
              <h2>{title}</h2>
            </Link>

            {thumbnailText && (
              <p className={styles.excerpt}>{thumbnailText}</p>
            )}

            <div className={styles.card_footer}>
              {!!User && User.admin && (
                <div className={styles.admin_actions}>
                  <Button color="danger" size="sm" onClick={toggle}>
                    Delete
                  </Button>
                  <span>admin action</span>
                </div>
              )}

              <Link href={`/NEWS/${props.post._id}`} className={styles.read_more}>
                <span>Read story</span>
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  className={styles.read_more_icon}
                />
              </Link>
            </div>
          </div>
        </article>
      )}
    </div>
  );
}

export default NewsCardComponent;
