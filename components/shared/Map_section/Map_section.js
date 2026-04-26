import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import styles from "./Map_section.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "reactstrap";
import MapComponent from "./MapComponent/MapComponent";
import UsersViewComponent from "./UsersViewComponent/UsersViewComponent";
const generateCountriesWithUsers = (users) => {
  let countriesWithUsers = [];
  for (const user of users) {
    let countryCode = user?.residency?.country;
    if (!countryCode) continue;
    let countryEntryIndex = countriesWithUsers.findIndex(
      (entry) => entry.code === countryCode
    );

    if (countryEntryIndex === -1) {
      countriesWithUsers.push({
        code: countryCode,
        count: 1,
        users: [user],
      });
    } else {
      countriesWithUsers[countryEntryIndex].count =
        countriesWithUsers[countryEntryIndex].count + 1;
      countriesWithUsers[countryEntryIndex].users.push(user);
    }
  }

  return countriesWithUsers;
};

function Map_section({ users }) {
  const [countriesWithUsers, setCountriesWithUsers] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [selectedMarkersAndCountries, setSelectedMarkersAndCountries] =
    useState([]);

  useEffect(() => {
    const formatUsers = async () => {
      try {
        let countriesWithUsers = generateCountriesWithUsers(users);
        if (countriesWithUsers) setCountriesWithUsers(countriesWithUsers);
      } catch (error) {
        console.error("Failed to format users for map", error);
      }
    };

    formatUsers();
  }, [users]);

  useEffect(() => {
    let selectedMarkersCountries = selectedMarkers.map(
      (markerIndex) => countriesWithUsers[markerIndex].code
    );

    let allSelected = selectedCountries.concat(selectedMarkersCountries);
    let allUniqSelected = [...new Set(allSelected)];
    setSelectedMarkersAndCountries(allUniqSelected);
  }, [selectedCountries, selectedMarkers]);

  return (
    <Container id="map_container" className={styles.map_container} fluid>
      <div id="map_wrapper" className={styles.map_wrapper}>
        <MapComponent
          countriesWithUsers={countriesWithUsers}
          setSelectedCountries={setSelectedCountries}
          setSelectedMarkers={setSelectedMarkers}
          users={users}
        />
      </div>
      <div
        style={{
          display: selectedMarkersAndCountries?.length > 0 ? "block" : "none",
        }}
      >
        <UsersViewComponent
          countriesWithUsers={countriesWithUsers}
          selectedCountries={selectedMarkersAndCountries}
        ></UsersViewComponent>
      </div>
    </Container>
  );
}

Map_section.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      residency: PropTypes.shape({
        country: PropTypes.string,
      }),
    })
  ),
};

export default Map_section;
