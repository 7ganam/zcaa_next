import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useMemo } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import ExperienceCard from "./ExperienceCard/ExperienceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
    <React.Fragment>
      <img
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          top: 0,
          zIndex: "-2",
        }}
        src={"/about/bg2.png"}
        id="c"
        alt="oval"
      />
      <Container id="mission_vision_container">
        <Row style={{ marginTop: "60px", marginBottom: "10px" }}>
          <Col md="12">
            <div id="mission_header" className={styles.section_header}>
              ZC Alumni’s Experience Fields:
            </div>
          </Col>
          {renderExFieldsCards(ExFieldsWithUsers.slice(0, limit))}
          <div style={{ margin: "auto", marginTop: "30px" }}>
            <Button
              style={{ margin: "5px" }}
              onClick={() => {
                setLimit((oldLimit) => {
                  oldLimit + 30;
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
              style={{ margin: "5px" }}
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
          {/* <img id='loading' src='/static/img/loading.gif' style='width: 50%' onload='startTimer("333"); alert(1)');' /> */}
        </Row>
      </Container>
    </React.Fragment>
  );
}
