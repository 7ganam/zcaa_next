import React from 'react'
import LoginComponent from '../components/application/LoginComponent'
const { fetch_all_experience_fields } = require('../contollers/experienceField_controller')
const { fetch_all_entities } = require('../contollers/entity_controller')
const { fetch_all_unies } = require('../contollers/university_controller')



function APPLICATION(props) {
    return (
        <div>
            <LoginComponent
                exp_fields={props && props.exp_fields && JSON.parse(props.exp_fields)}
                unies={props && props.unies && JSON.parse(props.unies)}
                entities={props && props.entities && JSON.parse(props.entities)}
            />
        </div>
    )
}
export default APPLICATION



export async function getStaticProps(context) {

    let exp_fields;
    let unies;
    let entities;
    let error;

    try {
        exp_fields = await fetch_all_experience_fields()
        entities = await fetch_all_entities()
        unies = await fetch_all_unies()
    }
    catch (dev_error) {
        console.log(`error fetching`, dev_error)
        // throw new Error('Something went wrong');
        // error = 'Something went wrong';
    }


    let exp_fields_string = JSON.stringify(exp_fields.reverse())
    let entities_string = JSON.stringify(entities.reverse())
    let unies_string = JSON.stringify(unies.reverse())


    return {
        notFound: false, // draw the page even if the fetch failed
        props: {
            exp_fields: exp_fields_string,
            entities: entities_string,
            unies: unies_string,
        },
        revalidate: 1, // In seconds
    }
}