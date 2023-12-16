
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { memo } from 'react';

const URL_MARKER_DEFAULT = '../markup/img/svg/pin-default.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [24, 42],
  iconAnchor: [12, 40]
});

const location = {
  latitude: 59.968403,
  longitude: 30.316425,
  zoom: 15
};

function MapComponent(): JSX.Element {

  const mapRef = useRef(null);

  const map = useMap({ mapRef, location });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      const marker = new Marker({
        lat: location.latitude,
        lng: location.longitude
      });

      marker
        .setIcon(defaultCustomIcon)
        .addTo(markerLayer);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map]);

  return (
    <div className="contacts__map">
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
    </div>
  );
}

const Map = memo(MapComponent);

export default Map;
