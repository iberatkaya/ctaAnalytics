import {
  ActivityIndicator,
  InteractionManager,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LineChart } from 'react-native-gifted-charts';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { MapStackParamList } from '../../../navigation/types';
import { useAtomValue } from 'jotai';
import { stationAverageAtom } from '../../../jotai/atoms/stationAverageAtom';
import moment from 'moment';
import {
  capitalizeFirstLetter,
  convertLineToColor,
  convertRideDataToGraphColors,
  formatNumber,
  supportedLinesFromArray,
} from '../../map/utils';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';
import { StationAverageData } from '../../../types/station_average_data';
import { Options } from './types';
import styles from './styles';
import { stationAtom } from '../../../jotai/atoms/stationAtom';
import { LinearGradient, Stop } from 'react-native-svg';
import LineLinearGradient from './components/lineLinearGradient';
import AreaLinearGradient from './components/areaLinearGradient';

const ChartView = () => {
  const navigation = useNavigation<NavigationProp<MapStackParamList, 'Chart'>>();
  const route = useRoute<RouteProp<MapStackParamList, 'Chart'>>();
  const station = route.params.stationData;
  const scrollRef = useRef<typeof LineChart | null>(null);
  const { width } = useWindowDimensions();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [option, setOption] = useState<Options>('one-year');

  const stationAverageData = useAtomValue(stationAverageAtom);
  const allStations = useAtomValue(stationAtom);

  const allStationsData = useMemo(
    () => allStations.filter((i) => i.MAP_ID === station.MAP_ID),
    [allStations, station.MAP_ID],
  );

  const allData = useMemo(
    () => stationAverageData.filter((i) => i.station_id === station.MAP_ID && i.monthtotal !== 0),
    [station.MAP_ID, stationAverageData],
  );

  const sortedData = useMemo(() => {
    return allData.sort((a, b) =>
      moment(a.month_beginning, 'MM/dd/yyyy').isAfter(moment(b.month_beginning, 'MM/dd/yyyy'))
        ? 1
        : -1,
    );
  }, [allData]);

  const data = useMemo(() => {
    if (option === 'one-year') {
      return sortedData.slice(-12);
    }
    if (option === 'five-years') {
      return sortedData.slice(-60);
    }
    if (option === 'ten-years') {
      return sortedData.slice(-12 * 10);
    }
    return allData;
  }, [allData, option, sortedData]);

  useEffect(() => {
    navigation.setOptions({
      title: station.STOP_NAME,
      headerTintColor: convertRideDataToGraphColors(station).lineColor,
    });

    InteractionManager.runAfterInteractions(() => {
      setAnimationFinished(true);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxVal: number = data.reduce(
    (prev, curr) => (prev > curr.monthtotal ? prev : curr.monthtotal),
    0,
  );

  const floorToThousand = (value: number) => Math.ceil(value / 1000) * 1000;

  const getLabelText = useCallback(
    (i: StationAverageData, index: number) => {
      if (option === 'one-year') {
        return index % 2 === 0 ? moment(i.month_beginning, 'mm/dd/yyyy').format('mm/yyyy') : '';
      }
      if (option === 'five-years') {
        return index % 4 === 0 ? moment(i.month_beginning, 'mm/dd/yyyy').format('mm/yyyy') : '';
      }
      if (option === 'ten-years') {
        return index % 5 === 0 ? moment(i.month_beginning, 'mm/dd/yyyy').format('mm/yyyy') : '';
      }
      return index % 6 === 0 ? moment(i.month_beginning, 'mm/dd/yyyy').format('mm/yyyy') : '';
    },
    [option],
  );

  const chartSpacing = useMemo(() => {
    if (option === 'one-year') {
      return 38;
    }
    if (option === 'five-years') {
      return 22;
    }
    if (option === 'ten-years') {
      return 18;
    }
    return 14;
  }, [option]);

  useEffect(() => {
    // @ts-ignore Package has type error so ignore
    scrollRef?.current?.scrollTo({ x: 0 });
  }, [option]);

  if (!animationFinished) {
    return <ActivityIndicator size={'large'} style={styles.loading} />;
  }

  return (
    <View>
      <Animated.View key={'mapKey'} entering={FadeIn.duration(500)}>
        <Dropdown
          style={styles.dropdown}
          data={[
            { value: 'one-year', label: 'One Year' },
            { value: 'five-years', label: 'Five Years' },
            { value: 'ten-years', label: 'Ten Years' },
            { value: 'all', label: 'All' },
          ]}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={option}
          onChange={(item) => {
            setOption(item.value as Options);
          }}
        />
        <View style={styles.supportedLines}>
          <Text numberOfLines={2} style={{ textAlign: 'center' }}>
            <Text style={{ fontSize: 16 }}>Supported Lines: </Text>
            {supportedLinesFromArray(allStationsData).map((i, index) => (
              <>
                <Text key={i} style={{ color: convertLineToColor(i) }}>
                  {capitalizeFirstLetter(i)}
                </Text>
                <Text>
                  {index < supportedLinesFromArray(allStationsData).length - 1 ? ', ' : ''}
                </Text>
              </>
            ))}
          </Text>
        </View>
        <View style={styles.divider} />
        <Text style={styles.axisLabel}>Monthly Average{'\n'}Ridership</Text>
        <LineChart
          scrollRef={scrollRef}
          yAxisLabelWidth={52}
          initialSpacing={20}
          width={width - 52}
          xAxisLabelTextStyle={{ width: 56 }}
          stepHeight={36}
          yAxisExtraHeight={24}
          spacing={chartSpacing}
          textColor1="black"
          textFontSize1={10}
          curved
          areaChart
          isAnimated
          showXAxisIndices
          xAxisIndicesWidth={1.5}
          hideDataPoints
          lineGradient
          lineGradientId="line" // same as the id passed in <LinearGradient> below
          // eslint-disable-next-line react/no-unstable-nested-components
          lineGradientComponent={() => (
            <LineLinearGradient stationData={allStationsData} id="line" />
          )}
          areaGradientId="area" // same as the id passed in <LinearGradient> below
          // eslint-disable-next-line react/no-unstable-nested-components
          areaGradientComponent={() => (
            <AreaLinearGradient stationData={allStationsData} id={'area'} />
          )}
          xAxisIndicesHeight={4}
          showVerticalLines
          verticalLinesUptoDataPoint
          thickness={3}
          noOfSections={10}
          stepValue={floorToThousand(Math.ceil(maxVal / 10) + 2000)}
          yAxisColor="black"
          xAxisColor="black"
          color={convertRideDataToGraphColors(station).lineColor}
          dataPointsColor="#090a3a"
          dataPointsRadius={4}
          formatYLabel={(label) => formatNumber(parseInt(label, 10))}
          data={data.map((i, index) => ({
            value: i.monthtotal,
            label: getLabelText(i, index),
          }))}
        />
      </Animated.View>
    </View>
  );
};

export default ChartView;
