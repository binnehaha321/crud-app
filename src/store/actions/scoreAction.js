import { ADD_SCORE_SUCCESS, ADD_SCORE_FAIL } from "../constants/score";

export const addScoreSuccess = (payload) => {
  return {
    type: ADD_SCORE_SUCCESS,
    payload,
  };
};
export const addScoreFail = (payload) => {
  return {
    type: ADD_SCORE_FAIL,
    payload,
  };
};
