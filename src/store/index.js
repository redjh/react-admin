import { createStore } from "redux";

function authoritiesReducer(state = void 0, action) {
  switch (action.type) {
    case "authorities/save":
      return action.value;
    default:
      return state;
  }
}
const store = createStore(authoritiesReducer);
