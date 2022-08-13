import React from "react";

import styles from "./Map_section.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import { Container } from "reactstrap";
import MapComponent from "./MapComponent/MapComponent";
import UsersViewComponent from "./UsersViewComponent/UsersViewComponent";
const generateCountriesWithStudents = (users) => {
  let countriesWithUsers = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
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

function Map_section() {
  const [users, setUsers] = useState([]);
  const [countriesWithUsers, setCountriesWithUsers] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [selectedMarkersAndCountries, setSelectedMarkersAndCountries] =
    useState([]);

  useEffect(() => {
    const FetchUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`
        );
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers.data);
        let countriesWithUsers = generateCountriesWithStudents(
          fetchedUsers.data
        );
        if (countriesWithUsers) setCountriesWithUsers(countriesWithUsers);
      } catch (error) {
        let err = error;
      }
    };

    FetchUsers();
  }, []);

  useEffect(() => {
    let selectedMarkersCountries = selectedMarkers.map(
      (markerIndex) => countriesWithUsers[markerIndex].code
    );

    let allSelected = selectedCountries.concat(selectedMarkersCountries);
    let allUniqSelected = [...new Set(allSelected)];
    setSelectedMarkersAndCountries(allUniqSelected);
  }, [selectedCountries, selectedMarkers]);

  return (
    <>
      (
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
      )
    </>
  );
}

export default Map_section;
