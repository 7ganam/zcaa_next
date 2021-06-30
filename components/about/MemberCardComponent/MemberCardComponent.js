import React from 'react'
import styles from './MemberCardComponent.module.css'
export default function MemberCardComponent(props) {
    return (
        <div id="member_card_box" className={styles.member_card_box} style={{
            backgroundColor: props.background_color,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            position: "relative",
            marginTop: '30px',
            padding: '10px'
        }}>

            <img style={{
                width: "80px",
                height: "80px",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: " 50%",
                objectFit: "cover",
                borderStyle: "solid",
                borderColor: "#3942444a",
                borderWidth: "5px"
            }} src={props.img} alt="personal_image" />
            <div id="name" style={{
                fontSize: "18px",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                fontFamily: "Philosopher",
                fontStyle: "normal",
                fontWeight: "normal",
                marginTop: "5px"
            }}>
                {props.name}
            </div>
            <div id="name" style={{
                color: "#0091AC",
                fontSize: "18px",
                textAlign: "center",
                marginLeft: "auto",
                marginRight: "auto",
                fontFamily: "Philosopher",
                fontStyle: "normal",
                fontWeight: "normal",
                marginTop: "5px"
            }}>
                {props.role}
            </div>
        </div>
    )
}
