import { mockData } from './mock-data';

export const getEvents = async () => {
  return mockData;
};

export const extractLocations = (events) => {
  let extractLocations = events.map(
    (event) => event.location
  );
  let locations = [...new Set(extractLocations)];
  return locations;
};
