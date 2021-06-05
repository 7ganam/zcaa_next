import { useRouter } from 'next/router'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NewsPostViewComponent from '../../components/News/NewsPostViewComponent/NewsPostViewComponent'


function news_post_view(props) {
    console.log(`newsprops`, props)

    return (
        <>
            {
                props && props.news_state ?
                    <NewsPostViewComponent {...props} />
                    :
                    <div></div>
            }
        </>
    )
}

export default news_post_view











export async function getStaticPaths() {

    let data;
    let error;
    const fetchNews = async () => {
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

    await fetchNews();

    if (!data) {
        return {
            notFound: true,
        }
    }

    const paths = data.map((post) => ({
        params: { post_id: post._id },
    }))

    return {
        paths,
        fallback: true // See the "fallback" section below
    };
}











export async function getStaticProps({ params }) {
    console.log(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/news/news_posts')
    let data;
    let error;
    const fetchNews = async () => {
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

    await fetchNews();

    if (!data) {
        return {
            notFound: true,
        }
    }

    console.log(`params.post_id`, params.post_id)
    const post = data.filter((post) => (post._id === params.post_id))
    console.log(`.post`, post)

    return {
        props: {
            news_state: {
                NewsFetchedSuccessfully: !error,
                News: post
            }
        }, // will be passed to the page component as props
    }
}