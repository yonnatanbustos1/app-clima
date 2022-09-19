import { API_KEY } from '../../.env/env'

export const getWeatherByCoords = async (LAT: number, LON: number): Promise<any> => {
  const API_COORDS = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&&appid=${API_KEY}`


  const response = await fetch(API_COORDS);
  const data = await response.json();
  console.log("coords", data)
  return data;
}

export const getWeatherBySearch = async (CITY: string) => {
  const API_CITY = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`

  const response = await fetch(API_CITY);
  const data = await response.json();
  console.log("search", data)
  return data;
}