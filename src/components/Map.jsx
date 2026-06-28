import { useUrlPosition } from '@/hooks/useUrlPosition';
import { useEffect, useRef } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { useCities } from '../context/CitiesContext';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import styles from './Map.module.css';

function Map() {
  const { cities } = useCities();
  const { isLoading, position: geoPos, error, getPosition } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();
  const hasSelectedCity = mapLat && mapLng;

  return (
    <div className={styles.mapContainer}>
      {!geoPos && !hasSelectedCity && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      {error && <p className={styles.error}>{error}</p>}

      <MapContainer
        center={[40, 0]}
        zoom={6}
        scrollWheelZoom
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cities.map(({ id, position, emoji, cityName }) => (
          <Marker position={[position.lat, position.lng]} key={id}>
            <Popup>
              <span>{emoji}</span> <span>{cityName}</span>
            </Popup>
          </Marker>
        ))}

        {geoPos && (
          <Marker position={[geoPos.lat, geoPos.lng]}>
            <Popup>📍 Your position</Popup>
          </Marker>
        )}

        <ChangeCenter mapLat={mapLat} mapLng={mapLng} geoPos={geoPos} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapLat, mapLng, geoPos }) {
  const map = useMap();
  const lastGeo = useRef(null);

  useEffect(() => {
    if (mapLat && mapLng) {
      map.setView([mapLat, mapLng]);
      lastGeo.current = null;
    } else if (geoPos && geoPos !== lastGeo.current) {
      map.setView([geoPos.lat, geoPos.lng]);
      lastGeo.current = geoPos;
    }
  }, [mapLat, mapLng, geoPos, map]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}

export default Map;
