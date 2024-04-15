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

export const convertRideDataToGraphColors = (
  data: StationData,
): {
  lineColor: string;
  gradientStart: string;
  gradientEnd: string;
} => {
  if (data.BLUE) {
    return {
      lineColor: '#3982f7',
      gradientEnd: '#3982f7',
      gradientStart: '#3982f7',
    };
  }
  if (data.BRN) {
    return {
      lineColor: '#421e0d',
      gradientEnd: '#421e0d',
      gradientStart: '#421e0d',
    };
  }
  if (data.G) {
    return {
      lineColor: '#105c1a',
      gradientEnd: '#105c1a',
      gradientStart: '#105c1a',
    };
  }
  if (data.O) {
    return {
      lineColor: '#e36607',
      gradientEnd: '#e36607',
      gradientStart: '#e36607',
    };
  }
  if (data.Pnk) {
    return {
      lineColor: '#e607cf',
      gradientEnd: '#e607cf',
      gradientStart: '#e607cf',
    };
  }
  if (data.RED) {
    return {
      lineColor: '#e61907',
      gradientEnd: '#e61907',
      gradientStart: '#e61907',
    };
  }
  if (data.Y) {
    return {
      lineColor: '#dec404',
      gradientEnd: '#dec404',
      gradientStart: '#dec404',
    };
  }
  if (data.STATION_DESCRIPTIVE_NAME.toLowerCase().includes('purple line')) {
    return {
      lineColor: '#8b04de',
      gradientEnd: '#8b04de',
      gradientStart: '#8b04de',
    };
  }

  return {
    lineColor: 'black',
    gradientEnd: 'black',
    gradientStart: 'black',
  };
};
