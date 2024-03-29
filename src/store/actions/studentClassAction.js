import {
  CLOSE_ASSIGN_MODAL,
  OPEN_ASSIGN_MODAL_BY_FPT_ID,
} from "../constants/studentClass";

export const openAssignModalByFptId = (payload) => {
  return {
    type: OPEN_ASSIGN_MODAL_BY_FPT_ID,
    payload,
  };
};

export const closeAssignModal = () => {
  return {
    type: CLOSE_ASSIGN_MODAL,
  };
};
