import { View, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import RNMapView, { LatLng, Marker, Polyline } from 'react-native-maps';
import {
  allLinesInStationCount,
  convertRideDataToColor,
  parseLocationString,
  supportedLinesFromArray,
} from '../utils';
import { useAtomValue } from 'jotai';
import { stationAtom } from '../../../jotai/atoms/stationAtom';
import { useNavigation } from '@react-navigation/native';
import { MapStackParamList } from '../../../navigation/types';
import { StationData } from '../../../types/station_data';
import { StackNavigationProp } from '@react-navigation/stack';
import { MarkerData } from './types';
import Lines from '../../../assets/lines.json';

const MapView = () => {
  const stations = useAtomValue(stationAtom);
  const navigation = useNavigation<StackNavigationProp<MapStackParamList, 'Map'>>();

  const markers: MarkerData[] = useMemo((): {
    latlng: LatLng;
    title: string;
    description: string;
    pinColor: string;
    station: StationData;
  }[] => {
    const items: MarkerData[] = [];
    stations.forEach((i) => {
      const latLng = parseLocationString(i.Location);
      if (items.find((j) => j.latlng.latitude === latLng[0] && j.latlng.longitude === latLng[1])) {
        return;
      }
      items.push({
        latlng: {
          latitude: latLng[0],
          longitude: latLng[1],
        },
        description: i.STATION_DESCRIPTIVE_NAME,
        title: i.STATION_NAME,
        pinColor: convertRideDataToColor(i),
        station: i,
      });
    });
    return items;
  }, [stations]);

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <RNMapView
        initialRegion={{
          latitude: 41.8775,
          longitude: -87.648,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        }}
        mapType="mutedStandard"
        showsPointsOfInterest={false}
        style={StyleSheet.absoluteFillObject}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            pinColor={marker.pinColor}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => {
              navigation.navigate('Chart', {
                stationData: marker.station,
              });
            }}
            pointerEvents="auto"
          />
        ))}
        {stations.length > 0 &&
          Object.entries(Lines).map(([key, val]) => {
            const myStations = val.map((i) => stations.find((j) => i === j.MAP_ID));
            return (
              <Polyline
                coordinates={myStations.map((i) => {
                  const vals = i?.Location ? parseLocationString(i?.Location) : [0, 0];
                  const items = stations.filter((j) => j.MAP_ID === i?.MAP_ID);
                  const lineItems = supportedLinesFromArray(items);
                  const total = lineItems.length;
                  const lineIndex = lineItems.findIndex((j) => j === key);
                  const distanceMultiplier = 0.000035;

                  return {
                    latitude:
                      vals[0] +
                      (total % 2 === 0
                        ? (lineIndex - (total / 2 - 0.5)) * distanceMultiplier
                        : (lineIndex - Math.floor(total / 2)) * distanceMultiplier),
                    longitude:
                      vals[1] +
                      (total % 2 === 0
                        ? (lineIndex - (total / 2 - 0.5)) * distanceMultiplier
                        : (lineIndex - Math.floor(total / 2)) * distanceMultiplier),
                  };
                })}
                strokeColor={key}
                strokeWidth={3}
              />
            );
          })}
      </RNMapView>
    </View>
  );
};

export default MapView;
