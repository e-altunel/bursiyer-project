export const getNameLocal = (obj, local) => {
  if (obj === null || obj === undefined) return "No Name";
  if (obj[local.lang]) return obj[local.lang];
  if (obj[local.defaultLang]) return obj[local.defaultLang];
  return "No Name";
};
