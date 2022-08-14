import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Collapse, Button, CardBody, Card } from "reactstrap";
import styles from "./ExperienceCard.module.css";
function ExperienceCard(props) {
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
            <img src="/tiny_shield.svg" alt="SVG as an image" />
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

export default ExperienceCard;
