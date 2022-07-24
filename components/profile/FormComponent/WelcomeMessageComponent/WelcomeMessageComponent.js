import React from "react";
import { Container } from "reactstrap";
import { useContext } from "react";

import { AuthContext } from "../../../../contexts/AuthContext";
import styles from "./WelcomeMessageComponent.module.css";

function WelcomeMessageComponent() {
  const { User } = useContext(AuthContext);

  return (
    <>
      <div id="application_success" style={{}}>
        <div style={{ marginBottom: "30px" }}>
          {
            <Container fluid className={styles.wel_container}>
              <div id="login_card" className={styles.wel_card}>
                <div className={styles.wel_card_inner}>
                  <img
                    className={styles.user_image}
                    src={User?.g_picture ?? "/user.png"}
                    alt="logo"
                    // {/* if this is displayed without fetch_success this means its from a login and a token exist */}
                  />

                  <img
                    className={styles.logo_image}
                    src={"/logo.png"}
                    alt="logo"
                  />
                </div>

                <div className={styles.text_div}>
                  <div style={{ color: "gray", marginTop: "30px" }}>
                    Welcome
                  </div>
                  <div>to the family</div>
                </div>
              </div>
            </Container>
          }
        </div>
      </div>
    </>
  );
}

export default WelcomeMessageComponent;
