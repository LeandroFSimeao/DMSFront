import React from 'react';
import { GoogleMap, PolylineF , useJsApiLoader } from '@react-google-maps/api';
import decodePolyline from 'decode-google-map-polyline';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapRota({ encodedPolyline }) {

  const { isLoaded } = useJsApiLoader ({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBFgNRhNl4qILL5Bnabx67zweD_vU4Rso8"
  })

  const decodeEncodedPolyline = (encodedPolyline) => {
    const decodedPath = decodePolyline(encodedPolyline);
    console.log(decodedPath)
    return decodedPath
  };
  
  const polylineCoordinates = decodeEncodedPolyline(encodedPolyline);

  const options = {
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 30000,
    paths: polylineCoordinates,
    zIndex: 1
  };

  const onLoad = polyline => {
    console.log('polyline: ', polyline)
  };

  return isLoaded ? (
    <GoogleMap
      apiKey
      mapContainerStyle={containerStyle}
      center={{lat: -19.9978019, lng: -44.0199485}}
      zoom={15}
    >
      <PolylineF  onLoad={onLoad}
      path={polylineCoordinates}
      options={options} />
    </GoogleMap>
  ) : <>  </>;
}

export default React.memo(MapRota);
