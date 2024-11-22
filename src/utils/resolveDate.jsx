export default (data) => {
  const date = new Date(data);
  return date.toLocaleDateString();
};
