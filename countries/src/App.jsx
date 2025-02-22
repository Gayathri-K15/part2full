import React, { useState, useEffect } from 'react';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_SOME_KEY;  // Use the weather API key

  // Fetch countries when the search query changes
  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchCountries();
    } else {
      setCountries([]);
      setSelectedCountry(null);
      setWeather(null);
    }
  }, [searchQuery]);

  // Fetch country data from the API
  const fetchCountries = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${searchQuery}`);
      if (!response.ok) throw new Error('Failed to fetch countries');
      const data = await response.json();

      setCountries(data);
      setSelectedCountry(null);
      setWeather(null);
      setError(null);
    } catch (error) {
      setError('No countries found or failed to fetch data');
      setCountries([]);
    }
  };

  // Fetch weather data for the capital city
  const fetchWeather = async (capital) => {
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
      );
      const weatherData = await weatherResponse.json();
      if (weatherData.cod === 200) {
        setWeather(weatherData);
      } else {
        setWeather(null);
      }
    } catch (error) {
      setWeather(null);
    }
  };

  // Show details for the selected country
  const handleShowDetails = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital ? country.capital[0] : '');  // Fetch weather using the capital
  };

  // Render country details view
  const renderCountryDetails = (country) => {
    // Log the full country object to the console to inspect its structure
    console.log(country);
  
    // Check for the flag URL in the logged object
    const flagUrl = country.flags && country.flags[0]
      ? country.flags[0]
      : "https://via.placeholder.com/150?text=No+Flag";  // Fallback flag image if not available
  
    return (
      <div>
        <h2>{country.name.common}</h2>
        {/* Use the flag URL */}
        <img
          src={flagUrl}
          alt={`Flag of ${country.name.common}`}
          width="100"
        />
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'No capital'}</p>
        <p><strong>Area:</strong> {country.area} km²</p>
        <p><strong>Languages:</strong> {Object.values(country.languages || {}).join(', ')}</p>
  
        {/* Weather details */}
        {weather ? (
          <div>
            <h3>Weather in {country.capital ? country.capital[0] : 'No capital'}</h3>
            <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
            <p><strong>Weather:</strong> {weather.weather[0].description}</p>
            <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
            />
          </div>
        ) : (
          <p>Weather data not available</p>
        )}
      </div>
    );
  };
  

  // Render list of countries with buttons
  const renderCountryList = () => {
    return countries.map((country) => (
      <div key={country.cca3}>
        <p>{country.name.common}</p>
        <button onClick={() => handleShowDetails(country)}>Show Details</button>
      </div>
    ));
  };

  return (
    <div>
      <h1>Country Search</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search for a country"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Error message */}
      {error && <div>{error}</div>}

      {/* Too many matches case */}
      {countries.length > 10 && <p>Too many matches, please be more specific</p>}

      {/* List of countries */}
      {countries.length > 1 && countries.length <= 10 && renderCountryList()}

      {/* Render country details if one country is selected */}
      {selectedCountry && renderCountryDetails(selectedCountry)}

      {/* No countries found or single match case */}
      {countries.length === 1 && renderCountryDetails(countries[0])}
    </div>
  );
};

export default App;


