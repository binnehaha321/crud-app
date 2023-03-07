import {
  CLOSE_ASSIGN_MODAL,
  OPEN_ASSIGN_MODAL_BY_FPT_ID,
} from "../constants/studentClass";

const initialValues = {
  isOpen: false,
  fptId: "",
};

const studentClassReducer = (state = initialValues, action) => {
  switch (action.type) {
    case OPEN_ASSIGN_MODAL_BY_FPT_ID: {
      return {
        ...state,
        isOpen: true,
        fptId: action.payload,
      };
    }

    case CLOSE_ASSIGN_MODAL: {
      return {
        ...state,
        isOpen: false,
        fptId: "",
      };
    }

    default:
      return state;
  }
};

export default studentClassReducer;
