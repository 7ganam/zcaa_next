import React from "react";
import PropTypes from "prop-types";
import styles from "./MemberCardComponent.module.css";
export default function MemberCardComponent(props) {
  return (
    <div id="member_card_box" className={styles.member_card_box}>
      <img
        className={styles.member_image}
        src={props.img}
        alt={props.name}
      />
      <div id="name" className={styles.member_name}>
        {props.name}
      </div>
      <div id="role" className={styles.member_role}>
        {props.role}
      </div>
    </div>
  );
}

MemberCardComponent.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
