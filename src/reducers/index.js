import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import attributes from "./attributes";
import category from "./category";

const reducer = combineReducers({
  form: formReducer,
  attributes,
  category,
});

export default reducer;
