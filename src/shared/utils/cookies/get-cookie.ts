export const baseGetCookie = (cookie: string, cookieName: string) => {
  let name = cookieName + '=';
  let ca = cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return undefined;
};

export const getCookie = (cookieName: string) => {
  let name = cookieName;

  if (typeof document === 'undefined') {
    return undefined;
  }

  return baseGetCookie(document.cookie, name);
};
