import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { usePoisApi } from '../api/pois.api';

export const usePoisStore = defineStore('pois', () => {
  const poisApi = usePoisApi();

  // State
  const pois = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const cache = ref(new Map()); // Cache for POIs by grid cell
  const currentBounds = ref(null);
  const currentZoom = ref(null);
  const selectedPoi = ref(null); // Store the selected POI separately

  // Computed
  const visiblePois = computed(() => {
    // Combine current POIs with selected POI if it exists and is not already in the list
    const currentPois = pois.value;
    const selected = selectedPoi.value;
    
    if (!selected) {
      return currentPois;
    }
    
    // Check if selected POI is already in the current list
    const isSelectedInCurrent = currentPois.some(poi => poi.id === selected.id);
    
    if (isSelectedInCurrent) {
      return currentPois;
    }
    
    // Add selected POI to the list if it's not already there
    return [...currentPois, selected];
  });

  // Methods
  const getGridKey = (bounds, zoom) => {
    // Create a grid key based on bounds and zoom level
    const gridSize = 2 ** Math.floor(zoom / 3);
    const latGrid = Math.floor(bounds.getCenter().lat * gridSize);
    const lngGrid = Math.floor(bounds.getCenter().lng * gridSize);
    return `${latGrid},${lngGrid},${zoom}`;
  };

  const loadPois = async (bounds, zoom) => {
    if (!bounds || !zoom) return;

    const gridKey = getGridKey(bounds, zoom);

    // Check cache first
    if (cache.value.has(gridKey)) {
      pois.value = cache.value.get(gridKey);
      currentBounds.value = bounds;
      currentZoom.value = zoom;
      return;
    }

    try {
      loading.value = true;
      error.value = null;

      const newPois = await poisApi.getPois(bounds, zoom);

      // Update state
      pois.value = newPois;
      currentBounds.value = bounds;
      currentZoom.value = zoom;

      // Cache the results
      cache.value.set(gridKey, newPois);

      // Limit cache size (keep last 10 grid cells)
      if (cache.value.size > 10) {
        const firstKey = cache.value.keys().next().value;
        cache.value.delete(firstKey);
      }
    } catch (err) {
      error.value = err.message;
      console.error('Failed to load POIs:', err);
    } finally {
      loading.value = false;
    }
  };

  const setSelectedPoi = (poi) => {
    console.log('Setting selected POI:', poi);
    selectedPoi.value = poi;
  };

  const clearSelectedPoi = () => {
    selectedPoi.value = null;
  };

  const clearCache = () => {
    cache.value.clear();
  };

  return {
    // State
    pois,
    loading,
    error,
    currentBounds,
    currentZoom,
    selectedPoi,

    // Computed
    visiblePois,

    // Methods
    loadPois,
    setSelectedPoi,
    clearSelectedPoi,
    clearCache,
  };
});
