import { ADD_ORDER } from "../constant";

const defaultState = 0;

export const counterReducer = (
  state = defaultState,
  { type, payload = { bot: {}, order: {} } }
) => {
  switch (type) {
    case ADD_ORDER:
      return state + 1;
    default:
      return state;
  }
};
