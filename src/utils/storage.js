export const setUserName = name => {
  localStorage.setItem('userName', name);
};

export const getUserName = () => {
  const userName = localStorage.getItem('userName');
  if (userName) return userName;
  else return '';
};

export const removeUserName = () => {
  localStorage.removeItem('userName');
};
