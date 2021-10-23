
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


    const fetchUser = useCallback(
        async (id) => {


            try {


                const responseData = await sendUserRequest(`/api/user/${id}`);
                let Fetched_user_data = responseData.user
                Fetched_user_data.birth_date = new Date(Fetched_user_data.birth_date)
                Fetched_user_data.universities.map(uni => {
                    if (uni.grad_date) {
                        uni.grad_date = new Date(uni.grad_date)
                    }
                    return (uni)
                })

                Fetched_user_data.entities.map(entity => {
                    if (entity.start_date) {
                        entity.start_date = new Date(entity.start_date)
                    }
                    if (entity.end_date) {
                        entity.end_date = new Date(entity.end_date)
                    }
                    return (entity)
                })
                setLoadedUser(Fetched_user_data); //note that the result of http request isn't stored in the hooks inner state but in this components state

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
