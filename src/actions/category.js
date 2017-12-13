import { SELECT_CATEGORY } from "./actionTypes";

const selectCategory = id => ({
  type: SELECT_CATEGORY,
  id,
});

export default selectCategory;
