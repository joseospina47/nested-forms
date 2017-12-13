import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";

import reducer from "./reducers";

const logger = createLogger();
const enhancers = [];
const middleware = [logger];

if (process.env.NODE_ENV === "development") {
  const { devToolsExtension } = window;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
const store = createStore(reducer, composedEnhancers);

export default store;
