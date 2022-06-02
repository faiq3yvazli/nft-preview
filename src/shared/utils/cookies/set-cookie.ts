export const setCookie = (name: string, value: string, exp: number) => {
  let expires = '';

  if (exp) {
    const date = new Date(exp * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
