import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "reactstrap";
import styles from "./AboutComponent.module.css";
import MemberCardComponent from "./MemberCardComponent/MemberCardComponent";
export default function AboutComponent() {
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
      let members_views = fetched_members.map((member) => {
        return (
          <Col
            md="6"
            lg="4"
            xl="3"
            className={styles.member_col}
            key={member.name}
          >
            <MemberCardComponent
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
    <main className={styles.about_page}>
        <Container className={styles.about_hero}>
          <div>
            <div className={styles.eyebrow}>About ZCAA</div>
            <h1>Built to keep the Zewail City network connected.</h1>
            <p>
              The association gathers alumni energy into a living network of
              support, knowledge exchange, mentorship, and service to Zewail
              City and Egypt.
            </p>
          </div>
          <div className={styles.hero_badge}>
            <img src="/logo.png" alt="ZCAA logo" />
          </div>
        </Container>

        <Container id="mission_vision_container" className={styles.story_stack}>
          <Row className={styles.story_card}>
            <Col lg="8">
              <span id="mission_header" className={styles.about_header}>
                Our mission
              </span>
              <div id="mission_text" className={styles.mission_vison_text}>
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
            <Col lg="4" className={styles.logo_col}>
              <div className={styles.logo_panel}>
                <img src="/logo.png" alt="ZCAA logo" />
              </div>
            </Col>
          </Row>

          <Row className={`${styles.story_card} ${styles.story_card_alt}`}>
            <Col lg={{ size: 4, order: 1 }} className={styles.logo_col}>
              <div className={styles.logo_panel}>
                <img src="/logo.png" alt="ZCAA logo" />
              </div>
            </Col>
            <Col lg={{ size: 8, order: 2 }}>
              <span id="vision_header" className={styles.about_header}>
                Our vision
              </span>

              <div id="mission_text" className={styles.mission_vison_text}>
                The current ZCAA vision follows Ahmed Zewail’s eagerness to
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

        <div className={styles.constitution_wrap}>
          <a
            href="./ZCAA_Constitution.pdf"
            download
            className={styles.a_demo_four}
          >
            Download ZCAA Constitution
          </a>
        </div>

        <Container id="members_container" className={styles.members_container}>
          <div className={styles.members_header}>
            <div className={styles.eyebrow}>Leadership</div>
            <h2>Members</h2>
            <p>
              Meet the team stewarding alumni services, engagement, and the
              association’s next chapter.
            </p>
          </div>
        {loading ? (
          <p className={styles.loading_text}>loading...</p>
        ) : (
          <Row id="members_cards_row" className={styles.members_grid}>
            {members_views}
          </Row>
        )}
        </Container>
      </main>
  );
}
