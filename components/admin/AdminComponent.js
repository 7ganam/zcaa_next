import React, { Component, Fragment } from 'react'

import News_form from "./News_form/News_form";



export default class AdminComponent extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Fragment>
                <News_form />
            </Fragment>

        )
    }
}
