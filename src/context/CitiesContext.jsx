import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext();

function CitiesProviders({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error('Failed to fetch!!!');
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const getCity = useCallback(async function (id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error('Failed to fetch!!!');
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteCity = useCallback(async function (id) {
    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: 'DELETE' });
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      console.error(err);
    }
  }, []);

  const createCity = useCallback(async function (newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!res.ok) throw new Error('Failed to fetch!!!');
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CitiesContext.Provider
      value={{
        isLoading,
        cities,
        deleteCity,
        currentCity,
        getCity,
        createCity,
      }}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('useCities must be used inside citiesProviders');
  return context;
}
export { CitiesProviders, useCities };
