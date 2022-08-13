import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactLoading from "react-loading";
import NewsCardComponent from "components/News/NewsCardComponent/NewsCardComponent";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminComponent from "components/admin/AdminComponent";

function CREATEPOST() {
  return (
    <div>
      <AdminComponent />
    </div>
  );
}

export default CREATEPOST;
