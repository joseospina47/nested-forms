import React from "react";
import { connect } from "react-redux";
import { Col } from "react-bootstrap";

import "./JsonScreen.css";

const JsonScreen = ({ attributes }) => (
  <Col md={4} className="app__wrapper">
    <pre className="json-screen">{JSON.stringify(attributes, null, 2)}</pre>
  </Col>
);

const mapStateToProps = state => ({
  attributes: state.attributes,
});

export default connect(mapStateToProps, null)(JsonScreen);
