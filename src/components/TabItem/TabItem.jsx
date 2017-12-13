import React from "react";
import PropTypes from "prop-types";

const TabItem = ({ title }) => (
  <p className="d-flex align-items-center justify-content-center">
    <span>{title}</span>
  </p>
);

TabItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TabItem;
