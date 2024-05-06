import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markIcon from '../../public/img/mark.ico';
import userIcon from '../../public/img/user.ico';
import { useSession } from 'next-auth/react';

export default function DynamicMap({ mapData }) {
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const [isDefaultLocation, setIsDefaultLocation] = useState<boolean>(false);
  const [hasAskedForPermission, setHasAskedForPermission] = useState<boolean>(false);
  const [hasCenteredMap, setHasCenteredMap] = useState<boolean>(false);
  const mapRef = useRef(null);
  const [weatherHoverIndex, setWeatherHoverIndex] = useState(null);
  const [windHoverIndex, setWindHoverIndex] = useState(null);
  const [pressureHoverIndex, setPressureHoverIndex] = useState(null);
  const [humitidyHoverIndex, setHumitidyHoverIndex] = useState(null);


  const { data: session } = useSession();

  let user, role;


  

  if (session?.user?.name?.toString()) {
    user = session.user.name;
    role = session.user.role;
  }

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
  
  const centerMapToPoint = (lat,lon) => {
    if (lat != null && lon != null) {
      console.log(lat,lon)
      mapRef.current.setView([lat,lon], 16);
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
      <div className=" w-[100%] h-[100%] z-0">
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
        <div className='absolute right-0'>
          <button className="bg-cyan-700 text-white font-bold py-1.5 px-4 rounded border border-gray-800" onClick={centerMapToUser}>
            Center to Marker
        </button>
      </div>

      </div>
      <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
              <th scope="col" className="px-6 py-3" data-test="ticket-hedding">
                  Ticket Number
                </th>
                <th scope="col" className="px-6 py-3" data-test="lat-hedding">
                  Latitude
                </th>
                <th scope="col" className="px-6 py-3" data-test="lon-hedding">
                  Longitutde  
                </th>
                <th scope="col" className="px-6 py-3" data-test="observation-hedding">
                  Observation
                </th>
                <th scope="col" className="px-6 py-3" data-test="weather-hedding">
                  Weather Information
                </th>
                {(role == "admin" || process.env.NEXT_PUBLIC_TESTING) && (<th scope="col" className="px-6 py-3" data-test="response-hedding">
                  Response
                </th>)}
                {(role == "admin" || process.env.NEXT_PUBLIC_TESTING) && (<th scope="col" className="px-6 py-3" data-test="response-desc-hedding">
                  Response Description
                </th>)}
                <th scope="col" className="px-6 py-3" data-test="action-hedding">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {mapData?.map((r, i) => (
                <tr className="bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white  break-words">
                    {r._id.slice(-5).toUpperCase()}
                  </th>
                  <td className="px-6 py-4  break-words">
                    {r.Lat}
                  </td>
                  <td className="px-6 py-4  break-words">
                    {r.Lon}
                  </td>
                  <td className="px-6 py-4  break-words">
                    {r.Observation}
                  </td>
                  <td className="px-6 py-4 flex items-center mt-4">
                    <div
                      className="relative inline-block cursor-pointer"
                      onMouseEnter={() => setWeatherHoverIndex(i)}
                      onMouseLeave={() => setWeatherHoverIndex(null)}
                    >
                      <img
                      
                        src="/img/weather.ico"
                        alt="Weather icon"
                        className="h-5 w-5 text-blue-500 hover:text-blue-600 "
                        data-test="temp-icon"
                      />
                      {weatherHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-8rem] font-bold text-black" data-test="temp-popup" >
                          <p data-test="temp-title" >Temperature: {r.WeatherTemperature}Â°</p>
                          <p data-test="temp-desc" >Description: {r.WeatherDescription}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative inline-block cursor-pointer ml-4"
                      onMouseEnter={() => setWindHoverIndex(i)}
                      onMouseLeave={() => setWindHoverIndex(null)}
                    >
                      <img
                        src="/img/wind.ico"
                        alt="Wind icon"
                        className="h-5 w-5 text-green-500 hover:text-green-600"
                        data-test="wind-icon"
                      />
                      {windHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-7rem] font-bold text-black" data-test="window-popup">
                          <p data-test="wind-speed">Speed: {r.WindSpeed}</p>
                          <p data-test="wind-desc">Direction: {r.WindDirection}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative inline-block cursor-pointer ml-4"
                      onMouseEnter={() => setPressureHoverIndex(i)}
                      onMouseLeave={() => setPressureHoverIndex(null)}
                    >
                      <img
                        src="/img/pressure.ico"
                        alt="Pressure icon"
                        className="h-5 w-5 text-green-500 hover:text-green-600"
                        data-test="pressure-icon"
                      />
                      {pressureHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-4rem] font-bold text-black" data-test="pressure-popup">
                          <p data-test="pressure-text">Pressure: {r.AtmosphericPressure}</p>
                        </div>
                      )}
                    </div>
                    <div
                      className="relative inline-block cursor-pointer ml-4"
                      onMouseEnter={() => setHumitidyHoverIndex(i)}
                      onMouseLeave={() => setHumitidyHoverIndex(null)}
                    >
                      <img
                        src="/img/humitidy.ico"
                        alt="Humitidy icon"
                        className="h-5 w-5 text-green-500 hover:text-green-600"
                        data-test="humidity-icon"
                      />
                      {humitidyHoverIndex === i && (
                        <div className="absolute bg-white border border-gray-300 shadow-md p-2 rounded-md mt-1 top-[-7rem] font-bold text-black" data-test="humidity-popup">
                          <p data-test="humidity-title">Humidity: {r.Humidity}</p>
                          <p data-test="humidity-vis">Visibility: {r.Visibility}</p>
                        </div>
                      )}
                    </div>
                  </td>
                  {(role == "admin" || process.env.NEXT_PUBLIC_TESTING) && (<td className="px-6 py-4  break-words">
                    {r.Response.length != 0 && (<div className="">{r.Response?.map((r, i) => (<p key={i + 27}>{r}</p>))}</div>)}
                  </td>)}
                  {(role == "admin" || process.env.NEXT_PUBLIC_TESTING) && (<td className="px-6 py-4  break-words">
                    {r.ResponseDescription}
                  </td>)}
                  <td className="px-6 py-4  break-words">
                    <button className="bg-cyan-700 text-white font-bold py-1.5 px-4 rounded border border-gray-800" onClick={() => centerMapToPoint(r.Lat,r.Lon)}>
                      Center to Incident
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

    </div>
  );
}
