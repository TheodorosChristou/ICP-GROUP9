# Dynamic Map Component

This component renders a dynamic map using the react-leaflet library. There are 2 Dynamic Maps, one for use and one for navigation through hyperlinks on the archieve and on-going lists.

## Props

- `mapData`: An array of objects containing latitude and longitude information for markers on the map.

## Example Usage

```jsx
import DynamicMap from './DynamicMap';

const YourComponent = () => {
  const mapData = [
    { _id: '1', Lat: 51.5, Lon: 0.1, Open: true },
    { _id: '2', Lat: 51.6, Lon: 0.2, Open: false },
    // Add more data points as needed
  ];

  return (
    <div>
      <h1>Your Website</h1>
      <DynamicMap mapData={mapData} />
    </div>
  );
};

export default YourComponent;
```

## Component Structure

```tsx
<DynamicMap mapData={mapData}>
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-screen h-[95%] mt-20">
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
        {mapData.filter((r,_i) => r.Open).map((dataPoint) => (
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
</DynamicMap>
```

## Implementation Details

- Uses the react-leaflet library to render the map.

- Uses useState and useEffect hooks from React for managing component state and lifecycle.

- Renders markers for each data point provided in the mapData prop.

- Tracks user location if geolocation is supported by the browser.

