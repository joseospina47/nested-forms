import {
  REQUIRED_ERROR,
  MIN_RANGE_ERROR,
  MAX_RANGE_ERROR,
  BETWEEN_RANGE_ERROR,
  VALIDATION_TEMPLATE,
} from "../constants/config";

const detectInvalid = validation => {
  const valuesArray = Object.values(validation);
  return valuesArray.filter(value => value.error === true).length > 0;
};

const calculateStepFactor = (value, minRange, maxRange) => {
  const range = maxRange - minRange;
  const modulo = range % value;
  return modulo === 0;
};

export const validateAttrNames = attrs => {
  const seen = new Set();
  return attrs.some(attr => seen.size === seen.add(attr.name).size);
};

export const validateForm = ({
  name,
  minRange,
  maxRange,
  precision,
  accuracy,
  format,
}) => {
  const validation = { ...VALIDATION_TEMPLATE };
  if (!name) {
    validation.name = {
      error: true,
      message: REQUIRED_ERROR,
    };
  }

  if (format === "None") {
    validation.invalid = detectInvalid(validation);
    return validation;
  }

  if (!minRange) {
    validation.minRange = {
      error: true,
      message: REQUIRED_ERROR,
    };
  }

  if (Number(minRange) > Number(maxRange)) {
    validation.minRange = {
      error: true,
      message: MIN_RANGE_ERROR,
    };
  }
  if (!maxRange) {
    validation.maxRange = {
      error: true,
      message: REQUIRED_ERROR,
    };
  }

  if (Number(maxRange) < Number(minRange)) {
    validation.maxRange = {
      error: true,
      message: MAX_RANGE_ERROR,
    };
  }
  if (!precision) {
    validation.precision = {
      error: true,
      message: REQUIRED_ERROR,
    };
  }
  if (
    precision &&
    (Number(precision) < minRange ||
      Number(precision) > maxRange ||
      !calculateStepFactor(precision, minRange, maxRange))
  ) {
    validation.precision = {
      error: true,
      message: BETWEEN_RANGE_ERROR,
    };
  }
  if (!accuracy) {
    validation.accuracy = {
      error: true,
      message: REQUIRED_ERROR,
    };
  }
  if (
    accuracy &&
    (Number(accuracy) < minRange ||
      Number(accuracy) > maxRange ||
      !calculateStepFactor(accuracy, minRange, maxRange))
  ) {
    validation.accuracy = {
      error: true,
      message: BETWEEN_RANGE_ERROR,
    };
  }
  validation.invalid = detectInvalid(validation);
  return validation;
};

export const detectInvalidAttr = attributes =>
  attributes.filter(attribute => attribute.invalid === true).length > 0;
