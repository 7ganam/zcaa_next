import EditorJs from 'react-editor-js';
import { EDITOR_JS_TOOLS } from './editorJsTools'
import React, { Component, Fragment } from 'react'
// import "./EditorComponent.css"

export default class EditorComponent extends Component {
    constructor(props) {
        super(props);
        this.editorInstance = React.createRef();

        this.handleSave = this.handleSave.bind(this);
    }

    async handleSave() {
        const savedData = await this.editorInstance.save();
        // this.editorInstance.readOnly.toggle();
        this.props.pass_data_up(savedData)

    }

    componentDidMount() {
        // this.editorInstance.readOnly.toggle();
    }


    render() {
        return (
            <Fragment>
                <div>
                    <EditorJs className="editorjs"
                        data={this.props.post.EditorData}
                        readOnly={true}
                        instanceRef={instance => this.editorInstance = instance}
                        autofocus={true}
                        tools={EDITOR_JS_TOOLS}
                        onChange={this.handleSave}
                    />
                </div>

            </Fragment>

        )
    }
}
