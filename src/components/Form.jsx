// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useUrlPosition } from '@/hooks/useUrlPosition';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Button from './Button';
import ButtonBack from './ButtonBack';
import Spinner from './Spinner';

import { useCities } from '@/context/CitiesContext';
import { useNavigate } from 'react-router-dom';
import styles from './Form.module.css';

export function convertToEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🏳️';

  try {
    const code = countryCode.toUpperCase();
    const codePoints = code
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));

    const emoji = String.fromCodePoint(...codePoints);

    if (navigator.userAgent.includes('Windows')) {
      return `${code}`;
    }
    return emoji;
  } catch (error) {
    console.warn('Emoji conversion failed:', error);
    return countryCode.toUpperCase();
  }
}

const BASE_URL = 'https://nominatim.openstreetmap.org/reverse';

function Form() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading: isCreatingCity } = useCities();
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [emoji, setEmoji] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!lat || !lng) {
        setHasError('No location data available, Choose somewhere to see');
        setIsButtonDisabled(true);
        return;
      }
      try {
        setIsLoading(true);
        setHasError(null);
        setIsButtonDisabled(true);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(
          `${BASE_URL}?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          {
            signal: controller.signal,
            headers: {
              'User-Agent': 'MyTravelApp/1.0 (your@email.com)',
            },
          }
        );

        clearTimeout(timeoutId);

        if (!res.ok) {
          if (res.status === 429) {
            throw new Error('Rate limit exceeded. Please wait a moment.');
          }
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        console.log('Location data:', data);

        if (!data.address.country_code)
          throw new Error(
            "that doesn't seem to be a city. Click someWhere else"
          );

        const address = data.address || {};
        const city =
          address.city ||
          address.town ||
          address.village ||
          address.locality ||
          address.province ||
          address.county ||
          '';

        const countryName = address.country || '';
        const code = address.country_code || '';

        setCityName(city);
        setCountry(countryName);
        setEmoji(code);
        setIsButtonDisabled(false);
      } catch (err) {
        console.error('Error fetching location:', err);
        setHasError(err.message || 'Failed to fetch location data');
        setCityName('');
        setCountry('');
        setEmoji('');
        setIsButtonDisabled(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [lat, lng]);

  if (isLoading) {
    return (
      <div className={styles.form}>
        <div className={styles.loading}>
          <p>Loading location data...</p>
          <Spinner />
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className={styles.form}>
        <div className={styles.error}>
          <p>⚠️ {hasError}</p>
          <Button type="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
          <ButtonBack disabled={false} to="/app/cities">
            &larr; Back
          </ButtonBack>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji: convertToEmoji(emoji),
      date,
      notes,
      position: { lat, lng },
    };
    // console.log(newCity);
    await createCity(newCity);
    navigate('/app/cities');
  }

  return (
    <form
      className={`${styles.form} ${isCreatingCity ? styles.loading : ''}`}
      onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{convertToEmoji(emoji)}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack disabled={isButtonDisabled} to="/app/cities">
          &larr; Back
        </ButtonBack>
      </div>
    </form>
  );
}

export default Form;
