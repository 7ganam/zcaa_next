import React, { useState } from "react";
// import "./NewsCardComponenet.css"
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import Link from "next/link";

import { Button } from "reactstrap";
import { Alert } from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { useContext } from "react";
import { LoginContext } from "../../../contexts/loginContext";

function NewsCardComponenet(props) {
  const [IsDeleting, setIsDeleting] = useState(false);
  const [DeletedSuccess, setDeletedSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState(null);

  const [modal, setModal] = useState(false);

  const { Token } = useContext(LoginContext);
  const toggle = () => setModal(!modal);

  const delete_this_post = () => {
    setIsDeleting(true);
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
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        // setStatus('Delete successful');
        setIsDeleting(false);
        setDeletedSuccess(true);
      })
      .catch((error) => {
        setIsDeleting(false);
        setErrorMessage(error);
        console.error("There was an error!", error);
      });
  };

  const blocks = props.post.EditorData.blocks;

  let thumbnailimage = process.env.NEXT_PUBLIC_BACKEND_URL + "/logo.png";
  for (const index in blocks) {
    if (blocks[index].type === "imageTool" && blocks[index].data.file) {
      thumbnailimage = blocks[index].data.file.url;
      break;
    } else if (blocks[index].type === "image") {
      thumbnailimage = blocks[index].data.url;
      break;
    }
  }

  const title = props.post.meta_values[0].Title;
  const thumbnailText = props.post.meta_values[0].thumbnail_text;
  const category = "general";
  const Date = props.post.meta_values[0].Date;

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
        <div id="card_body">
          <div id="card_meta_data">
            <div id="news_card_title">{title}</div>
            <div id="news_card_subData">
              <div>
                <span>Category: </span>
                <span style={{ fontSize: "13px", color: "#0091AC" }}>
                  {" "}
                  {category}
                </span>
              </div>
              <div>
                <span>date: </span>
                <span style={{ fontSize: "13px", color: "#0091AC" }}>
                  {" "}
                  {moment(Date).format("DD/MM/YYYY")}{" "}
                </span>
              </div>
            </div>
            <div id="news_card_thumbnailText">
              <div>{thumbnailText}</div>
            </div>
            <div id="news_card_footer">
              {!!Token && Token.admin && (
                <div style={{}}>
                  <Button color="danger" onClick={toggle}>
                    {" "}
                    Delete
                  </Button>
                  <span style={{ color: "red", marginLeft: "5px" }}>
                    admin action
                  </span>
                </div>
              )}
              <div style={{ flexGrow: "1" }}></div>
              <div className="d-flex ">
                <Link
                  href={`/NEWS/${props.post._id}`}
                  style={{ marginBottom: "15px" }}
                >
                  <a>
                    <button
                      className="read_more_btn"
                      style={{ width: "100%", height: "35px" }}
                    >
                      <div
                        className="zcaa_news_link"
                        style={{ marginLeft: "auto" }}
                      >
                        read more
                        <FontAwesomeIcon
                          icon={faLongArrowAltRight}
                          className="ml-1 pt-1"
                        />
                      </div>
                    </button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div id="card_image">
            <img
              src={thumbnailimage}
              alt="card_image"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsCardComponenet;
