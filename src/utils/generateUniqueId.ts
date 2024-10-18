export const generateUniqueId = () =>
  '_' + Math.random().toString(36).slice(2, 11);
