import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';

const BASE_URL = 'https://6a41b0627602860e6520632b.mockapi.io';

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
};

function reducer(state, action) {
  switch (action.type) {
    case 'cities/loading':
      return { ...state, isLoading: action.payload, error: '' };
    case 'cities/cities':
      return { ...state, cities: action.payload, isLoading: false, error: '' };
    case 'cities/created':
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        error: '',
      };
    case 'cities/current':
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
        error: '',
      };
    case 'cities/deleted':
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity:
          state.currentCity.id === action.payload ? {} : state.currentCity,
        isLoading: false,
        error: '',
      };
    case 'cities/rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      console.error('Unknown Action type');
      return state;
  }
}

function CitiesProviders({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const listControllerRef = useRef(null);
  const cityControllerRef = useRef(null);
  const deleteControllerRef = useRef(null);
  const createControllerRef = useRef(null);

  useEffect(() => {
    if (listControllerRef.current) listControllerRef.current.abort();

    const controller = new AbortController();
    listControllerRef.current = controller;

    dispatch({ type: 'cities/loading', payload: true });

    async function fetchData() {
      try {
        const res = await fetch(`${BASE_URL}/cities`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch!!!');
        const data = await res.json();
        dispatch({ type: 'cities/cities', payload: data });
      } catch (err) {
        if (err.name === 'AbortError') return;
        dispatch({ type: 'cities/rejected', payload: err.message });
      }
    }
    fetchData();
    return () => listControllerRef.current?.abort();
  }, []);

  const getCity = useCallback(
    async function (id) {
      if (id === currentCity.id) return;
      if (cityControllerRef.current) cityControllerRef.current.abort();

      const controller = new AbortController();
      cityControllerRef.current = controller;

      dispatch({ type: 'cities/loading', payload: true });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Failed to fetch!!!');
        const data = await res.json();
        dispatch({ type: 'cities/current', payload: data });
      } catch (err) {
        if (err.name === 'AbortError') return;
        dispatch({ type: 'cities/rejected', payload: err.message });
      }
    },
    [currentCity.id]
  );

  const deleteCity = useCallback(async function (id) {
    if (deleteControllerRef.current) deleteControllerRef.current.abort();

    const controller = new AbortController();
    deleteControllerRef.current = controller;

    dispatch({ type: 'cities/loading', payload: true });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
        signal: controller.signal,
      });
      dispatch({ type: 'cities/deleted', payload: id });
    } catch (err) {
      if (err.name === 'AbortError') return;
      dispatch({ type: 'cities/rejected', payload: err.message });
    }
  }, []);

  const createCity = useCallback(async function (newCity) {
    if (createControllerRef.current) createControllerRef.current.abort();

    const controller = new AbortController();
    createControllerRef.current = controller;

    dispatch({ type: 'cities/loading', payload: true });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('Failed to fetch!!!');
      const data = await res.json();
      dispatch({ type: 'cities/created', payload: data });
    } catch (err) {
      if (err.name === 'AbortError') return;
      dispatch({ type: 'cities/rejected', payload: err.message });
    }
  }, []);

  useEffect(() => {
    return () => {
      cityControllerRef.current?.abort();
      deleteControllerRef.current?.abort();
      createControllerRef.current?.abort();
    };
  }, []);

  const value = useMemo(
    () => ({
      isLoading,
      cities,
      error,
      deleteCity,
      currentCity,
      getCity,
      createCity,
    }),
    [isLoading, cities, error, deleteCity, currentCity, getCity, createCity]
  );

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error('useCities must be used inside citiesProviders');
  return context;
}
export { CitiesProviders, useCities };
