import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle,
} from 'reactstrap';
import moment from 'moment';
import Link from 'next/link'
import styles from "./NewsCardComponent.module.css"

const NewsCardComponent = (props) => {
    return (
        <div className={styles.news_card}>
            {/* <Link href={`/NEWS/${props.post_id}`} >
                <a> */}
            <Link href={`/NEWS/${props.post_id}`} >
                <a style={{ textDecoration: 'none', color: 'black' }}>
                    <Card style={{ width: "100%", alignItems: "center", height: "460px", minHeight: "460px", filter: 'drop-shadow(-1px 1px 8px rgba(173, 227, 237, 0.6))' }}   >

                        <CardImg top style={{ objectFit: "cover", height: "200px", width: "95%", marginTop: "7px", borderRadius: "12px" }} src={props.img} alt="Card image cap" />
                        <CardBody style={{ width: "100%", position: "relative" }}>
                            <CardTitle tag="h5" style={{ fontSize: "18px" }}>{props.title}</CardTitle>
                            <CardSubtitle id="card_sub" tag="h6" style={{ fontSize: "12px" }} className={"mb-2 text-muted " + styles.card_sub}> {moment(props.Date).format('DD / MMMM / YYYY')}</CardSubtitle>
                            <CardText id="card_body_text" className={styles.card_body_text} style={{ width: "100%", color: "grey" }}>
                                <div>
                                    {props.body_text}
                                </div>
                            </CardText>

                            {/* <Link href={`/NEWS/${props.post_id}`} >
                            <div className="d-flex" >
                                <div style={{ position: "absolute", bottom: "10px", right: "20px" }}>
                                    <div className="zcaa_link" style={{ marginLeft: "auto" }}>
                                        read more
                                        <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                                    </div>
                                </div>
                            </div>
                        </Link> */}
                        </CardBody>
                    </Card>
                </a>
            </Link>
            {/* </a>
            </Link> */}
        </div >
    );
};

export default NewsCardComponent;