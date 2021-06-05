

import React, { Component, Fragment } from 'react'
import { Container, Row, Col } from 'reactstrap';
import ReactLoading from 'react-loading';
import NewsCardComponenet from "../../components/News/NewsCardComponenet/NewsCardComponenet"
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsComponent from '../../components/News/NewsComponent'



function NEWS(props) {
    return (
        <NewsComponent {...props} />
    )
}

export default NEWS



export async function getStaticProps(context) {

    console.log(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/news/news_posts')
    let data;
    let error;
    const fetchCourses = async () => {
        console.log(process.env.NEXT_PUBLIC_BACKEND_URL)
        return fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/news/news_posts')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                    error = 'Something went wrong';
                }
            })
            .then((responseJson) => {
                data = responseJson;

            })
            .catch((error) => {
                console.log(error)
                error = (error || "something went wrong")
            });
    }

    await fetchCourses();

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            news_state: {
                NewsFetchedSuccessfully: !error,
                News: data
            }

        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
    }
}




