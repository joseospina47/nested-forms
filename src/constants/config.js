export const categories = [
  {
    id: 1,
    title: "Category 1"
  },
  {
    id: 2,
    title: "Category 2"
  },
  {
    id: 3,
    title: "Category 3"
  },
  {
    id: 4,
    title: "Category 4"
  },
  {
    id: 5,
    title: "Category 5"
  }
];

export const resourceOpts = [
  {
    value: "Default Value",
    title: "Default Value"
  }
];

export const dataTypeOpts = [
  {
    value: "String",
    title: "String"
  },
  {
    value: "Object",
    title: "Object"
  }
];

export const formatOpts = [
  {
    value: "None",
    title: "None"
  },
  {
    value: "Number",
    title: "Number"
  },
  {
    value: "Boolean",
    title: "Boolean"
  },
  {
    value: "DateTime",
    title: "DateTime"
  },
  {
    value: "CDATA",
    title: "CDATA"
  },
  {
    value: "URI",
    title: "URI"
  }
];

export const attrDefaultValues = {
  name: "",
  description: "",
  deviceResourceType: "Default Value",
  defaultValue: "",
  dataType: "String",
  format: "None",
  enumerations: [],
  minRange: null,
  maxRange: null,
  unitOfMeasurement: null,
  precision: null,
  accuracy: null
};

export const REQUIRED_ERROR = "Required";
export const MIN_RANGE_ERROR = "Must be less than max";
export const MAX_RANGE_ERROR = "Must be greater than min";
export const BETWEEN_RANGE_ERROR = "Invalid value";

export const VALIDATION_TEMPLATE = {
  name: {
    error: false,
    message: ""
  },
  minRange: {
    error: false,
    message: ""
  },
  maxRange: {
    error: false,
    message: ""
  },
  precision: {
    error: false,
    message: ""
  },
  accuracy: {
    error: false,
    message: ""
  }
};
