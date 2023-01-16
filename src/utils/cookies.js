import { Cookies } from "react-cookie";

export const cookies = new Cookies();

export const saveUserInfo = (payload) =>
  cookies.set("user_info", JSON.stringify(payload));

export const saveLoginStatus = () => cookies.set("is_login", true);

export const removeUserInfo = () => cookies.remove("user_info");

export const removeLoginStatus = () => cookies.remove("is_login");
