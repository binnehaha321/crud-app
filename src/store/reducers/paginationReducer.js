import {
  SET_PAGE,
  SET_PAGE_FAIL,
  SET_PAGE_SUCCESS,
} from "../constants/pagination";

const initState = {
  pageTitle: "",
  pageNumber: 0,
  isLoading: false,
};

const paginationReducer = (state = initState, action) => {
  switch (action.payload) {
    case SET_PAGE:
      return {
        ...state,
        isLoading: true,
        pageTitle: action.payload,
        pageNumber: action.payload,
      };
    case SET_PAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pageTitle: action.payload,
        pageNumber: action.payload,
      };
    case SET_PAGE_FAIL:
      return {
        ...state,
        isLoading: false,
        pageTitle: action.payload,
        pageNumber: 0,
      };
    default:
      return state;
  }
};

export default paginationReducer;
