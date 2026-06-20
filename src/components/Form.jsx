// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from './Button';
import ButtonBack from './ButtonBack';

import { useUrlPosition } from '@/hooks/useUrlPosition';
import styles from './Form.module.css';
import Spinner from './Spinner';

export function convertToEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2) return '🏳️';

  try {
    const code = countryCode.toUpperCase();
    const codePoints = code
      .split('')
      .map((char) => 127397 + char.charCodeAt(0));

    const emoji = String.fromCodePoint(...codePoints);

    if (navigator.userAgent.includes('Windows')) {
      return `[${code}]`;
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
  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [emoji, setEmoji] = useState('');

  useEffect(() => {
    async function fetchData() {
      if (!lat || !lng) {
        setHasError('No location data available');
        return;
      }
      try {
        setIsLoading(true);
        setHasError(null);

        // Add timeout for fetch
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const res = await fetch(
          `${BASE_URL}?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
          {
            signal: controller.signal,
            headers: {
              'User-Agent': 'MyTravelApp/1.0 (your@email.com)', // Required by Nominatim
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
            "that dosen't seem to be a city. Click someWhere else"
          );

        // Extract address with fallbacks
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
      } catch (err) {
        console.error('Error fetching location:', err);
        setHasError(err.message || 'Failed to fetch location data');
        setCityName('');
        setCountry('');
        setEmoji('');
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

  // Error state
  if (hasError) {
    return (
      <div className={styles.form}>
        <div className={styles.error}>
          <p>⚠️ {hasError}</p>
          <Button type="primary" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
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
        <ButtonBack>&larr; Back</ButtonBack>
      </div>
    </form>
  );
}

export default Form;
