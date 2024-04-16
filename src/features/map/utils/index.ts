import { Line } from '../../../types/line';
import { StationData } from '../../../types/station_data';

/** Example location string: `(41.85182, -87.745336)` */
export const parseLocationString = (str: string): [number, number] => {
  const items = str.split(', ');
  const nums = items.map((i) =>
    i.replaceAll(',', '').replaceAll(' ', '').replaceAll('(', '').replaceAll(')', ''),
  );
  return [parseFloat(nums[0]), parseFloat(nums[1])];
};

export const supportedLines = (data: StationData) => {
  const lines: Line[] = [];
  if (data.BLUE) lines.push('blue');
  if (data.BRN) lines.push('brown');
  if (data.G) lines.push('green');
  if (data.O) lines.push('orange');
  if (data.Pnk) lines.push('pink');
  if (data.RED) lines.push('red');
  if (data.Y) lines.push('yellow');
  if (data.STATION_DESCRIPTIVE_NAME.toLowerCase().includes('purple')) lines.push('purple');

  return lines;
};

export const supportedLinesFromArray = (data: StationData[]): Line[] => {
  let items: Line[] = [];
  for (let i of data) {
    items.push(...supportedLines(i));
  }
  return [...new Set(items)];
};

export const convertRideDataToColor = (data: StationData): Line | 'black' => {
  if (data.BLUE) return 'blue';
  if (data.BRN) return 'brown';
  if (data.G) return 'green';
  if (data.O) return 'orange';
  if (data.Pnk) return 'pink';
  if (data.RED) return 'red';
  if (data.Y) return 'yellow';
  if (data.STATION_DESCRIPTIVE_NAME.toLowerCase().includes('purple')) return 'purple';

  return 'black';
};

export const convertLineToColor = (line: Line): string => {
  if (line === 'blue') {
    return '#3982f7';
  }
  if (line === 'brown') {
    return '#421e0d';
  }
  if (line === 'green') {
    return '#105c1a';
  }
  if (line === 'orange') {
    return '#e36607';
  }
  if (line === 'pink') {
    return '#e607cf';
  }
  if (line === 'red') {
    return '#e61907';
  }
  if (line === 'yellow') {
    return '#dec404';
  }
  if (line === 'purple') {
    return '#8b04de';
  }

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

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Taken from https://stackoverflow.com/a/55987414
export const formatNumber = (n: number): string => {
  if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
  if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
  if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
  if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
  return n.toString();
};

export const allLinesInStationCount = (data: StationData) => {
  let total = 0;
  if (data.BLUE) total++;
  if (data.BRN) total++;
  if (data.G) total++;
  if (data.O) total++;
  if (data.Pnk) total++;
  if (data.RED) total++;
  if (data.Y) total++;
  if (data.STATION_DESCRIPTIVE_NAME.toLowerCase().includes('purple')) total++;

  return total;
};
