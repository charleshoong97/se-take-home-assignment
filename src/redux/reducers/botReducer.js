import moment from "moment";
import {
  ADD_BOT,
  ASSIGN_ORDER,
  COMPLETE_ORDER,
  OFF_BOT,
  ON_BOT,
} from "../constant";

const defaultState = [];

export const botReducer = (
  state = defaultState,
  { type, payload = { bot: {}, order: {} } }
) => {
  const { bot, order } = payload;
  switch (type) {
    case ADD_BOT:
      return [...state, bot];
    case ON_BOT:
      return state.map((prev) =>
        prev.name === bot.name
          ? { ...prev, active: true, currentOrder: undefined }
          : prev
      );
    case OFF_BOT:
      return state.map((prev) =>
        prev.name === bot.name
          ? { ...prev, active: false, currentOrder: undefined }
          : prev
      );
    case ASSIGN_ORDER:
      return state.map((prev) =>
        prev.name === bot.name
          ? {
              ...prev,
              currentOrder: { ...order, bot: prev, startOn: moment().toDate() },
            }
          : prev
      );
    case COMPLETE_ORDER:
      return state.map((prev) =>
        prev.name === bot.name ? { ...prev, currentOrder: undefined } : prev
      );
    default:
      return state;
  }
};
