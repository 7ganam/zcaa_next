// login proccess flow : 
// on submit the form sends the data back to this login componenet and trigers its show modal function
// on google button clicked the button sends the google credetintals to the login copnente and trigers its send data function
// login in component sends the data to the back end and shows loading component untill the process finishs


import React, { useState } from 'react'
import { Container } from 'reactstrap'
import { useContext } from "react";
import { LoginContext } from "../../contexts/loginContext"
import WelcomMessageComponent from './FormComponent/WelcomMessageComponent/WelcomMessageComponent'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormComponent from './FormComponent/FormComponent'
import SubmitModalComponent from './SubmitModalComponent/SubmitModalComponent';
import axios from 'axios';
import styles from './ApplicationComponent.module.css'
import ReactLoading from 'react-loading';


export default function ApplicationComponent(props) {



    // http states
    const [Sending_data, setSending_data] = useState(false);
    const [Fetch_success, setFetch_success] = useState(false);
    const [Form_response, setForm_response] = useState({});
    const { login, IsLoggedIn, Token } = useContext(LoginContext);

    // google modal states
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    let [gdata, set_gdata] = useState(null)


    const [FormData, setFormData] = useState(null)
    let init_values = {
        birth_date: '',
        first_name: '', last_name: '', email: '', exp_field: '', residency: { country: "", region: "" }, content: '', phone: '', address: '', zc_id: '', grad_year: '', major: '', minor: '', other_undergraduate_data: '', universities: [{}], entities: [{}]
    }

    let submit_form = (form_data) => {
        console.log(form_data)
        setFormData(form_data)
        toggle();
    }






    // submit function -> called when the google auth button in the modal is clicked not when the form submit button is clicked
    const submit_applicant = async (google_data) => {


        try {
            toggle(); // hide the modal
            setSending_data(true) // to show rotating spinner 

            let form_state = FormData;
            let id_token = google_data.tokenObj.id_token
            const body_data = { form_state, google_data }
            const response = await axios.post(`/api/auth/signup`,
                {
                    form_state, google_data
                }
                , {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            console.log(response);

            setSending_data(false)
            setForm_response(response.data)

            // if success log in the user
            if (response.data.message === "success") {
                setFetch_success(true)
                login(response.data.user, response.data.token, response.data.expirateion_date_string, true)
            }
            // if user already registered before show an alarm
            if (response.data.message === "already_applied_before") {
                setFetch_success(true)
                alert('you already signed up before, your data was not updated')
                login(response.data.user, response.data.token, response.data.expirateion_date_string, true)
            }

        } catch (error) {
            setSending_data(false)
            // setError_message(error.message)
            console.log(error);
        }


    }







    const conditional_view = (IsLoggedIn) => {
        if (IsLoggedIn) {
            return (<WelcomMessageComponent Fetch_success={Fetch_success} Response_json_content={Form_response} setFetch_success={setFetch_success} setForm_response={setForm_response} />)
        }
        else if (Sending_data) {
            return (
                <div id="loading_spinner" className={styles.loading_spinner}  >
                    <div style={{ marginTop: "100px" }}>
                        <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <>
                    <SubmitModalComponent submit_applicant={submit_applicant} gdata={gdata} modal={modal} toggle={toggle} />
                    <Container fluid style={{ background: "rgba(164, 223, 234, 0.15)", minHeight: "80vh", padding: '0' }}>
                        <FormComponent {...props} init_values={init_values}
                            Fetch_success={Fetch_success}
                            Response_json_content={Form_response}
                            setFetch_success={setFetch_success}
                            setResponse_json_content={setForm_response}
                            submit_form={submit_form}
                        />
                    </Container>
                </>
            )
        }
    }


    return (
        <div style={{ minHeight: '100vh' }}>
            {
                conditional_view(IsLoggedIn)
            }
        </div>
    )
}
