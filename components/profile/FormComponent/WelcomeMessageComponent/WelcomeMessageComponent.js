import React, { useContext } from "react";
import { Container } from "reactstrap";

import { AuthContext } from "../../../../contexts/AuthContext";
import styles from "./WelcomeMessageComponent.module.css";

function WelcomeMessageComponent() {
  const { User } = useContext(AuthContext);

  return (
    <div id="application_success" className={styles.success_page}>
      <div>
        <Container fluid className={styles.wel_container}>
          <div id="login_card" className={styles.wel_card}>
            <div className={styles.eyebrow}>Membership</div>
            <div className={styles.wel_card_inner}>
              <img
                className={styles.user_image}
                src={User?.g_picture ?? "/user.png"}
                alt="logo"
              />

              <img className={styles.logo_image} src={"/logo.png"} alt="logo" />
            </div>

            <div className={styles.text_div}>
              <div>Welcome</div>
              <div>to the family</div>
              <p>Your ZCAA membership profile is connected.</p>
            </div>
          </div>
        </Container>
        </div>
      </div>
  );
}

export default WelcomeMessageComponent;
