export const saveUserInfo = (payload) => {
  if (payload) {
    localStorage.setItem("user_info", JSON.stringify(payload));
  }
};

export const removeUserInfo = () => {
  localStorage.removeItem("user_info");
};
