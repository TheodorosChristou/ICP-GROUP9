import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markIcon from '../../public/img/mark.ico';
import userIcon from '../../public/img/user.ico';
import { useRouter } from 'next/router';



export default function DynamicMap({ mapData}) {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);

  // Custom Icon for other markers
  const customIcon = new L.Icon({
    iconUrl: markIcon.src,
    iconSize: [78, 64],
  });


  const router = useRouter();


  // Custom Icon for the user's marker
  const newUserIcon = new L.Icon({
    iconUrl: userIcon.src,
    iconSize: [32, 32],
  });

  useEffect(() => {
    const { Lat, Lon } = router.query;
    const handleLocation = async () => {
          if (Lat && Lon) {
            setUserLocation([parseFloat(Lat as string), parseFloat(Lon as string)]);
          } else {
            console.error("Latitude or longitude not found in router query parameters.");
          }
    }

    handleLocation();
  }, [router.query]);

  const SetViewOnMap = () => {
    const map = useMap();
    if (userLocation) {
      map.setView(userLocation, 16);
    }
    return null;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-screen h-[95%] mt-20 ">
        {/* Map Rendering */}
        <MapContainer
          style={{ width: '100%', height: '100%' }}
          center={userLocation || [51.5072, 0.1276]}
          zoom={16}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Rendering a marker for each datapoint in the mapData array */}
          {mapData.filter((r,_i) => r.Open).map((dataPoint) => (
            <Marker position={[dataPoint.Lat, dataPoint.Lon]} icon={customIcon} key={dataPoint._id}>
              {/* Popup for each data point */}
              <Popup>
                <div>Lat: {dataPoint.Lat} - Lon: {dataPoint.Lon}</div>
              </Popup>
            </Marker>
          ))}
          {/* Rendering a marker for the user with the new user icon only when permission is granted and not at the hardcoded coordinates */}
          {userLocation && (
            <Marker position={userLocation} icon={newUserIcon}>
              {/* Popup for enabling location access */}
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