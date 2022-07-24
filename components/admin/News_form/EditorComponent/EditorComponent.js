import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./editorJsTools";
import React, { Component, Fragment } from "react";

export default class EditorComponent extends Component {
  constructor(props) {
    super(props);
    this.editorInstance = React.createRef();
    this.handleSave = this.handleSave.bind(this);
  }

  async handleSave() {
    const savedData = await this.editorInstance.save();
    // this.editorInstance.readOnly.toggle();
    this.props.pass_data_up(savedData);
    console.log(savedData);
  }

  render() {
    return (
      <Fragment>
        <div>
          <EditorJs
            className="editorjs"
            instanceRef={(instance) => (this.editorInstance = instance)}
            autofocus={true}
            tools={EDITOR_JS_TOOLS}
            onChange={this.handleSave}
          />
        </div>
      </Fragment>
    );
  }
}
