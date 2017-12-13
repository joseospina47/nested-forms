import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col } from "react-bootstrap";
import { Collapse } from "react-collapse";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import "./Form.css";

import { resourceOpts, dataTypeOpts, formatOpts } from "../../constants/config";
import { deleteAttr, updateAttr } from "../../actions/attributes";
import { validateForm } from "../../helpers/validation";

import Input from "../../components/Input/Input";
import Dropdown from "../../components/Dropdown/Dropdown";
import Enumerations from "../Enumerations/Enumerations";

class Form extends Component {
  constructor(props) {
    super(props);
    this.deleteAttr = props.deleteAttr;
    this.updateAttr = props.updateAttr;
    this.attributeId = props.attribute.id;
    const { format } = props.attribute;
    this.state = {
      isOpened: true,
      showEnums: format !== "Number",
      disFormat: false,
      disDefaultValue: false,
      title: "No Name",
      attribute: props.attribute,
      errors: {},
    };
  }

  componentDidMount() {
    const { initialize, attribute } = this.props;
    initialize(attribute);
  }

  componentWillReceiveProps(props) {
    const { attribute } = props;
    const errors = validateForm(attribute);
    attribute.invalid = errors.invalid;
    this.updateAttr(attribute);
    this.setState({ attribute, errors });
  }

  clearNumberFields() {
    const { change } = this.props;
    change("minRange", null);
    change("maxRange", null);
    change("unitOfMeasurement", null);
    change("precision", null);
    change("accuracy", null);
  }

  displayBlockOnRule(values) {
    const { attribute, showEnums } = this.state;
    const { format } = values;
    if (format === "None" && !showEnums) {
      this.clearNumberFields();
      this.setState({ showEnums: true });
      return {
        ...attribute,
        minRange: null,
        maxRange: null,
        unitOfMeasurement: null,
        precision: null,
        accuracy: null,
      };
    }
    if (format === "Number" && showEnums) {
      this.setState({ showEnums: false });
      return {
        ...attribute,
        enumerations: [],
      };
    }
    return values;
  }

  disableFieldOnRule(values) {
    const { dataType } = values;
    const { disFormat, disDefaultValue } = this.state;
    if (dataType === "String" && disFormat && disDefaultValue)
      return { disFormat: false, disDefaultValue: false };
    if (dataType === "Object" && !disFormat && !disDefaultValue)
      return { disFormat: true, disDefaultValue: true };
    return null;
  }

  submitHandler(values) {
    const { name, format } = values;
    const attribute = this.displayBlockOnRule(values);
    const ruledDisable = this.disableFieldOnRule(values);
    this.setState({
      attribute,
      ...ruledDisable,
      title: name === "" ? "No Name" : name,
    });
    this.updateAttr(this.attributeId, {
      ...attribute,
      format,
    });
  }

  toggle() {
    const { isOpened } = this.state;
    this.setState({ isOpened: !isOpened });
  }

  handleOnClick() {
    this.deleteAttr(this.attributeId);
  }

  render() {
    const {
      attribute,
      isOpened,
      showEnums,
      disFormat,
      disDefaultValue,
      title,
      errors,
    } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Row className="form__field-row">
        <i
          onClick={() => this.handleOnClick()}
          className="form__icon form__icon--left  fa fa-trash"
          aria-hidden="true"
        />
        <div className="form__title">{title}</div>
        <i
          onClick={() => this.toggle()}
          className={`form__icon form__icon--right  fa ${
            isOpened ? "fa-angle-double-up" : "fa-angle-double-down"
          }`}
          aria-hidden="true"
        />
        <Collapse isOpened={isOpened} className="form__row-collapse">
          <form
            onChange={() =>
              setTimeout(
                handleSubmit(
                  this.submitHandler.bind(this), // eslint-disable-line react/jsx-no-bind
                ),
              )
            }
          >
            <Row>
              <Input
                size={4}
                placeholder="Name"
                label="Name"
                name="name"
                type="text"
                {...errors.name}
              />
              <Input
                type="text"
                size={8}
                placeholder="Description"
                label="Description"
                name="description"
              />
              <Dropdown
                size={5}
                label="Device Resource Type"
                disabled
                options={resourceOpts}
                name="deviceResourceType"
              />
              <Input
                type="text"
                size={7}
                placeholder="Default Value"
                label="Default Value"
                name="defaultValue"
                disabled={disDefaultValue}
              />
              <Dropdown
                size={5}
                label="Data Type"
                options={dataTypeOpts}
                name="dataType"
              />
              <Dropdown
                size={7}
                label="Format"
                options={formatOpts}
                name="format"
                disabled={disFormat}
              />
              <Col
                md={12}
                className={
                  !showEnums ? " form__opts--show" : "form__opts--hide"
                }
              >
                <Row>
                  <Input
                    type="number"
                    size={6}
                    placeholder="Min Range"
                    label="Min Range"
                    name="minRange"
                    {...errors.minRange}
                  />
                  <Input
                    type="number"
                    size={6}
                    placeholder="Max Range"
                    label="Max Range"
                    name="maxRange"
                    {...errors.maxRange}
                  />
                  <Input
                    type="text"
                    size={4}
                    placeholder="UoM (eg. mm)"
                    label="Unit of Measurement"
                    name="unitOfMeasurement"
                  />
                  <Input
                    type="number"
                    size={4}
                    placeholder="Precision"
                    label="Precision"
                    name="precision"
                    {...errors.precision}
                  />
                  <Input
                    type="number"
                    size={4}
                    placeholder="Accuracy"
                    label="Accuracy"
                    name="accuracy"
                    {...errors.accuracy}
                  />
                </Row>
              </Col>
            </Row>
          </form>
          {showEnums ? <Enumerations attribute={attribute} /> : null}
        </Collapse>
      </Row>
    );
  }
}

Form.propTypes = {
  deleteAttr: PropTypes.func.isRequired,
  updateAttr: PropTypes.func.isRequired,
  attribute: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  initialize: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { attribute: { id } }) => ({
  form: id.toString(),
  attributes: state.attributes,
});

const attrForm = compose(
  connect(mapStateToProps, { deleteAttr, updateAttr }),
  reduxForm(),
)(Form);

export default attrForm;
