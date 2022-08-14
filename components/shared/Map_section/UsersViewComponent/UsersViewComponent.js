import React from "react";
import styles from "./UsersViewComponent.module.css";

const colors = ["#ADE3ED", "#BDD7DB", "#0091AC"];

function UsersViewComponent(props) {
  let isDisplayed = (code) => props.selectedCountries.includes(code);
  let renderCountries = (countriesWithUsers) => {
    let countryUsersView = countriesWithUsers.map((country, index) => {
      return (
        <div
          style={{
            backgroundColor: colors[index % 2],
            display: isDisplayed(country.code) ? "flex" : "none",
          }}
          title={country.code}
          className={`${styles.country_container} tooltip-on-hover`}
          key={country.code}
        >
          {renderUsers(country.users)}
        </div>
      );
    });

    return countryUsersView;
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
      {props?.countriesWithUsers && (
        <div className={styles.container_card}>
          {renderCountries(props.countriesWithUsers)}
        </div>
      )}
    </div>
  );
}

export default UsersViewComponent;
