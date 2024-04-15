import { View, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import RNMapView, { LatLng, Marker } from 'react-native-maps';
import { parseLocationString } from '../utils';
import { useAtomValue } from 'jotai';
import { stationAtom } from '../../../jotai/atoms/stationAtom';
import { StationData } from '../../../types/station_data';

const MapView = () => {
  const stations = useAtomValue(stationAtom);

  const markers = useMemo(
    (): {
      latlng: LatLng;
      title: string;
      description: string;
      pinColor: string;
      station: StationData;
    }[] =>
      stations.map(i => {
        const latLng = parseLocationString(i.Location);
        return {
          latlng: {
            latitude: latLng[0],
            longitude: latLng[1],
          },
          description: i.STATION_DESCRIPTIVE_NAME,
          title: i.STATION_NAME,
          pinColor: 'red',
          station: i,
        };
      }),
    [stations],
  );

  return (
    <View style={{ height: '100%', width: '100%' }}>
      <RNMapView
        initialRegion={{
          latitude: 41.8775,
          longitude: -87.648,
          latitudeDelta: 0.12,
          longitudeDelta: 0.12,
        }}
        style={StyleSheet.absoluteFillObject}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            pinColor={marker.pinColor}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            onCalloutPress={() => {}}
          />
        ))}
      </RNMapView>
    </View>
  );
};

export default MapView;
