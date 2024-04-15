/** Example location string: `(41.85182, -87.745336)` */
export const parseLocationString = (str: string): [number, number] => {
  const items = str.split(', ');
  const nums = items.map((i) =>
    i
      .replaceAll(',', '')
      .replaceAll(' ', '')
      .replaceAll('(', '')
      .replaceAll(')', ''),
  );
  console.log(nums);
  return [parseFloat(nums[0]), parseFloat(nums[1])];
};
