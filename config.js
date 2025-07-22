import Constants from 'expo-constants';

const { manifest } = Constants;

const MAPBOX_TOKEN = manifest?.extra?.MAPBOX_TOKEN || 'sk.eyJ1IjoiYWdyb21lbnRleCIsImEiOiJjbWNqYjhlcWIwMjl4MnFwcjljbHA5NjQ3In0.plr32WPj14AWWfMv05RJ-A';
const OPENWEATHER_API_KEY = manifest?.extra?.OPENWEATHER_API_KEY || '937ae330ad815b195b0d29f82c33fe95';
const PLANET_SENTINEL_API_KEY = manifest?.extra?.PLANET_SENTINEL_API_KEY || 'PLAK2181ac0c961b458085c3ab6fb6c17bf9';

export { MAPBOX_TOKEN, OPENWEATHER_API_KEY, PLANET_SENTINEL_API_KEY };
