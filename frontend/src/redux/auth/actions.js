export const authAction = (userToken) => {
  return {
    type: "USER_LOGIN",
    token: userToken,
  };
};
