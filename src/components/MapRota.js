import React from 'react';
import { GoogleMap, PolylineF , useJsApiLoader } from '@react-google-maps/api';
import decodePolyline from 'decode-google-map-polyline';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function MapRota({ }) {

  const { isLoaded } = useJsApiLoader ({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBFgNRhNl4qILL5Bnabx67zweD_vU4Rso8"
  })

  const encodedPolyline = "nhyxB~ewkGq@cBoCeIyAuDc@wA[q@Wu@_CsGeHwRmDwJqByFCYMo@CQmA}C[u@cAwC[_A@CDOBK?QCWMUOIYEU@KFSVGVARWP}@`@sB|@uAh@yEnByBz@yAl@UNWh@CVMvEGjB[AiBEIrBAZuBKBs@Bo@RiCBCP?nA@nBD\\@OxFClA[fHBFHJF@LADSN}HFaDLgFDiANg@N_@Zg@HIrEkBrEqBfDuARIjAa@@@HFHDZBXEROHSBWRQ\\WnL_F~DgBbBu@n@Wz@U`@Eh@EdSG~MCxAIbBWdCw@dEcBjFqBbA]r@Mr@ItACn@HdAXXJxBrAnB~@n@Rl@Fz@BpAGr@Mx@[d@Wr@m@bAmAb@m@pAaBVQRKJMx@q@bAo@nBs@LEdBe@~F{AnCy@dAYjBe@`IyBzGwAbLwBxIeBpHwApFaAdAUvApEz@jCxE{@b@KpA`CtC~ElDjGjAtBfQbG|Br@x@TTDFd@NhAHd@j@bDt@~Ej@|C`A`FBLCMa@oB]iBK@[H}A^l@|B`@lBqBx@YPc@h@gBvC}AlCqA`CSRi@Na@HyAVkBd@y@VBZ^bCl@jF\\hCXdCFhAF|B?pEuBtBwDtD_@dBa@bCKbASjCGZOZ_@\\WHY@a@Ae@EUN_A`@MHEHS|@Aj@H`@Vr@Rr@Mh@EDe@B}AFgDNaAJmAf@eB`ACAGCGAO?SJOPCPB\\BHBBqA`BwD~DgBzBq@l@m@tAOd@Oj@{@QUIy@a@[Mm@S[GaBCWAm@_@a@G]@_@Vq@p@iBbBuBjBmC|BiB|AsCjCeErDsHtGwBlBuArAi@n@ORq@n@HJAb@GvBEpC?`@IVIjAy@zFs@fCmArEFtA?@A??@A@?B?F@BHjEDn@@BDPj@|JB`@CXHt@?b@@XHp@AB@B@f@BL@XFr@\\zAgAhJuBdQ[@u@Cw@KcA]_@SRq@Fa@Dg@?m@A}JAaDA_@Ms@]y@SYu@q@_CqBMKKEO?KBKHITYj@uBlCgA|As@nAWn@g@fBWfAk@pCg@tAm@`AC@C@A?qAaBiB_Bi@[o@[q@WkB]uCc@uC]}KsA}Dk@u@KCECA]SAAECSCGDA@g@Bq@K{AOkAEk@Kq@@CFEDSDu@F_@@oAEK?SIQSOw@Cg@?k@DkAHs@PcAd@aBf@mAh@aAnHaM~BsD|EmHdCuDfA{Al@cAf@eAz@cCb@iBViBLgBBmAAu@IuBMwAMw@Mq@_A{CqD{J{CmICQAOw@kBiCgHGQiAgDuGqQ";

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
