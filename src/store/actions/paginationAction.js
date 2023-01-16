import {
  SET_PAGE,
  SET_PAGE_FAIL,
  SET_PAGE_SUCCESS,
} from "../constants/pagination";

export const setPagination = () => {
  return {
    type: SET_PAGE,
  };
};
export const setPaginationSuccess = (payload) => {
  return {
    type: SET_PAGE_SUCCESS,
    payload,
  };
};
export const setPaginationFail = (payload) => {
  return {
    type: SET_PAGE_FAIL,
    payload,
  };
};
