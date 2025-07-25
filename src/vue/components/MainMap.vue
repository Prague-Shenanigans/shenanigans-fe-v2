<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-container"></div>

    <div class="location-control">
      <q-btn round flat color="grey" icon="my_location" @click="centerOnUser">
        <q-tooltip>Get my location</q-tooltip>
      </q-btn>
    </div>

    <FreeBrowsingMode v-if="currentMode === 'free'" :pois="pois" :selected-poi="selectedPoi" @closeDesktopPanel="selectedPoi = null" />
    <CreateTourMode v-else-if="currentMode === 'create'" :pois="pois" :selected-poi="selectedPoi" />
    <FindGuideMode v-else-if="currentMode === 'guide'" :pois="pois" :selected-poi="selectedPoi" />
    <CommunityToursMode v-else-if="currentMode === 'community'" :pois="pois" :selected-poi="selectedPoi" />
    <FavouritePoisMode v-else-if="currentMode === 'favourites'" :pois="pois" :selected-poi="selectedPoi" />
  </div>
</template>

<script setup lang="ts">
// ===================== IMPORTS =====================
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
//import type { Feature, LineString } from 'geojson';
import { QBtn, QTooltip } from 'quasar';
import { usePoisStore } from '../../stores/pois.store';
import { useModesStore } from '../../stores/modes.store';
//import { useLocationStore } from '../../stores/location';

// @ts-ignore
import FreeBrowsingMode from 'src/vue/components/modes/FreeBrowsingMode.vue';
// @ts-ignore
import CreateTourMode from 'src/vue/components/modes/CreateTourMode.vue';
// @ts-ignore
import FindGuideMode from 'src/vue/components/modes/FindGuideMode.vue';
// @ts-ignore
import CommunityToursMode from 'src/vue/components/modes/CommunityToursMode.vue';
// @ts-ignore
import FavouritePoisMode from 'src/vue/components/modes/FavouritePoisMode.vue';

// ===================== VARIABLES =====================
const mapContainer = ref<HTMLDivElement | null>(null);
const mapInstance = ref(null);
const userMarker = ref(null);
const poisPanelRef = ref(null);
const poiMarkers = ref([]);
const selectedPoi = ref(null);

const poisStore = usePoisStore();
const modesStore = useModesStore();
const currentMode = computed(() => modesStore.selectedMode);
const pois = computed(() => poisStore.visiblePois);

// Watch for mode changes and log pois
watch(currentMode, (newMode) => {
  console.log(`[MODE: ${newMode}]`, pois.value);
});

// @ts-ignore
const { VITE_MAPBOX_TOKEN } = import.meta.env;

mapboxgl.accessToken = VITE_MAPBOX_TOKEN;

// ===================== METHODS =====================
function centerOnUser() {
  if (!navigator.geolocation || !mapInstance.value) return;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      mapInstance.value?.flyTo({ center: [lng, lat], zoom: 14 });

      if (userMarker.value) {
        userMarker.value.setLngLat([lng, lat]);
      } else {
        
        userMarker.value = new mapboxgl.Marker({
          color: '#4285f4',
        })
          .setLngLat([lng, lat])
          .addTo(mapInstance.value);
      }
    },
    (error) => {
      console.error('Error getting user location:', error);
    },
  );
}

const loadPoisForCurrentView = () => {
  if (!mapInstance.value) return;

  const bounds = mapInstance.value.getBounds();
  const zoom = mapInstance.value.getZoom();

  poisStore.loadPois(
    {
      getNorth: () => bounds.getNorth(),
      getSouth: () => bounds.getSouth(),
      getEast: () => bounds.getEast(),
      getWest: () => bounds.getWest(),
      getCenter: () => ({
        lat: bounds.getCenter().lat,
        lng: bounds.getCenter().lng,
      }),
    },
    zoom,
  );
};

function handleMarkerSelect(poi) {
  selectedPoi.value = poi;
  setTimeout(() => {
    poisPanelRef.value?.setCurrentState(1);
  }, 50);
}

function addPOIMarkers() {
  poiMarkers.value.forEach((marker) => marker.remove());
  poiMarkers.value = [];

  poisStore.visiblePois.forEach((poi) => {
    const el = document.createElement('div');
    el.className = 'poi-marker';

    if (poi.icon_url) {
      el.style.backgroundImage = `url('${poi.icon_url}')`;
      el.style.backgroundSize = 'contain';
      el.style.backgroundRepeat = 'no-repeat';
      el.style.width = '50px';
      el.style.height = '50px';
    } else {
      el.style.backgroundColor = '#4285f4';
      el.style.borderRadius = '50%';
      el.style.width = '36px';
      el.style.height = '36px';
    }

    if (mapInstance.value) {
  const marker = new mapboxgl.Marker({ element: el })
    .setLngLat([poi.longitude, poi.latitude])
    .addTo(mapInstance.value); // ✅ fix here

  marker.getElement().addEventListener('click', () => {
    handleMarkerSelect(poi);
  });

  poiMarkers.value.push(marker);
}
  });
}

// ===================== WATCHERS =====================
watch(() => poisStore.visiblePois, addPOIMarkers);

// ===================== LIFECYCLE =====================
onMounted(() => {
  if (!mapContainer.value) return;

  mapInstance.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/pavelios/cm98f1xwb00gn01pga6fd3plv?optimize=true',
    center: [14.4378, 50.0755],
    zoom: 13,
    pitch: 60,
    bearing: -17.6,
  });

  mapInstance.value.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

  mapInstance.value.on('load', () => {
    loadPoisForCurrentView();
    mapInstance.value?.on('moveend', loadPoisForCurrentView);
    mapInstance.value?.on('zoomend', loadPoisForCurrentView);
  });
});

onUnmounted(() => {
  if (mapInstance.value) {
    mapInstance.value.off('moveend', loadPoisForCurrentView);
    mapInstance.value.off('zoomend', loadPoisForCurrentView);
    mapInstance.value.remove();
  }
  poiMarkers.value.forEach((marker) => marker.remove());
});
</script>

<style scoped lang="scss">
.map-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.map-container {
  width: 100%;
  height: 100%;
}

.location-control {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  padding: 4px;
}

.poi-marker {
  cursor: pointer;
  background-color: #4285f4;
  border-radius: 50%;
}
</style>

