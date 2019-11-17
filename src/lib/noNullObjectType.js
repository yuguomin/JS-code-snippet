export const noNullObjectType = (obj) => {
  return Boolean(['object', 'function'].includes(typeof obj) && obj !== null);
}