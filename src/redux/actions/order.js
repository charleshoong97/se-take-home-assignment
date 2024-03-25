import { ADD_ORDER, ASSIGN_ORDER, COMPLETE_ORDER } from "../constant";

export const addOrder = (payload) => ({
  type: ADD_ORDER,
  payload,
});

export const assignOrder = (payload) => ({
  type: ASSIGN_ORDER,
  payload,
});

export const completeOrder = (payload) => ({
  type: COMPLETE_ORDER,
  payload,
});
