import moment from "moment";
import { ADD_ORDER, ASSIGN_ORDER, COMPLETE_ORDER, OFF_BOT } from "../constant";

const defaultState = [];

export const orderReducer = (
  state = defaultState,
  { type, payload = { order: {} } }
) => {
  const { order, bot } = payload;

  switch (type) {
    case ADD_ORDER:
    case OFF_BOT:
      return !Boolean(order)
        ? state
        : [
            ...state.filter((prev) => prev.name !== order.name),
            {
              ...order,
              bot: undefined,
              startOn: undefined,
            },
          ]
            .sort((a, b) => a.createdOn.getTime() - b.createdOn.getTime())
            .sort((a, b) => (a.VIP === b.VIP ? 0 : a.VIP ? -1 : 1));
    case ASSIGN_ORDER:
      return state.map((prev) =>
        prev.name === order.name
          ? {
              ...prev,
              bot: bot,
              startOn: moment().toDate(),
            }
          : prev
      );
    case COMPLETE_ORDER:
      return state.map((prev) =>
        prev.name === order.name
          ? {
              ...prev,
              completeOn: moment().toDate(),
            }
          : prev
      );
    default:
      return state;
  }
};
