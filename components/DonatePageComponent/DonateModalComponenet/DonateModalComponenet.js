import React, { useState } from 'react'
import { Modal, ModalBody } from 'reactstrap';
import { Container } from 'reactstrap'
// import zc_logo from './zc_logo.png'

import { useContext } from "react";
import { LoginContext } from "../../../contexts/loginContext"
import { Alert } from 'reactstrap';
import ReactLoading from 'react-loading';
import styles from './DonateModalComponenet.module.css'


function DonateModalComponenet(props) {
    const { login, IsLoggedIn, Token, ToggleLoginModal, IsLogInModalShown } = useContext(LoginContext);

    const [modal, setModal] = useState(false);
    const [Response_json_content, setResponse_json_content] = useState({});
    const [Fetch_success, setFetch_success] = useState(false);
    const [Sending_data, setSending_data] = useState(false);
    const [Fetch_error, setFetch_error] = useState(false);
    const [Error_message, setError_message] = useState(null);
    const toggle = props.toggle;






    const submit_applicant = async (google_data) => {
        try {
            // toggle();
            setSending_data(true)
            let id_token = google_data.tokenObj.id_token
            const body_data = { google_data }
            console.log('google_data', google_data)
            const response = await fetch(
                `api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body_data)
            });
            const response_json_content = await response.json()
            if (!response.ok) {
                setFetch_error(true)
                throw new Error(response_json_content.message || "can't login");
            }
            setSending_data(false)
            setResponse_json_content(response_json_content)

            if (response_json_content.message === "success") {
                setFetch_success(true)
                console.log({ response_json_content })
                console.log("test")

                login(response_json_content.user, response_json_content.token, response_json_content.expirateion_date_string, true)
                toggle();
            }
            console.log('google_data2', google_data)

        } catch (err) {
            setSending_data(false)
            setError_message(err.message)
            console.log(err);
        }
    };



    return (
        <div>
            <div id="google_modal" >
                <Modal
                    size="lg" style={{ maxWidth: '1600px', width: '80%', marginRight: "auto", marginLeft: "auto", backgroundColor: 'transparent' }}
                    isOpen={props.isShown} toggle={toggle}>
                    <div style={{}} ></div>
                    <ModalBody style={{ padding: "0px" }} >
                        <div style={{}}>
                            {
                                <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "0px" }}>
                                    <div id="login_card" style={{}}>
                                        <img style={{ width: "130px", height: "auto", opacity: "0.5", marginTop: "70px" }} src={"/logo.png"} alt="logo" />
                                        <div id="login_disclimare" >
                                            <span className="font2">You will be redirected to the payment gate .. please copy the following text and paste it in the comment field in payment website</span>
                                        </div>
                                        <div className={styles.copystring_wrapper}>
                                            <div className={styles.copystring_field} >
                                                {props.DonationString}
                                            </div>
                                            <div className={styles.copystring_button} onClick={() => { navigator.clipboard.writeText(props.DonationString) }} >
                                                <div className={styles.button_text} >Copy text </div>
                                                <img style={{ width: "30px", height: "auto", marginTop: "0px" }} src={"/copy_icon_2.png"} alt="c" />
                                            </div>
                                        </div>
                                        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>

                                            <a href='https://www.zewailcity.edu.eg/main/donate.php?lang=en'>
                                                <button style={{ marginBottom: "100px" }} className={`btn btn-primary ${styles.redirect_button}`} >
                                                    <span style={{ marginRight: '5px' }}>Go to payment webstie</span>
                                                    <img style={{ width: "30px", height: "auto", marginTop: "0px" }} src={"/arrow-right.png"} alt="c" />
                                                </button>
                                            </a>
                                        </div>

                                    </div>
                                </Container>
                            }
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        </div >
    )
}

export default DonateModalComponenet
