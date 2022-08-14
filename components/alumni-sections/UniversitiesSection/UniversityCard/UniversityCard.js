import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Collapse, Button, CardBody, Card } from "reactstrap";
import styles from "./UniversityCard.module.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
function UniversityCard(props) {
  const [collapse, setCollapse] = useState(false);

  const toggle = () => {
    setCollapse((old) => !old);
  };

  let renderUsers = (users) => {
    let UsersView = users.map((user) => {
      return (
        <div key={user._id} className={styles.image_container}>
          <img
            referrerpolicy="no-referrer"
            className={styles.user_image}
            src={user.g_picture ? user.g_picture : "/user.png"}
            alt="u"
          />
        </div>
      );
    });
    return UsersView;
  };

  return (
    <div>
      <div
        className={styles.card}
        // onMouseEnter={() => setCollapse(true)}
        // onMouseLeave={() => setCollapse(false)}
        onClick={toggle}
      >
        <div className={styles.card_head}>
          <div className={styles.card_head_tip}>
            <FontAwesomeIcon
              style={{ position: "relative", top: "4px", marginRight: "4px" }}
              icon={faUniversity}
              className="pt-lg-0 pb-1 add_info_icon"
            />{" "}
          </div>
          <div className={styles.card_head_text}>
            <div className={styles.card_head_inner_text}>{props.title}</div>
          </div>
        </div>
        <Collapse isOpen={collapse}>
          <Card>
            <CardBody className={styles.card_collapse}>
              {renderUsers(props.users)}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    </div>
  );
}

export default UniversityCard;
