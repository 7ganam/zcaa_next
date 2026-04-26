import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useMemo } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import UniversityCard from "./UniversityCard/UniversityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import styles from "./UniversitiesSection.module.css";

const generateUniversitiesWithUsers = (users) => {
  let universitiesWithUsers = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    for (let j = 0; j < user.universities.length; j++) {
      let uni = user.universities[j].uni_ref[0];
      let title = uni.name;
      let id = uni._id;
      let ExFieldEntryIndex = universitiesWithUsers.findIndex(
        (entry) => entry._id === id
      );
      if (ExFieldEntryIndex === -1) {
        universitiesWithUsers.push({
          _id: id,
          title,
          count: 1,
          users: [user],
        });
      } else {
        universitiesWithUsers[ExFieldEntryIndex].count =
          universitiesWithUsers[ExFieldEntryIndex].count + 1;
        universitiesWithUsers[ExFieldEntryIndex].users.push(user);
      }
    }
  }
  let sortedUniversitiesWithUsers = universitiesWithUsers.sort(
    (a, b) => b.count - a.count
  );
  return sortedUniversitiesWithUsers;
};
export default function UniversitiesSection({ users }) {
  let step = 12;
  const [limit, setLimit] = useState(step);

  let UniversitiesWithUsers = useMemo(
    () => generateUniversitiesWithUsers(users),
    [users]
  );

  let renderUniversitiesCards = (UniversitiesWithUsers) => {
    let view = UniversitiesWithUsers.map((entry) => {
      return (
        <Col key={entry._id} sm={6} md={3}>
          <UniversityCard
            title={entry.title}
            body={"Anim pariatur cliche reprehenderit, enim eiusmod high life"}
            users={entry.users}
          ></UniversityCard>
        </Col>
      );
    });

    return view;
  };

  return (
    <section className={styles.alumni_section}>
      <Container id="mission_vision_container" className="mb-5">
        <div className={styles.section_intro}>
          <div className={styles.eyebrow}>Academic Footprint</div>
          <h2>ZC Alumni’s Visited Universities</h2>
          <p>Institutions connected to Zewail City alumni study, research, and exchange.</p>
        </div>
        <Row className={styles.cards_row}>
          <Col md="12">
          </Col>
          {renderUniversitiesCards(UniversitiesWithUsers.slice(0, limit))}
        </Row>
        <div className={styles.actions}>
          <Button
            className={styles.action_button}
            onClick={() => {
              setLimit((oldLimit) => {
                return oldLimit + step;
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
              setLimit(step);
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
      </Container>
    </section>
  );
}
