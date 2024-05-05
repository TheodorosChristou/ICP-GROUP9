import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markIcon from '../../public/img/mark.ico';
import userIcon from '../../public/img/user.ico';

export default function DynamicMap({ mapData }) {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [isDefaultLocation, setIsDefaultLocation] = useState<boolean>(false);
  const [hasAskedForPermission, setHasAskedForPermission] = useState<boolean>(false);
  const [hasCenteredMap, setHasCenteredMap] = useState<boolean>(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const handlePermission = async () => {
      if ('geolocation' in navigator) {
        const permission = sessionStorage.getItem('geolocationPermission');
        if (permission === 'granted') {
          try {
            navigator.geolocation.watchPosition((position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation([latitude, longitude]);
              if (!hasCenteredMap && hasAskedForPermission) {
                setHasCenteredMap(true);
              }
            });
          } catch (error) {
            console.error('Error getting user location:', error.message);
            setUserLocation([51.5072, 0.1276]);
            setIsDefaultLocation(true);
          }
        } else {
          const permissionGranted = window.confirm("Do you want to enable location services?");
          if (permissionGranted) {
            sessionStorage.setItem('geolocationPermission', 'granted');
            setHasAskedForPermission(true);
            handlePermission();
          } else {
            setUserLocation([51.5072, 0.1276]);
            setIsDefaultLocation(true);
          }
        }
      } else {
        console.error('Geolocation is not supported by your browser');
        setUserLocation([51.5072, 0.1276]);
        setIsDefaultLocation(true);
      }
    };

    handlePermission();
  }, []);

  const SetViewOnMap = () => {
    const map = useMap();
    if (userLocation && !hasCenteredMap && hasAskedForPermission) {
      map.setView(userLocation, 16);
      setHasCenteredMap(true);
    }
    return null;
  };

  const centerMapToUser = () => {
    if (userLocation) {
      mapRef.current.setView(userLocation, 16);
    }
  };

  const customIcon = new L.Icon({
    iconUrl: markIcon.src,
    iconSize: [78, 64],
  });

  const newUserIcon = new L.Icon({
    iconUrl: userIcon.src,
    iconSize: [32, 32],
  });

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center">
      <button className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded border border-gray-800" onClick={centerMapToUser}>
        Center to Marker
      </button>
      <div className="w-[80%] h-[80%]">
        <MapContainer
          ref={mapRef}
          style={{ width: '100%', height: '100%' }}
          center={userLocation || [51.5072, 0.1276]}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapData.filter((r, _i) => r.Open).map((dataPoint) => (
            <Marker position={[dataPoint.Lat, dataPoint.Lon]} icon={customIcon} key={dataPoint._id}>
              <Popup>
                <div>Lat: {dataPoint.Lat} - Lon: {dataPoint.Lon}</div>
              </Popup>
            </Marker>
          ))}
          {userLocation && (
            <Marker position={userLocation} icon={newUserIcon}>
              <Popup>
                <div>
                  <h3>
                    Latitude: {userLocation[0].toFixed(6)}, Longitude: {userLocation[1].toFixed(6)}
                  </h3>
                </div>
              </Popup>
            </Marker>
          )}
          <SetViewOnMap />
        </MapContainer>
      </div>
    </div>
  );
}
