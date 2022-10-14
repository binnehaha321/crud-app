import { toast } from "react-toastify";
import request from "~/utils/request";

const initialState = {
  users: [
    { id: 1, name: "Khanh" },
    { id: 2, name: "Quoc" },
  ],
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      request
        .post("register", action.payload)
        .then((res) => {
          toast.success(res.data.message);
        })
        .catch((err) => toast.error(err.message));
      return { ...state };

    default:
      return state;
  }
};

export default rootReducer;
