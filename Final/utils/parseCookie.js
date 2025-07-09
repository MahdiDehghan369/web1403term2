const parseCookie = (cookie , key) => {
  if (!cookie) return null;
  const cookies = cookie.split(";");

  for (const e of cookies) {
    const [k, v] = e.split("=");
    if (k == key) return v;
  }

  return null;
};
module.exports = parseCookie;
