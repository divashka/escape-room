
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect, memo } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { Location, infoBookingQuest } from '../../types/types';

const URL_MARKER_DEFAULT = './markup/img/svg/pin-default.svg';
const URL_MARKER_CURRENT = './markup/img/svg/pin-active.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [24, 42],
  iconAnchor: [12, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

type MapProps = {
  quests?: infoBookingQuest[];
  selectedQuest?: infoBookingQuest;
  onQuestMarkerClick?: (quest: infoBookingQuest) => void;
}

const locationDefault: Location = {
  address: '',
  coords: [59.968403, 30.316425],
};

function MapComponent({ quests, selectedQuest, onQuestMarkerClick }: MapProps): JSX.Element {

  const mapRef = useRef(null);

  let location: Location = locationDefault;

  if (quests) {
    location = quests[0].location;

    if (!selectedQuest) {
      selectedQuest = quests[0];
    }
  }

  const map = useMap({ mapRef, location: location });

  useEffect(() => {

    function handleMarkerClick(quest: infoBookingQuest) {
      onQuestMarkerClick?.(quest);
    }

    if (map) {
      const markerLayer = layerGroup().addTo(map);

      if (quests) {
        quests.forEach((quest) => {
          const marker = new Marker({
            lat: quest.location.coords[0],
            lng: quest.location.coords[1]
          });

          marker.addEventListener('click', () => handleMarkerClick(quest));

          marker
            .setIcon(
              quest.id === selectedQuest?.id
                ? currentCustomIcon
                : defaultCustomIcon
            )
            .addTo(markerLayer);

        });
      } else {
        const markerDefault = new Marker({
          lat: location.coords[0],
          lng: location.coords[1]
        });

        markerDefault
          .setIcon(defaultCustomIcon)
          .addTo(markerLayer);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location, quests, selectedQuest?.id, onQuestMarkerClick]);

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
