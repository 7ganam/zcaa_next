import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useMemo } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import ExperienceCard from "./ExperienceCard/ExperienceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./ExperienceFieldsSection.module.css";

const generateExFieldsWithUsers = (users) => {
  let exFieldsWithUsers = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    for (let j = 0; j < user.experience_field.length; j++) {
      let experienceField = user.experience_field[j];
      let title = experienceField.label;
      let id = experienceField._id;
      let ExFieldEntryIndex = exFieldsWithUsers.findIndex(
        (entry) => entry._id === id
      );
      if (ExFieldEntryIndex === -1) {
        exFieldsWithUsers.push({
          _id: id,
          title,
          count: 1,
          users: [user],
        });
      } else {
        exFieldsWithUsers[ExFieldEntryIndex].count =
          exFieldsWithUsers[ExFieldEntryIndex].count + 1;
        exFieldsWithUsers[ExFieldEntryIndex].users.push(user);
      }
    }
  }
  let sortedExFieldsWithUsers = exFieldsWithUsers.sort(
    (a, b) => b.count - a.count
  );
  return sortedExFieldsWithUsers;
};
export default function ExperienceFieldsSection({ users }) {
  const [limit, setLimit] = useState(30);

  let ExFieldsWithUsers = useMemo(
    () => generateExFieldsWithUsers(users),
    [users]
  );

  let renderExFieldsCards = (ExFieldsWithUsers) => {
    let view = ExFieldsWithUsers.map((entry) => {
      return (
        <Col key={entry._id} sm={6} md={4} style={{ marginBottom: "6px" }}>
          <ExperienceCard
            title={entry.title}
            body={"Anim pariatur cliche reprehenderit, enim eiusmod high life"}
            users={entry.users}
          ></ExperienceCard>
        </Col>
      );
    });

    return view;
  };

  return (
    <section className={styles.alumni_section}>
      <Container id="mission_vision_container">
        <div className={styles.section_intro}>
          <div className={styles.eyebrow}>Expertise</div>
          <h2>ZC Alumni’s Experience Fields</h2>
          <p>Browse the disciplines and industries represented in the alumni network.</p>
        </div>
        <Row className={styles.cards_row}>
          <Col md="12">
          </Col>
          {renderExFieldsCards(ExFieldsWithUsers.slice(0, limit))}
          <div className={styles.actions}>
            <Button
              className={styles.action_button}
              onClick={() => {
                setLimit((oldLimit) => {
                  return oldLimit + 30;
                });
              }}
            >
              <FontAwesomeIcon
                style={{ position: "relative", top: "4px", marginRight: "4px" }}
                icon={faArrowDown}
                className="pt-lg-0 pb-1 add_info_icon"
              />{" "}
              Show more
            </Button>
            <Button
              className={styles.action_button}
              onClick={() => {
                setLimit(30);
              }}
            >
              Show Less{" "}
              <FontAwesomeIcon
                style={{ position: "relative", top: "3px", marginLeft: "4px" }}
                icon={faArrowUp}
                className="pt-lg-0 pb-1 add_info_icon"
              />
            </Button>
          </div>
        </Row>
      </Container>
    </section>
  );
}
