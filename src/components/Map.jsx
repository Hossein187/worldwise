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
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    error: geolocationError,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && !(mapLat && mapLng) && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      {geolocationError && <p className={styles.error}>{geolocationError}</p>}

      <MapContainer
        center={[40, 0]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        {geolocationPosition.lat !== mapLat &&
          geolocationPosition.lng !== mapLng && (
            <Marker
              position={[geolocationPosition.lat, geolocationPosition.lng]}>
              <Popup>
                <span>📍</span> <span>Your position</span>
              </Popup>
            </Marker>
          )}

        <ChangeCenter
          mapLat={mapLat}
          mapLng={mapLng}
          geolocationPosition={geolocationPosition}
        />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ mapLat, mapLng, geolocationPosition }) {
  const map = useMap();
  const lastCenteredGeo = useRef(null);

  useEffect(
    function () {
      if (mapLat && mapLng) {
        map.setView([mapLat, mapLng]);
      } else if (
        geolocationPosition &&
        lastCenteredGeo.current !== geolocationPosition
      ) {
        map.setView([geolocationPosition.lat, geolocationPosition.lng]);
        lastCenteredGeo.current = geolocationPosition;
      }
    },
    [mapLat, mapLng, geolocationPosition, map]
  );

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
