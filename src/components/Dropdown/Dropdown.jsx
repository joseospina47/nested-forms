import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { Col } from "react-bootstrap";

const Dropdown = ({ size, label, options, disabled, name }) => (
  <Col md={size}>
    <div className="app__field-group">
      <label>{`${label}:`}</label>
      <Field
        className="app__field-control"
        disabled={disabled}
        name={name}
        id={name}
        component="select"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </Field>
    </div>
  </Col>
);

Dropdown.defaultProps = {
  disabled: false,
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Dropdown;
