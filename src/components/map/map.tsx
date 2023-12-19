
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Location } from '../../types/types';

const URL_MARKER_DEFAULT = '../markup/img/svg/pin-default.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [24, 42],
  iconAnchor: [12, 40]
});

type MapProps = {
  location: Location;
}

function Map({location}: MapProps): JSX.Element {

  const mapRef = useRef(null);

  const map = useMap({ mapRef, location });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      const marker = new Marker({
        lat: location.coords[0],
        lng: location.coords[1]
      });

      marker
        .setIcon(defaultCustomIcon)
        .addTo(markerLayer);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location.coords]);

  return (
    <div className="contacts__map">
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
    </div>
  );
}

export default Map;
