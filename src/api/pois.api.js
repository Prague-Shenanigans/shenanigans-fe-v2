import api from '../services/api-request.js';

// Track previous zoom level to only log on changes
let previousZoom = null;

// Map zoom (float) to importance (1-10)
function getImportanceForZoom(zoom) {
  if (zoom <= 12.0) return 10;
  if (zoom <= 12.5) return 9;
  if (zoom <= 13.0) return 8;
  if (zoom <= 13.5) return 7;
  if (zoom <= 14.0) return 6;
  if (zoom <= 14.5) return 5;
  if (zoom <= 15.0) return 4;
  if (zoom <= 15.5) return 3;
  if (zoom <= 16.0) return 2;
  return 1; // Zoom > 16.0
}

export const usePoisApi = () => {
  const getPois = async (bounds, zoom) => {
    try {
      const minImportance = getImportanceForZoom(zoom);

      if (previousZoom !== zoom) {
        console.log(
          `🗺️ Zoom level changed: ${previousZoom || 'initial'} → ${zoom.toFixed(
            2
          )} (Min Importance: ${minImportance})`
        );
        previousZoom = zoom;
      }

      const params = {
        bounds: {
          north: bounds.getNorth(),
          south: bounds.getSouth(),
          east: bounds.getEast(),
          west: bounds.getWest(),
        },
        zoom,
        min_importance: minImportance,
      };

      const response = await api.get('/api/pois/', { params });
      console.log('🔍 Response:', response);

      if (!response || !response.data) {
        console.error('❌ Invalid API response:', response);
        return [];
      }

      const pois = Array.isArray(response.data) ? response.data : [];
      return pois.length ? pois : [];
    } catch (error) {
      console.error('❌ Error fetching POIs:', error);
      return [];
    }
  };

  const getPoiById = async (id) => {
    try {
      const response = await api.get(`/api/pois/${id}/`);
      if (!response || !response.data) {
        console.error('❌ Invalid API response for single POI:', response);
        return null;
      }
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching single POI:', error);
      return null;
    }
  };

  return {
    getPois,
    getPoiById,
  };
};
