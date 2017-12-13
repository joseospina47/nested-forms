import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./Enumerations.css";

import { updateAttr } from "../../actions/attributes";

class Enumerations extends Component {
  constructor(props) {
    super(props);
    this.updateAttr = props.updateAttr;
    this.state = {
      enumeration: "",
      attribute: props.attribute,
    };
  }

  componentWillReceiveProps(props) {
    const { attribute } = props;
    this.setState({ attribute });
  }

  handleChange(e) {
    this.setState({
      enumeration: e.target.value,
    });
  }

  handleClick(e) {
    e.preventDefault();
    const { enumeration } = this.state;
    const { attribute: { enumerations, id } } = this.state;
    if (enumeration !== "") {
      const newAttribute = {
        ...this.state.attribute,
        enumerations: [...enumerations, enumeration],
      };
      this.updateAttr(id, newAttribute);
      this.setState({
        enumeration: "",
      });
    }
  }

  handleDelete(position) {
    const { attribute: { enumerations, id } } = this.state;
    const { attribute } = this.state;
    attribute.enumerations = enumerations.filter(
      (enumItem, index) => index !== position,
    );
    this.updateAttr(id, attribute);
  }

  render() {
    const { attribute: { enumerations }, enumeration } = this.state;
    return (
      <Row>
        <Col md={7}>
          <div className="app__field-group">
            <label>Enumerations:</label>
            <div className="d-flex">
              <input
                type="text"
                className="app__field-control"
                placeholder="Enter value"
                value={enumeration}
                onChange={e => this.handleChange(e)}
              />
              <button
                className="app__button"
                onClick={e => this.handleClick(e)}
              >
                Add
              </button>
            </div>
          </div>
        </Col>
        <Col md={5}>
          <ul className="enumeration__list">
            {enumerations.map((enumItem, index) => (
              <li key={enumItem}>
                <i
                  onClick={() => this.handleDelete(index)}
                  className="enumeration__icon fa fa-trash"
                  aria-hidden="true"
                />
                {enumItem}
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    );
  }
}

Enumerations.propTypes = {
  attribute: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateAttr: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  attributes: state.attributes,
});

export default connect(mapStateToProps, { updateAttr })(Enumerations);
