import { createStore, applyMiddleware, compose } from "redux";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

import logger from "redux-logger";

const composeEnhancers = __DEV__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle
  : compose;

export default initialState => {
  let middlewares = [reduxImmutableStateInvariant(), thunk];
  if (__DEV__) {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return { store };
};
