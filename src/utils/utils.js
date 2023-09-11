/**
 * 
 * @param {number} num ex) 9
 * @returns ex) 09
 */
export const changeTenFomat = num => {
  let result = num;
  if(num < 10)
    result = `0${num}`;

  return result;
};

/**
 * 오늘 날짜값을 받을 수 있음
 * @returns year: 년, month: 월, day: 일
 */
export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = changeTenFomat(today.getMonth() + 1);
  const day = changeTenFomat(today.getDate());

  return {year, month, day};
};