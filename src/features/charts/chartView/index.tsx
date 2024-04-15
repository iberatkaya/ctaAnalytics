import { View, useWindowDimensions } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MapStackParamList } from '../../../navigation/types';
import { useAtomValue } from 'jotai';
import { stationAverageAtom } from '../../../jotai/atoms/stationAverageAtom';
import moment from 'moment';
import { convertRideDataToGraphColors } from '../../map/utils';

const ChartView = () => {
  const navigation = useNavigation<NavigationProp<MapStackParamList, 'Chart'>>();
  const route = useRoute<RouteProp<MapStackParamList, 'Chart'>>();
  const station = route.params.stationData;
  const { width } = useWindowDimensions();

  const stationAverageData = useAtomValue(stationAverageAtom);

  const data = useMemo(
    () => stationAverageData.filter((i) => i.station_id === station.MAP_ID && i.monthtotal !== 0),
    [station.MAP_ID, stationAverageData],
  );

  useEffect(() => {
    navigation.setOptions({
      title: station.STOP_NAME,
      headerTintColor: convertRideDataToGraphColors(station).lineColor,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxVal: number = data.reduce(
    (prev, curr) => (prev > curr.monthtotal ? prev : curr.monthtotal),
    0,
  );

  const floorToThousand = (value: number) => Math.ceil(value / 1000) * 1000;

  return (
    <View>
      <View>
        <LineChart
          yAxisLabelWidth={60}
          initialSpacing={20}
          width={width - 60}
          xAxisLabelTexts={data.map((i) => moment(i.month_beginning, 'mm/dd/yyyy').format('mm/YY'))}
          stepHeight={36}
          yAxisExtraHeight={24}
          spacing={width * 0.11 > 50 ? width * 0.11 : 50}
          textColor1="black"
          startFillColor={convertRideDataToGraphColors(station).gradientStart}
          startOpacity={0.6}
          endFillColor={convertRideDataToGraphColors(station).gradientEnd}
          endOpacity={0.2}
          textFontSize1={10}
          curved
          areaChart
          isAnimated
          thickness={3}
          noOfSections={10}
          stepValue={floorToThousand(Math.ceil(maxVal / 10)) + 5000}
          yAxisColor="black"
          xAxisColor="black"
          color={convertRideDataToGraphColors(station).lineColor}
          dataPointsColor="#090a3a"
          dataPointsRadius={4}
          data={data.map((i) => ({
            value: i.monthtotal,
            // dataPointText: i.monthtotal.toString(),
          }))}
        />
      </View>
    </View>
  );
};

export default ChartView;
