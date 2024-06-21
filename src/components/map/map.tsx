import {useRef, useEffect} from 'react';
import {Icon, Marker, layerGroup} from 'leaflet';

import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '@/constants';
import useMap from '@/hooks/use-map';
import 'leaflet/dist/leaflet.css';

import {Location, City} from '@/types';

type MapProps = {
  className: string;
  points: Location[];
  selectedPoint: Location | undefined;
  city: City;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function Map({className, points, city, selectedPoint}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.latitude === selectedPoint.latitude && point.longitude === selectedPoint.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <section className={`${className} map`} ref={mapRef}/>
  );
}

export default Map;
