import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { stationAtom } from './jotai/atoms/stationAtom';
import { StationData } from './types/station_data';
import { StationAverageData } from './types/station_average_data';
import { stationAverageAtom } from './jotai/atoms/stationAverageAtom';
import MainStack from './navigation';

function App() {
  const [_station, setStations] = useAtom(stationAtom);
  const [_average, setStationAverage] = useAtom(stationAverageAtom);
  const loadStationData = async () => {
    const stationsData = require('./assets/stations.json') as StationData[];
    setStations(stationsData);
  };
  const loadStationAverageData = async () => {
    const stationsData =
      require('./assets/average.json') as StationAverageData[];
    setStationAverage(stationsData);
  };

  useEffect(() => {
    loadStationData();
    loadStationAverageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MainStack />;
}

export default App;
