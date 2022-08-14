import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useMemo } from "react";

import { Container, Row, Col, Button } from "reactstrap";

import UniversityCard from "./UniversityCard/UniversityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

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
              ZC Alumni’s Visited Universities:
            </div>
          </Col>
          {renderUniversitiesCards(UniversitiesWithUsers.slice(0, limit))}

          {/* <img id='loading' src='/static/img/loading.gif' style='width: 50%' onload='startTimer("333"); alert(1)');' /> */}
        </Row>
        <div
          style={{
            margin: "auto",
            marginTop: "30px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            style={{ margin: "5px" }}
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
            style={{ margin: "5px" }}
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
    </React.Fragment>
  );
}
