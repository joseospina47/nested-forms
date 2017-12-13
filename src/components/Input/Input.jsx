import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { Col } from "react-bootstrap";

const Input = props => (
  <Col md={props.size}>
    <div
      className={
        props.error
          ? "app__field-group app__field-group--error"
          : "app__field-group"
      }
    >
      <label>{`${props.label}:`}</label>
      {props.error ? (
        <label className="form__field-error-text">{props.message}</label>
      ) : null}
      <Field
        type={props.type}
        className="app__field-control"
        placeholder={props.placeholder}
        name={props.name}
        id={props.name}
        component="input"
        disabled={props.disabled}
      />
    </div>
  </Col>
);

Input.defaultProps = {
  disabled: false,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Input;
