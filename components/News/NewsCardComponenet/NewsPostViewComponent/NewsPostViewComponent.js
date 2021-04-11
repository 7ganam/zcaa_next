import React from 'react'
import EditorComponent from "./EditorComponent/EditorComponent"
import ReactLoading from 'react-loading';
import { Container, Row, Col } from 'reactstrap';
import moment from 'moment';
import "./NewsPostViewComponent.css"

function NewsPostViewComponent(props) {
    console.log("post ports", props)
    // console.log("News", props.news_state.News[0])

    return (
        <div>
            { props.news_state.News.length === 0 ?

                <div style={{ height: "600px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ marginTop: "px", position: "relative", top: "-10%" }}>
                        <ReactLoading type={"spin"} color={"#00D2F9"} width={"10vw"} />
                    </div>
                </div>
                :
                <>
                    <Container>
                        <Row className="justify-content-start" style={{}}>
                            <Col md={12} style={{ margin: "50px 0px", }}>
                                <div id="Post_title" style={{ width: "100%", letterSpacing: '2px' }}>
                                    {props.news_state.News[0].meta_values[0].Title}
                                </div>
                            </Col>
                            <Col md={2} style={{ position: "" }}>
                                <div id="side_div" style={{ position: "sticky", top: '0px' }}>
                                    <div style={{ margin: "10px 0px", }}>
                                        <span>Category: </span>
                                        <span style={{ fontSize: "20px", color: "#0091AC" }}> general</span>
                                    </div>
                                    <div>
                                        <span>date: </span>
                                        <span style={{ fontSize: "20px", color: "#0091AC" }}> {moment(props.news_state.News[0].meta_values[0].Date).format('DD/MM/YYYY')} </span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={8} lg={7} style={{ marginBottom: "40px ", }}>
                                <EditorComponent post={props.news_state.News} />
                            </Col>
                        </Row>
                    </Container>


                </>
            }
        </div>
    )
}

export default NewsPostViewComponent
