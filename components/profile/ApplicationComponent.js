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


export default function ApplicationComponent(props) {

    const [Fetch_success, setFetch_success] = useState(false);
    const [Form_response, setForm_response] = useState({});
    const { login, IsLoggedIn, Token } = useContext(LoginContext);


    let init_values = {
        birth_date: '',
        first_name: '', last_name: '', email: '', exp_field: '', residency: { country: "", region: "" }, content: '', phone: '', address: '', zc_id: '', grad_year: '', major: '', minor: '', other_undergraduate_data: '', universities: [{}], entities: [{}]
    }

    return (
        <React.Fragment>
            {
                IsLoggedIn ?

                    <WelcomMessageComponent Fetch_success={Fetch_success} Response_json_content={Form_response} setFetch_success={setFetch_success} setForm_response={setForm_response} />
                    :
                    // gdata &&
                    <Container fluid style={{ background: "rgba(164, 223, 234, 0.15)", minHeight: "80vh", padding: '0' }}>
                        <FormComponent {...props} init_values={init_values}
                            Fetch_success={Fetch_success}
                            Response_json_content={Form_response}
                            setFetch_success={setFetch_success}
                            setResponse_json_content={setForm_response}
                        />
                    </Container>
            }
        </React.Fragment>
    )
}
