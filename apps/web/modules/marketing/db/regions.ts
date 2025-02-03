// regions.ts
type regionType = "city" | "region"
// Define the Region interface.
export interface Region {
  uuid: string;
  region: string;
  center: [number, number];
  type: regionType
  main: boolean;
  image: string;
}

export interface RegionData {
  [uuid: string]: Region;
}

// Export the region list with complete data and UUIDs.
export const regionList: Region[] = [
  {
    uuid: "c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91",
    region: "Lisboa",
    center: [38.7223, -9.1393],
    type: "city",
    main: true,
    image: "/images/assets/lisboa.jpg"
  },
  {
    uuid: "6e3c11f3-3a28-4e2b-bf9e-6713c45b0a6a",
    region: "Porto",
    type: "city",
    center: [41.1579, -8.6291],
    main: true,
    image: "/images/assets/porto.jpg"
  },
  {
    uuid: "ea3f9a57-2c8b-40d8-8f51-7f9f8d8a27cb",
    region: "Arquipélagos",
    center: [32.6669, -16.9241],
    type: "region",
    main: false,
    image: "/images/assets/ilhas.jpg"
  },
  {
    uuid: "ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42",
    region: "Algarve",
    center: [37.0194, -7.9304],
    type: "region",
    main: false,
    image: "/images/assets/algarve.jpg"
  },
  {
    uuid: "ba9a11fa-3d9d-4d2b-90f8-6b987d0a2c34",
    region: "Centro",
    center: [40.2056, -8.4294],
    type: "region",
    main: false,
    image: "/images/assets/centro.jpg"
  },
  {
    uuid: "d1a5a76f-7a8f-4b92-9a3f-abc1d1e2f345",
    region: "Alentejo",
    center: [38.57, -7.91],
    type: "region",
    main: false,
    image: "/images/assets/alentejo.webp"
  },
  {
    uuid: "f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5",
    region: "Norte",
    type: "region",
    center: [41.0, -8.0],
    main: false,
    image: "/images/assets/norte.png"
  }
];


export const regionObj: RegionData = regionList.reduce((acc, region) => {
  acc[region.uuid] = region;
  return acc;
}, {} as RegionData);