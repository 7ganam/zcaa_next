import React, { useState } from "react";
import styles from "./AmountComponent.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AmountComponent(props) {
  const [selected, setselected] = useState(props.init);

  const handleClick = (event) => {
    let id = event.target.id;
    setselected(id);

    // props.formik_object['amount'] = true
    // console.log('state', selected)
    switch (id) {
      case "1":
        props.setFieldValue("amount", "");
        props.setAmountIsOther(true);
        console.log(1);
        break;
      case "2":
        props.setFieldValue("amount", 5);
        props.setAmountIsOther(false);
        console.log(2);

        break;
      case "3":
        props.setFieldValue("amount", 10);
        props.setAmountIsOther(false);
        console.log(3);

        break;
      case "4":
        props.setFieldValue("amount", 50);
        props.setAmountIsOther(false);
        break;
      case "5":
        props.setFieldValue("amount", 100);
        props.setAmountIsOther(false);
        break;
      default:
        props.setAmountIsOther(true);
        console.log(4);

        break;
    }
  };

  return (
    <div className={`${styles.amonunt_wrapper}`}>
      <div
        onClick={handleClick}
        id="1"
        className={
          selected == 1 ? styles.selected_button : styles.amonunt_button
        }
      >
        Other
      </div>
      <div
        onClick={handleClick}
        id="2"
        className={
          selected == 2 ? styles.selected_button : styles.amonunt_button
        }
      >
        5
      </div>
      <div
        onClick={handleClick}
        id="3"
        className={
          selected == 3 ? styles.selected_button : styles.amonunt_button
        }
      >
        10
      </div>
      <div
        onClick={handleClick}
        id="4"
        className={
          selected == 4 ? styles.selected_button : styles.amonunt_button
        }
      >
        50
      </div>
      <div
        onClick={handleClick}
        id="5"
        className={
          selected == 5 ? styles.selected_button : styles.amonunt_button
        }
      >
        100
      </div>
    </div>
  );
}

export default AmountComponent;
