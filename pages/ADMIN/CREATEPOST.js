import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "reactstrap";
import ReactLoading from "react-loading";
import NewsCardComponenet from "../../components/News/NewsCardComponenet/NewsCardComponenet";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminComponent from "../../components/admin/AdminComponent";

function CREATEPOST() {
  return (
    <div>
      <AdminComponent />
    </div>
  );
}

export default CREATEPOST;
