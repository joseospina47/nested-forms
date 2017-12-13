import { CREATE_ATTR, DELETE_ATTR, UPDATE_ATTR } from "../actions/actionTypes";
import { attrDefaultValues } from "../constants/config";

const attributes = (state = [], action) => {
  switch (action.type) {
    case CREATE_ATTR:
      return [
        ...state,
        {
          ...attrDefaultValues,
          id: action.id,
          categoryId: action.categoryId,
        },
      ];
    case DELETE_ATTR:
      return state.filter(attr => attr.id !== action.id);
    case UPDATE_ATTR:
      return state.map(attr => {
        if (attr.id !== action.id) return attr;
        return {
          ...attr,
          ...action.attribute,
        };
      });
    default:
      return state;
  }
};

export default attributes;
