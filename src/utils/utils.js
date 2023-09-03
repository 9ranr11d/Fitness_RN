export const changeTenFomat = num => {
  let result = num;
  if(num < 10)
    result = `0${num}`;

  return result;
};

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = changeTenFomat(today.getMonth() + 1);
  const day = changeTenFomat(today.getDate());

  return { year, month, day};
}