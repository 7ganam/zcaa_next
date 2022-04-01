// tools.js
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
// import Paragraph from '@editorjs/paragraph'
import List from "@editorjs/list";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Header from "@editorjs/header";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import SimpleImage from "@editorjs/simple-image";
import ImageTool from "@editorjs/image";
import FontSize from "editorjs-inline-font-size-tool";
import Underline from "@editorjs/underline";
import Paragraph from "editorjs-paragraph-with-alignment";

export const EDITOR_JS_TOOLS = {
  underline: Underline,

  fontSize: FontSize,
  embed: Embed,
  table: Table,
  paragraph: {
    class: Paragraph,
    inlineToolbar: [
      "link",
      "marker",
      "bold",
      "italic",
      "underline",
      "fontSize",
    ],
  },
  list: List,
  linkTool: LinkTool,
  image: {
    class: SimpleImage,
    inlineToolbar: true,
    config: {
      placeholder: "Paste image URL",
    },
  },
  header: Header,
  marker: Marker,
  checklist: CheckList,
  imageTool: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:3000/api/news/image_upload", // Your backend file uploader endpoint
        byUrl: "http://localhost:3000/api/news/image_upload2", // Your endpoint that provides uploading by Url
      },
    },
  },
};
