import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "reactstrap";
import styels from "./AboutComponent.module.css";
import MemberCardComponent from "./MemberCardComponent/MemberCardComponent";
export default function AboutComponent() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [members_views, setmembers_views] = useState(<div>empty</div>);

  useEffect(() => {
    setTimeout(() => {
      const fetched_members = [
        {
          name: "Ahmed Hashem",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Ahmed+Hashem.jpg",
          role: "President",
        },

        {
          name: "Ghadir Allam",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Ghadir.jpg",
          role: "Vice President",
        },

        {
          name: "Mohamed Ashraf",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/mohamed+ashraf.png",
          role: "Financial Vice",
        },

        {
          name: "Amr Mousa ",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Amr+Mousa.jpg",
          role: "Services & Membership Head",
        },

        {
          name: "Eslam AbdelAleem",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Eslam+Abdelaleem.jpg",
          role: "Legislation Head",
        },

        {
          name: "Karima Waly",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Karima+Waly.jpg",
          role: "Human Resources Head",
        },

        {
          name: "Mostafa Ellebody",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/hamad+shokr.png",
          role: "Communication  Head",
        },

        {
          name: "Hossam Tohamy",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Hossam+Tohamy.jpg",
          role: "Activities Head",
        },

        {
          name: "Kareem Raafat",
          image:
            "https://zcaa-bucket2.s3.eu-central-1.amazonaws.com/Kareem+Raafat.jpg",
          role: "Public Relations Head",
        },
      ];
      setMembers(fetched_members);
      let members_views = fetched_members.map((member, index) => {
        let card_color = "#7FD8E9";
        if (index % 2 === 0) {
          card_color = "#7FD8E9";
        } else {
          card_color = "rgb(127 216 233 / 33%)";
        }
        return (
          <Col md="3" className="" key={index}>
            <MemberCardComponent
              background_color={card_color}
              img={member.image}
              name={member.name}
              role={member.role}
            />
          </Col>
        );
      });
      setmembers_views(members_views);
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <React.Fragment>
      <div>
        {/* <img
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
        /> */}
      </div>
      <Container id="mission_vision_container">
        <Row style={{ marginTop: "60px", marginBottom: "10px" }}>
          <Col md="9">
            <span id="mission_header" className={styels.about_header}>
              OUR mission:
            </span>
            <div id="mission_text" className={styels.mission_vison_text}>
              Our mission is supporting Zewail City in its pursuit of excellence
              and building a place for the Alumni to keep ties with their alma
              mater by supporting their needs, elevating their connections, and
              assisting their career’s development. As Zewail City’s alumni
              association, we are intrigued to do our duties as Zewail City’s
              advocates for alumni in Egypt and abroad so all of us can give
              back to our community and country. Moreover, we look forward to
              facilitating alumni engagement in Zewail City and providing
              projects that help in the development of science and technology in
              Egypt. The association also serves as a channel of communication
              representing all alumni with Zewail City’s current students and
              administration to contribute to improve the education and research
              quality. We aspire to inspire young Zewailians and support their
              journey to help them gain the unique ZC spirit that Dr. Zewail
              instilled in each of us.
            </div>
          </Col>

          {/* <img id='loading' src='/static/img/loading.gif' style='width: 50%' onload='startTimer("333"); alert(1)');' /> */}

          <Col md="3" className="d-none d-md-block">
            <img
              style={{
                width: "100%",
                height: "auto",
                position: "sticky",
                top: 0,
              }}
              src={"/logo.png"}
              id="c"
              alt="oval"
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "60px", marginBottom: "10px" }}>
          <Col md="3">
            <img
              style={{
                width: "100%",
                height: "auto",
                position: "sticky",
                top: 0,
              }}
              src={"/logo.png"}
              id="c"
              alt="oval"
            />
          </Col>
          <Col md="9">
            <span id="vision_header" className={styels.about_header}>
              OUR vision:
            </span>

            <div id="mission_text" className={styels.mission_vison_text}>
              {" "}
              The current ZCAA vision follows Ahmed Zewail’s  eagerness to
              contribute to the Egyptian community through propagation of
              knowledge. The motivation that Zewail inspired to the growing ZC
              community was reflected in substantial achievements. Many ZC
              Alumni joined reputable institutions all over the world where
              their knowledge continues to grow. Other Alumni started or joined
              businesses in the Egyptian/Arabic market and expanded their
              experiences. The positivism that many alumni delivered can be best
              promoted through organization and connection. This vision aims to
              utilize the energy and spirit Zewail inspired to us and ensure a
              well-connected powerful ZC community. By establishing supportive
              alumni connections, the network will be sustained and expanded by
              the endeavours of newcomers and people sharing the same mentality.
              A strong ZCAA network will motivate, help and guide students
              directly to achieve their goals. Also, connecting and conveying
              expertise members possess to the Egyptian market and industry.
              This cooperation among talented and enthusiastic ZC alumni will be
              utilized to boost their potential, and hence ZC, nationally and
              globally. The vision’s statement represents the shortcut focus
              members should look up to. Also, a thesis where resources and
              strategies should be deployed to achieve.
            </div>
          </Col>
        </Row>
      </Container>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginTop: "30px" }}>
          <a
            href="./ZCAA_Constitution.pdf"
            download
            className={styels.a_demo_four}
            style={{ margin: "auto" }}
          >
            Download ZCAA Constitution
          </a>
        </div>
      </div>
      <Container
        id="members_container"
        className=""
        style={{ marginBottom: "100px" }}
      >
        <Row id="header_row">
          <Col xs="12" className="">
            <div
              style={{
                textAlign: "left",
                marginTop: "50px",
                borderTopStyle: "solid",
                borderTopWidth: "0.5px",
                borderTopColor: " #C5BCBC",
                color: "#0091AC",
                marginBottom: "50px",
              }}
              className="section_title"
            >
              members
            </div>
          </Col>
        </Row>
        {!loading ? (
          <Row id="members_cards_row" className="">
            {members_views}
          </Row>
        ) : (
          <p>loading...</p>
        )}
      </Container>
    </React.Fragment>
  );
}
