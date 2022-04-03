const initialValuesObject = (schema) => {
  const obj = schema.getDefault();
  for (const [key] of Object.entries(obj)) {
    obj[key] = "";
  }
  return obj;
};

const getFullDate = (dateStr) => {
  const date = new Date(dateStr);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

const utils = {
  initialValuesObject,
  getFullDate,
};

export default utils;
