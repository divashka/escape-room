
import 'leaflet/dist/leaflet.css';
import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { infoBookingQuest } from '../../types/types';

const URL_MARKER_DEFAULT = 'http://localhost:5173/markup/img/svg/pin-default.svg';
const URL_MARKER_CURRENT = 'http://localhost:5173/markup/img/svg/pin-active.svg';

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
  quests: infoBookingQuest[];
  selectedQuest?: infoBookingQuest;
  onQuestMarkerClick?: (quest: infoBookingQuest) => void;
}

function Map({ quests, selectedQuest, onQuestMarkerClick }: MapProps): JSX.Element {

  const mapRef = useRef(null);

  const location = quests[0].location;

  const map = useMap({ mapRef, location });

  if (!selectedQuest) {
    selectedQuest = quests[0];
  }

  useEffect(() => {

    function handleMarkerClick(quest: infoBookingQuest) {
      onQuestMarkerClick?.(quest);
    }

    if (map) {
      const markerLayer = layerGroup().addTo(map);
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

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, location.coords, quests, selectedQuest?.id, onQuestMarkerClick]);

  return (
    <div className="contacts__map">
      <div className="map">
        <div className="map__container" ref={mapRef}></div>
      </div>
    </div>
  );
}

export default Map;
