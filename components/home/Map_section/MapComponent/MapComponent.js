import React, { useEffect, useState, useRef } from "react";

// import { VectorMap, getMapObject } from "react-jvectormap";
import data from "./country-codes-lat-long-alpha3.json";
import dynamic from "next/dynamic";
import $ from "jquery";

// the vectormap compoenet uses the window object ... hence it should be loaded dynamically

const VectorMap = dynamic(() => import("./lib/components/VectorMap"));

// console.log(`VectorMap`, VectorMap)
const markers2 = [
  { latLng: [52.5, 13.39], name: "Berlin" },
  { latLng: [53.56, 10.0], name: "Hamburg" },
  { latLng: [48.13, 11.56], name: "Munich" },
  { latLng: [50.95, 6.96], name: "Cologne" },
  { latLng: [50.11, 8.68], name: "Frankfurt am Main" },
  { latLng: [48.77, 9.17], name: "Stuttgart" },
  { latLng: [51.23, 6.78], name: "Düsseldorf" },
  { latLng: [51.51, 7.46], name: "Dortmund" },
  { latLng: [51.45, 7.01], name: "Essen" },
  { latLng: [53.07, 8.8], name: "Bremen" },
];

const handleClick = (e, countryCode) => {
  // console.log(data.ref_country_codes)
};

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const [count_array, setcount_array] = useState([]);
  const [countries, setCountries] = useState([]);
  let mapRef = useRef(null);
  // let setmapRef = element => { mapRef = element; console.log(`mapRef`, element) };
  // const mapRef = React.createRef()
  if (typeof window != "undefined") {
    window.jQuery = $;
  }

  let map_ref = null;
  let set_map_ref = (map_input) => {
    map_ref = map_input;
  };
  let test = 44;

  useEffect(() => {
    // fetch countries data here .. only runs when the component mounts

    setTimeout(() => {
      const fetched_countries = [
        { code: "DE", country: "Germany", count: 5 },
        { code: "RU", country: "Russia", count: 7 },
        { code: "US", country: "United States", count: 13 },
        { code: "FR", country: "France", count: 4 },
        { code: "IT", country: "Italy", count: 3 },
        { code: "AU", country: "Austria", count: 2 },
        { code: "EG", country: "Egypt", count: 50 },
      ];
      setCountries(fetched_countries);
      const [markers, count_array] = produce_markers(
        fetched_countries,
        data.ref_country_codes
      );
      setMarkers(markers);
      setcount_array(count_array);
    }, 1000);
  }, []);

  const produce_markers = (countries, data) => {
    const markers = countries.map((entry) => {
      // console.log(data)
      let obj = data.find((obj) => obj.country === entry.country);
      let marker = {
        latLng: [obj.latitude, obj.longitude],
        name: `${entry.count} Alumni in ${obj.country}  `,
      };
      return marker;
    });

    const count_array = countries.map((entry) => {
      // return array of the Alumnis count in each entry of the markers
      return entry.count;
    });
    return [markers, count_array];
  };

  const tip_handler = (e, el, code) => {
    // console.log(el)
    let country_data = countries.find((country) => {
      return country.code == code;
    }); // if the country hovered dont' have Alumni this will be undefined
    // console.log({ country_data })
    // let number_of_alum = countries[code]
    let hoverd_country_name = el.html();
    if (el.html() === "Israel") {
      hoverd_country_name = "Palestine";
    }

    let hovered_country = countries.find((c) => c.code == code);
    //  el.html(el.html()+' (GDP - '+countries[code]+')');
    if (!!country_data) {
      el.html(country_data.count + " Alumni in " + hoverd_country_name);
    } else {
      el.html(hoverd_country_name);
    }
  };

  let change_scale = () => {
    console.log("map_ref", map_ref);
    console.log(`this`, this);
    if (window.innerWidth < 900) {
      var zoomSettings = {
        scale: 1.5,
        lat: 41.91572,
        lng: 12.43812,
        animate: true,
      };
      console.log("map_ref", map_ref);
      // if (map_ref) { mapRef.current.$mapObject.setFocus(zoomSettings); }
      if (map_ref) {
        map_ref.setFocus(zoomSettings);
      }
    }
  };
  function is_browser() {
    return (
      typeof window != "undefined" &&
      window.document &&
      typeof VectorMap != "undefined"
    );
  }

  return (
    <>
      {is_browser() && (
        <>
          <VectorMap
            set_map_ref={set_map_ref}
            // myref={setmapRef}
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
                  values: count_array,
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
export default Map;
