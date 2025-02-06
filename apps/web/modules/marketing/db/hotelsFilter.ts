import { type Hotel, hotelList } from "@marketing/db/hotels";

// UUIDs from your region list:
const LISBON_UUID = "c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91";
const ALGARVE_UUID = "ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42";
const NORTE_UUID = "f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5";

/**
 * Returns all hotels that include the specified region UUID.
 * @param regionUuid - The UUID of the region to filter hotels by.
 */
export const getHotelsByRegion = (regionUuid: string): Hotel[] =>
	hotelList.filter((hotel) => hotel.region?.includes(regionUuid));

// Now create specialized functions

/**
 * Returns hotels for Lisbon.
 * Note: Lisbon hotels have the Lisbon UUID, even though some also include Centro.
 */
export const getHotelsForLisbon = (): Hotel[] => getHotelsByRegion(LISBON_UUID);

/**
 * Returns hotels for Algarve.
 */
export const getHotelsForAlgarve = (): Hotel[] =>
	getHotelsByRegion(ALGARVE_UUID);

/**
 * Returns hotels for Norte.
 */
export const getHotelsForNorte = (): Hotel[] => getHotelsByRegion(NORTE_UUID);
