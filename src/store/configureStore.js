import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import reducer from "../reducers/loginReducer";
import { logActions, loginFlow, rootSaga } from "./../sagas";

export default function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const composeArgs = [applyMiddleware(sagaMiddleware), applyMiddleware(thunk)];
  if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
    composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const store = createStore(reducer, compose.apply(undefined, composeArgs));

  sagaMiddleware.run(rootSaga);
  //sagaMiddleware.run(loginFlow);
  //sagaMiddleware.run(logActions);

  return store;
}
