export const saveUserInfo = (payload) =>
  localStorage.setItem("user_info", JSON.stringify(payload));

export const saveLoginStatus = () => localStorage.setItem("is_login", true);

export const removeUserInfo = () => localStorage.removeItem("user_info");

export const removeLoginStatus = () => localStorage.removeItem("is_login");
