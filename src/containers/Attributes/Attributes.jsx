import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import "./Attributes.css";

import { createAttr } from "../../actions/attributes";
import Form from "../Form/Form";

class Attributes extends Component {
  constructor(props) {
    super(props);
    const { attributes, category } = props;
    this.createAttr = props.createAttr;

    const visibleAttrs = attributes.filter(
      attr => attr.categoryId === category.id,
    );
    this.state = {
      hasAttributes: visibleAttrs.length > 0,
      visibleAttrs,
    };
  }

  componentWillReceiveProps({ attributes, category }) {
    const visibleAttrs = attributes.filter(
      attr => attr.categoryId === category.id,
    );
    this.setState({
      hasAttributes: visibleAttrs.length > 0,
      visibleAttrs,
    });
  }

  handleOnClick() {
    const { attributes, category } = this.props;
    const attributeId =
      attributes.length === 0 ? 0 : attributes[attributes.length - 1].id + 1;
    this.createAttr(attributeId, category.id);
  }

  render() {
    const { hasAttributes, visibleAttrs } = this.state;
    return (
      <div>
        {hasAttributes ? (
          visibleAttrs.map(attribute => (
            <Form key={attribute.id} attribute={attribute} />
          ))
        ) : (
          <div className="attr__empty-message"> No Attributes </div>
        )}
        <footer className="attr__footer">
          <i
            onClick={() => this.handleOnClick()}
            className="attr__icon fa fa-plus-circle"
            aria-hidden="true"
          >
            <span className="attr__icon-text">Add Attribute</span>
          </i>
        </footer>
      </div>
    );
  }
}

Attributes.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  createAttr: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes,
  category: state.category,
});

export default connect(mapStateToProps, { createAttr })(Attributes);
