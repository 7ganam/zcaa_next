import React, { useEffect, useState, useRef } from "react";

// import { VectorMap, getMapObject } from "react-jvectormap";
import data from "./country-codes-lat-long-alpha3.json";
import dynamic from "next/dynamic";
import $ from "jquery";

// the vectormap compoenet uses the window object ... hence it should be loaded dynamically

const VectorMap = dynamic(() => import("./lib/components/VectorMap"));

// console.log(`VectorMap`, VectorMap)

const handleClick = (e, countryCode) => {
  // console.log(data.ref_country_codes)
};

function is_browser() {
  return (
    typeof window != "undefined" &&
    window.document &&
    typeof VectorMap != "undefined"
  );
}

const generateMapData = (countriesWithUsers) => {
  const markers = countriesWithUsers?.map((entry) => {
    // console.log(data)
    let obj = data.ref_country_codes?.find((obj) => obj.alpha2 === entry.code);
    let marker = {
      latLng: [obj.latitude, obj.longitude],
      name: `${entry.count} Alumni in ${obj.country}  `,
    };
    return marker;
  });

  const countArray = countriesWithUsers?.map((entry) => {
    // return array of the Alumni count in each entry of the markers
    return entry.count;
  });
  return [markers, countArray, countriesWithUsers];
};

const Map = (props) => {
  const [markers, setMarkers] = useState([]);
  const [countArray, setCountArray] = useState([]);

  let mapRef = useRef(null);
  if (typeof window != "undefined") {
    window.jQuery = $;
  }

  let map_ref = null;
  let set_map_ref = (map_input) => {
    map_ref = map_input;
  };

  useEffect(() => {
    const [markers, countArray] = generateMapData(props.countriesWithUsers);
    setMarkers(markers);
    setCountArray(countArray);
  }, [props.countriesWithUsers]);

  const tip_handler = (e, el, code) => {
    // console.log(el)
    let country_data = props.countriesWithUsers.find((country) => {
      return country.code == code;
    }); // if the country hovered dont' have Alumni this will be undefined
    // console.log({ country_data })
    // let number_of_alum = countriesWithUsers[code]
    let hoverd_country_name = el.html();
    if (el.html() === "Israel") {
      hoverd_country_name = "Palestine";
    }

    if (country_data) {
      el.html(country_data.count + " Alumni in " + hoverd_country_name);
    } else {
      el.html(hoverd_country_name);
    }
  };

  return (
    <>
      {is_browser() && (
        <>
          <VectorMap
            onRegionSelected={(e, code, isSelected, selectedRegions) => {
              props.setSelectedCountries(selectedRegions);
            }}
            onMarkerSelected={(e, code, isSelected, selectedMarkers) => {
              props.setSelectedMarkers(selectedMarkers);
            }}
            set_map_ref={set_map_ref}
            ref={mapRef}
            markersSelectable={true}
            markers={markers}
            markerStyle={{
              initial: {
                fill: "#26ADCB",
              },
              selected: {
                fill: "#CA0020",
              },
            }}
            series={{
              markers: [
                {
                  attribute: "r",
                  scale: [5, 8],
                  values: countArray,
                },
              ],
            }}
            onRegionTipShow={tip_handler}
            map={"world_mill"}
            backgroundColor="transparent" //change it to ocean blue: #0077be
            zoomOnScroll={false}
            containerStyle={{
              width: "100%",
              height: "100%",
            }}
            onRegionClick={handleClick} //gets the country code
            containerClassName="map"
            regionStyle={{
              initial: {
                fill: "#c9c2c2",
                "fill-opacity": 0.9,
                stroke: "none",
                "stroke-width": 0,
                "stroke-opacity": 0,
              },
              hover: {
                "fill-opacity": 0.8,
                cursor: "pointer",
              },
              selected: {
                fill: "#2938bc", //color for the clicked country
              },
              selectedHover: {},
            }}
            regionsSelectable={true}
          />
        </>
      )}
    </>
  );
};
export default React.memo(Map);
