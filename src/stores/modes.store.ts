import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useModesStore = defineStore('modes', () => {
  const modes = [
    { key: 'free', label: 'Free browsing' },
    { key: 'create', label: 'Create your own tour' },
    { key: 'guide', label: 'Find a Guide' },
    { key: 'community', label: 'Choose from community tours' },
    //{ key: 'favourites', label: 'Favourite POIs' },
  ];

  const selectedMode = ref(modes[0].key);

  function setMode(modeKey) {
    selectedMode.value = modeKey;
  }

  return { modes, selectedMode, setMode };
}); 