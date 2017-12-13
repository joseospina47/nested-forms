import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Tabs, TabList, TabPanel, Tab } from "react-tabs";
import { Col } from "react-bootstrap";

import "./TabMenu.css";

import { categories } from "../../constants/config";
import { validateAttrNames, detectInvalidAttr } from "../../helpers/validation";
import selectCategory from "../../actions/category";
import TabItem from "../../components/TabItem/TabItem";
import Attributes from "../../containers/Attributes/Attributes";

class TabMenu extends Component {
  constructor(props) {
    super(props);
    this.selectCategory = props.selectCategory;
    this.state = {
      disabled: false,
    };
  }

  componentWillReceiveProps({ attributes }) {
    const invalid = detectInvalidAttr(attributes);
    const nameValidation = validateAttrNames(attributes);
    this.setState({ disabled: invalid || nameValidation });
  }

  handleClick(categoryId) {
    this.selectCategory(categoryId);
  }

  render() {
    const { id: categoryId } = this.props.category;
    const { disabled } = this.state;
    return (
      <Col md={8}>
        <Tabs>
          <TabList className="tab-menu d-flex flex-row align-items-top">
            {categories.map(category => (
              <Tab
                key={category.id}
                onClick={() => this.handleClick(category.id)}
                className={
                  categoryId === category.id
                    ? "tab-menu__tab tab-menu__tab--selected"
                    : "tab-menu__tab"
                }
              >
                <TabItem {...category} />
              </Tab>
            ))}
          </TabList>
          <div className="tab-menu__content">
            {categories.map(category => (
              <TabPanel key={category.id}>
                <Attributes />
              </TabPanel>
            ))}
          </div>
        </Tabs>
        <div className="tab-menu__actions d-flex justify-content-end">
          <button className="tab-menu__button btn-cancel">Cancel</button>
          <button className="tab-menu__button" disabled={disabled}>
            Save
          </button>
        </div>
      </Col>
    );
  }
}

TabMenu.defaultProps = {
  attribute: {},
};

TabMenu.propTypes = {
  selectCategory: PropTypes.func.isRequired,
  attribute: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

const mapStateToProps = state => ({
  category: state.category,
  attributes: state.attributes,
});

export default connect(mapStateToProps, { selectCategory })(TabMenu);
