import React from 'react';
import { GoogleMap, MarkerF ,Polyline , useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapContainer({ latitude, longitude }) {
  const center = {
    lat: parseFloat(latitude.replace(",",".")),
    lng: parseFloat(longitude.replace(",","."))
  };

  const { isLoaded } = useJsApiLoader ({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBFgNRhNl4qILL5Bnabx67zweD_vU4Rso8"
  })

  return isLoaded ? (
    <GoogleMap
      apiKey
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
    >
      <MarkerF position={center} />
      <Polyline />
    </GoogleMap>
  ) : <>  </>;
}

export default React.memo(MapContainer);
