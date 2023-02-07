export type IAddressData = {
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    house_number: string;
    road: string;
    city_district: string;
    city: string;
    state: string;
    ISO3166_2_lvl4: string;
    postcode: string;
    country: string;
    country_code: string;
  };
};