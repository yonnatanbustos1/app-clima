import { FormEvent, useEffect, useState } from 'react'
import { getWeatherByCoords, getWeatherBySearch } from './api/FetchWeather'
import { SearchBox } from './components/SearchBox'
import { WeatherContainer } from './components/WeatherContainer'


function App() {

  const [fetchedData, setFetchedData] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {

    navigator.geolocation.getCurrentPosition(async (position) => {
      const LAT = position.coords.latitude;
      const LON = position.coords.longitude;

      try {
        const data = await getWeatherByCoords(LAT, LON);
        setFetchedData(data);
      } catch (e) {
        setError("No cuenta con coneión a internet");
      }
    })
  }, [])

  const handleSearch = async (e: FormEvent<HTMLFormElement>, CITY: string) => {
    e.preventDefault();
    setError("")
    try {
      const data = await getWeatherBySearch(CITY);

      if (data.cod === "404") {
        setError("No se encontro la ciudad");
      } else if (data.cod === "400") {
        setError("Por favor ingrese una ciudad");
      } else {
        setFetchedData(data);
      }
    } catch (err) {
      setError("No cuenta con coneión a internet")
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SearchBox handleSearch={handleSearch} />
      <WeatherContainer
        fetchedData={fetchedData}
        error={error} />
    </div>
  )
}

export default App
