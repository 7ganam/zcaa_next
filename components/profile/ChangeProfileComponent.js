
import React from 'react'
import { Container } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FormComponent from './FormComponent/FormComponent'
import { useHttpClient } from '../../hooks/simple-http-hook'
import { useState, useCallback, useEffect } from 'react';
import { LoginContext } from "../../contexts/loginContext"
import { useContext } from "react";




export default function ChangeProfileComponent(props) {

    const { User: loggedInUser, login, IsLoggedIn, Token } = useContext(LoginContext);
    const [Fetch_success, setFetch_success] = useState(false);
    const [Form_response, setForm_response] = useState({});


    let init_values = {
        birth_date: '',
        first_name: 'test', last_name: '', email: '', exp_field: [], residency: { country: "", region: "" }, content: '', phone: '', address: '', zc_id: '', grad_year: '', major: '', minor: '', other_undergraduate_data: '', universities: [{}], entities: [{}]
    }


    const { isLoading: UserIsLoading, error: UserError, sendRequest: sendUserRequest, clearError: clearUserError } = useHttpClient(); //loading custom hook inner states and function used to change them
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
        }

        return Fetched_user_data

    }


    const fetchUser = useCallback(
        async (id) => {


            try {


                const responseData = await sendUserRequest(`/api/user/${id}`);
                let Fetched_user_data = responseData.user
                let fixed_Fetched_user_data = map_fetched_data_to_form_data(Fetched_user_data)
                setLoadedUser(fixed_Fetched_user_data); //note that the result of http request isn't stored in the hooks inner state but in this components state

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



    return (
        <React.Fragment>
            {!!LoadedUser ?

                <Container fluid style={{ background: "rgba(164, 223, 234, 0.15)", minHeight: "80vh", padding: '0' }}>
                    <FormComponent {...props} init_values={LoadedUser}
                        Fetch_success={Fetch_success}
                        Response_json_content={Form_response}
                        setFetch_success={setFetch_success}
                        setResponse_json_content={setForm_response}
                    />

                </Container>

                :
                <div>loading...</div>
            }
        </React.Fragment>
    )
}
