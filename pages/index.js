import Head from 'next/head'
import styles from '../components/home/home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react'
import { Container, Col, Row } from 'reactstrap';
// import zewail_image from '/home/assets/zewail_image3.png'
// import grads from '../public/home/assets/grads3.png'

import MapComponent from "../components/home/MapComponent/MapComponent"
import { Card, CardHeader, CardBody, CardTitle, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'next/link';


import useSWR from 'swr'
import dynamic from 'next/dynamic'


import About_section from '../components/home/About_section/About_section'
import News_section from '../components/home/News_section/News_section'
import Welcome_section from '../components/home/Welcom_section/Welcom_section'
// import Map_section from '../components/home/Map_section/Map_section'

const Map_section = dynamic(() => import('../components/home/Map_section/Map_section'), {
  ssr: false
})


export default function Home(props) {
  return (

    <div className={`p-0 ${styles.home_page}`}>

      <About_section />

      <News_section {...props} />

      <Welcome_section />

      <Map_section />


    </div>

  )
}


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