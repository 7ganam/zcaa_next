
import React from 'react'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormComponent from './FormComponent/FormComponent'
import { useHttpClient } from '../../hooks/simple-http-hook'
import { useState, useCallback, useEffect } from 'react';
import { LoginContext } from "../../contexts/loginContext"
import { useContext } from "react";
import ReactLoading from 'react-loading';
import styles from './ChangeProfileComponent.module.css'
import axios from 'axios';



export default function ChangeProfileComponent(props) {

    //LOGIN CONTEXT
    const { User: loggedInUser, login, IsLoggedIn, Token } = useContext(LoginContext);




    // GOOGLE submit variables , states , and handler
    const [FormData, setFormData] = useState(null) // form data will be saved here once submited
    const [Sending_data, setSending_data] = useState(false);
    const [Fetch_success, setFetch_success] = useState(false);
    const [Form_response, setForm_response] = useState({});

    const submit_applicant = async (form_data) => {

        console.log(form_data)


        try {
            setSending_data(true) // to show rotating spinner 

            let form_state = form_data;

            const response = await axios.put(`/api/user/${loggedInUser._id}`,
                {
                    form_state,
                    token: Token
                }
                , {
                    headers: { 'Content-Type': 'application/json', 'authorization': `bearer ${Token}` }
                }
            );
            console.log('response', response);

            setSending_data(false)
            // setForm_response(response.data)

            // // if success log in the user again
            // if (response.data.message === "success") {
            //     setFetch_success(true)
            //     login(response.data.user, response.data.token, response.data.expirateion_date_string, true)
            //     alert('data updated')
            // }


        } catch (error) {
            setSending_data(false)
            console.log(error);
        }


    }


    //FORM submit handler
    let submit_form = (form_data) => {
        console.log(form_data)
        setFormData(form_data)
        submit_applicant(form_data)

    }




    //FETCH FORM INIT DATA , helper-functions and hooks -> for setting Form init values
    let init_values = {
        birth_date: '',
        first_name: '', last_name: '', email: '', exp_field: '', residency: { country: "", region: "" }, content: '', phone: '', address: '', zc_id: '', grad_year: '', major: '', minor: '', other_undergraduate_data: '', universities: [{}], entities: [{}]
    } // empty initial values to compensate for any unfilled data in the user profile
    const { isLoading: UserIsLoading, error: UserError, sendRequest: sendUserRequest, clearError: clearUserError } = useHttpClient();
    const [LoadedUser, setLoadedUser] = useState(null); //define a new state
    const map_fetched_data_to_form_data = (Fetched_user_data) => {

        if (Fetched_user_data.birth_date) { Fetched_user_data.birth_date = new Date(Fetched_user_data.birth_date) }

        if (Fetched_user_data.universities) {
            Fetched_user_data.universities.map(uni => {
                let new_uni = {}
                if (uni.grad_date) {
                    uni.grad_date = new Date(uni.grad_date) //turn the date string into date object
                }
                uni.uni_name = { _id: uni.uni_ref[0]._id, name: uni.uni_ref[0].name, value: uni.uni_ref[0]._id, label: uni.uni_ref[0].name, __v: uni.uni_ref[0]?.__v } // makeing sure the uni will be in the same form as new created unis from the form and stored in formik state
                return (new_uni)
            })
        }

        if (Fetched_user_data.entities) {
            Fetched_user_data.entities.map(entity => {
                if (entity.start_date) {
                    entity.start_date = new Date(entity.start_date)
                }
                if (entity.end_date) {
                    entity.end_date = new Date(entity.end_date)
                }
                entity.entity_name = { _id: entity.entity_ref[0]._id, name: entity.entity_ref[0].name, value: entity.entity_ref[0]._id, label: entity.entity_ref[0].name, __v: entity.entity_ref[0]?.__v }
                return (entity)
            })
        }

        if (Fetched_user_data.experience_field) {
            Fetched_user_data.exp_field = Fetched_user_data.experience_field // it's called exp_field in the front end and experience_field in the backend
            Fetched_user_data.exp_field.map((field) => {
                field.value = field._id
                return field;
            })
        }

        return Fetched_user_data

    } //helper function to map backend data format to the format used in the front-end form
    const fetchUser = useCallback(
        async (id) => {
            try {

                const responseData = await sendUserRequest(`/api/user/${id}`);
                let Fetched_user_data = responseData.user
                let fixed_Fetched_user_data = map_fetched_data_to_form_data(Fetched_user_data)
                let form_init_data = Object.assign(init_values, fixed_Fetched_user_data)
                console.log(`form_init_data`, form_init_data)
                setLoadedUser(form_init_data);
            } catch (err) {
                console.log({ err })
            }

        },
        [sendUserRequest],
    );
    useEffect(() => {
        if (!!loggedInUser) {
            console.log(loggedInUser)
            fetchUser(loggedInUser._id)
        }
    }, [loggedInUser])


    // MAIN VIEW CONDITIONS
    const conditional_view = () => {
        if (!IsLoggedIn) {
            return (<div>you are not logged in</div>)
        }
        else if (LoadedUser) {
            return (
                <>
                    <Container fluid style={{ background: "rgba(164, 223, 234, 0.15)", minHeight: "80vh", padding: '0' }}>
                        <FormComponent {...props} init_values={LoadedUser}
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
        else {
            return (
                <div id="loading_spinner" className={styles.loading_spinner}  >
                    <div style={{ marginTop: "100px", minHeight: "100vh" }}>
                        <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />
                    </div>
                </div>
            )

        }
    }


    return (
        <React.Fragment>
            {conditional_view()}
        </React.Fragment>
    )
}