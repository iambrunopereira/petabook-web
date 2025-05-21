import { type Hotel, hotelList } from "@marketing/db/hotels";

// UUIDs from your region list:
const LISBON_UUID = "c5d53de2-15e5-4fa8-a0f3-9c4b30b18a91";
const ALGARVE_UUID = "ae4d2c60-5f3f-4b2d-8e2d-7c2b8b6a9e42";
const NORTE_UUID = "f0d2c8a9-5f7a-4e30-b8a4-d3b9a8f7e6c5";

/**
 * Randomly shuffles an array using Fisher–Yates algorithm.
 */
const shuffleHotels = (hotels: Hotel[]): Hotel[] => {
	const shuffled = [...hotels];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
};

/**
 * Returns all hotels that include the specified region UUID.
 * @param regionUuid - The UUID of the region to filter hotels by.
 */
export const getHotelsByRegion = (regionUuid: string): Hotel[] =>
	shuffleHotels(
		hotelList.filter((hotel) => hotel.region?.includes(regionUuid)),
	);

/**
 * Returns shuffled hotels for Lisbon.
 */
export const getHotelsForLisbon = (): Hotel[] => getHotelsByRegion(LISBON_UUID);

/**
 * Returns shuffled hotels for Algarve.
 */
export const getHotelsForAlgarve = (): Hotel[] =>
	getHotelsByRegion(ALGARVE_UUID);

/**
 * Returns shuffled hotels for Norte.
 */
export const getHotelsForNorte = (): Hotel[] => getHotelsByRegion(NORTE_UUID);

export const getHotelsPartners = (): Hotel[] =>
	shuffleHotels(hotelList.filter((hotel) => hotel.petabookPartner));
