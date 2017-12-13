import { CREATE_ATTR, DELETE_ATTR, UPDATE_ATTR } from "./actionTypes";

export const createAttr = (id, categoryId) => ({
  type: CREATE_ATTR,
  id,
  categoryId,
});

export const deleteAttr = id => ({
  type: DELETE_ATTR,
  id,
});

export const updateAttr = (id, attribute) => ({
  type: UPDATE_ATTR,
  id,
  attribute,
});
