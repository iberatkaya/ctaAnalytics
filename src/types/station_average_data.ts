export interface StationAverageData {
  station_id: number;
  stationame: string;
  month_beginning: string;
  avg_weekday_rides: number;
  avg_saturday_rides: number;
  'avg_sunday-holiday_rides': number;
  monthtotal: number;
}
