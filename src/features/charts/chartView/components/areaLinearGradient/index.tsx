import React from 'react';
import { LinearGradient, Stop } from 'react-native-svg';
import { convertLineToColor, supportedLinesFromArray } from '../../../../map/utils';
import { StationData } from '../../../../../types/station_data';

const AreaLinearGradient = ({ stationData, id }: { stationData: StationData[]; id: string }) => {
  return (
    <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0">
      {supportedLinesFromArray(stationData).map((i, index, arr) => {
        return (
          <Stop
            offset={index / arr.length}
            stopColor={convertLineToColor(i)}
            key={index}
            stopOpacity={0.4}
          />
        );
      })}
    </LinearGradient>
  );
};

export default AreaLinearGradient;
