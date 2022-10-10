import request from "~/utils/request";
import { toast } from "react-toastify";

export const auth = async (values) => {
  try {
    const res = await request.post("login", values, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return res.data;
  } catch (error) {
    toast.error(error);
  }
};
