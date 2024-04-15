import { StationData } from '../../../types/station_data';

/** Example location string: `(41.85182, -87.745336)` */
export const parseLocationString = (str: string): [number, number] => {
  const items = str.split(', ');
  const nums = items.map((i) =>
    i.replaceAll(',', '').replaceAll(' ', '').replaceAll('(', '').replaceAll(')', ''),
  );
  return [parseFloat(nums[0]), parseFloat(nums[1])];
};

export const convertRideDataToColor = (data: StationData) => {
  if (data.BLUE) return 'blue';
  if (data.BRN) return 'brown';
  if (data.G) return 'green';
  if (data.O) return 'orange';
  if (data.Pnk) return 'pink';
  if (data.RED) return 'red';
  if (data.Y) return 'yellow';
  if (data.STATION_DESCRIPTIVE_NAME.toLowerCase().includes('purple line')) return 'purple';

  return 'black';
};
