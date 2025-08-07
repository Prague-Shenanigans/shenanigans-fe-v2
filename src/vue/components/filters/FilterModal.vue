<template>
  <div class="filter-modal-container">
    <!-- Mode Switch -->
    
    <!-- Dynamic Filter Component -->
    <div class="modal-content">
      <component 
        :is="currentFilterComponent" 
        @filter-change="handleFilterChange"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useModesStore } from '../../../stores/modes.store';
import FreeBrowsingFilter from './FreeBrowsingFilter.vue';
import CreateTourFilter from './CreateTourFilter.vue';
import GuideFilter from './GuideFilter.vue';
import CommunityTourFilter from './CommunityTourFilter.vue';
import FavouritesFilter from './FavouritesFilter.vue';

const modesStore = useModesStore();

// Computed property for current filter component
const currentFilterComponent = computed(() => {
  const componentMap = {
    'free': FreeBrowsingFilter,
    'create': CreateTourFilter,
    'guide': GuideFilter,
    'community': CommunityTourFilter,
    'favourites': FavouritesFilter
  };
  return componentMap[modesStore.selectedMode] || FreeBrowsingFilter;
});

function handleFilterChange(filters) {
  console.log('Filters applied:', filters);
  // TODO: Implement filter logic based on mode
}
</script>

<style scoped lang="scss">
.filter-modal-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filter-content {
  flex: 1;
  overflow-y: auto;
}
</style> 