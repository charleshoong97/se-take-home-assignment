import { ADD_BOT, OFF_BOT, ON_BOT } from "../constant";

export const addBot = (payload) => ({
  type: ADD_BOT,
  payload,
});

export const onBot = (payload) => ({
  type: ON_BOT,
  payload,
});

export const offBot = (payload) => ({
  type: OFF_BOT,
  payload,
});
