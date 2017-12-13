import { SELECT_CATEGORY } from "../actions/actionTypes";

const initialState = {
  id: 1,
};

const category = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return {
        ...state,
        id: action.id,
      };
    default:
      return state;
  }
};

export default category;
