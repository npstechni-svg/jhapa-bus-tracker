// Pilot Route: Gauriganj to Damak Corridor, Jhapa, Nepal

export const GAURIGANJ_DAMAK_STOPS = [
  {
    id: "stop_1",
    name_en: "Gauriganj Chowk",
    name_ne: "गौरीगञ्ज चोक",
    lat: 26.46744,
    lng: 87.71075,
    order: 1,
    landmark: "Hulaki Rajmarg junction, south market"
  },
  {
    id: "stop_2",
    name_en: "Khajurgachhi Bazaar",
    name_ne: "खजुरगाछी बजार",
    lat: 26.5050,
    lng: 87.7080,
    order: 2,
    landmark: "Local market & police post"
  },
  {
    id: "stop_3",
    name_en: "Gauradaha Chowk",
    name_ne: "गौरादह चोक",
    lat: 26.5683,
    lng: 87.7025,
    order: 3,
    landmark: "Gauradaha Municipality main hub"
  },
  {
    id: "stop_4",
    name_en: "Kerkha Mod",
    name_ne: "केर्खा मोड",
    lat: 26.6210,
    lng: 87.6965,
    order: 4,
    landmark: "Kamal rural municipality feeder"
  },
  {
    id: "stop_5",
    name_en: "Damak Dakshin Gate",
    name_ne: "दमक दक्षिण गेट",
    lat: 26.6480,
    lng: 87.6930,
    order: 5,
    landmark: "Highway entry point"
  },
  {
    id: "stop_6",
    name_en: "Damak Bus Park",
    name_ne: "दमक बसपार्क",
    lat: 26.6667,
    lng: 87.6917,
    order: 6,
    landmark: "Main interchange hub near Mahendra Highway"
  }
];

export const ROUTE_PATH_COORDINATES = [
  [26.46744, 87.71075],
  [26.4800, 87.7100],
  [26.5050, 87.7080],
  [26.5350, 87.7050],
  [26.5683, 87.7025],
  [26.5950, 87.7000],
  [26.6210, 87.6965],
  [26.6480, 87.6930],
  [26.6667, 87.6917]
];

export const INITIAL_VEHICLES = [
  {
    id: "VEH_BUS_01",
    vehicle_number: "मे १ ख २४५६",
    number_en: "Me 1 Kha 2456",
    type: "bus", // "bus" | "auto" | "safari"
    driver_name: "Ramesh Rajbanshi",
    driver_phone: "9800000001",
    route: "Gauriganj ↔ Damak",
    route_ne: "गौरीगञ्ज ↔ दमक",
    status: "active",
    heading_direction: "towards_damak",
    location: {
      lat: 26.5500,
      lng: 87.7040,
      speed: 38,
      heading: 10,
      last_updated: Date.now() - 6000 // 6 seconds ago (LIVE)
    }
  },
  {
    id: "VEH_AUTO_03",
    vehicle_number: "मे १ ह ९८१२",
    number_en: "Me 1 Ha 9812",
    type: "auto",
    driver_name: "Bikash Shrestha",
    driver_phone: "9800000002",
    route: "Gauradaha ↔ Gauriganj",
    route_ne: "गौरादह ↔ गौरीगञ्ज",
    status: "active",
    heading_direction: "towards_gauriganj",
    location: {
      lat: 26.4850,
      lng: 87.7095,
      speed: 24,
      heading: 190,
      last_updated: Date.now() - 35000 // 35 seconds ago (STALE)
    }
  },
  {
    id: "VEH_SAFARI_09",
    vehicle_number: "झा १ स ४३२१",
    number_en: "Jha 1 Sa 4321",
    type: "safari",
    driver_name: "Santosh Tajpuriya",
    driver_phone: "9800000003",
    route: "Damak Bus Park Local",
    route_ne: "दमक बसपार्क लोकल",
    status: "active",
    heading_direction: "towards_damak",
    location: {
      lat: 26.6580,
      lng: 87.6922,
      speed: 16,
      heading: 5,
      last_updated: Date.now() - 12000 // 12 seconds ago (LIVE)
    }
  },
  {
    id: "VEH_BUS_02",
    vehicle_number: "मे १ ख १२८९",
    number_en: "Me 1 Kha 1289",
    type: "bus",
    driver_name: "Hari Prasad Karki",
    driver_phone: "9800000004",
    route: "Gauriganj ↔ Damak",
    route_ne: "गौरीगञ्ज ↔ दमक",
    status: "offline",
    heading_direction: "stopped",
    location: {
      lat: 26.46744,
      lng: 87.71075,
      speed: 0,
      heading: 0,
      last_updated: Date.now() - 300000 // 5 minutes ago (OFFLINE)
    }
  }
];
