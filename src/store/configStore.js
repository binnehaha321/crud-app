import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "~/store/reducers";
import { createStore } from "redux";

const configStore = () => {
  const enhancers = [];
  const composedEnhancers = composeWithDevTools(...enhancers);
  const store = createStore(rootReducer, composedEnhancers);

  return store;
};

export default configStore;
