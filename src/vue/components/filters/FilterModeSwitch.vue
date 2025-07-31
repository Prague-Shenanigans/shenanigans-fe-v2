<template>
  <div class="mode-switch-container">
    <h3 class="mode-switch-title">Select Filter Type</h3>
    <div class="mode-buttons">
      <button
        v-for="mode in modes"
        :key="mode.key"
        class="mode-button"
        :class="{ 'active': selectedMode === mode.key }"
        @click="selectMode(mode.key)"
      >
        {{ mode.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useModesStore } from '../../../stores/modes.store';

const modesStore = useModesStore();

const modes = [
  { key: 'free', label: 'Free Browsing' },
  { key: 'create', label: 'Create Tour' },
  { key: 'guide', label: 'Find Guide' },
  { key: 'community', label: 'Community Tours' },
  { key: 'favourites', label: 'Favourites' }
];

const selectedMode = computed(() => modesStore.selectedMode);

function selectMode(modeKey) {
  modesStore.setMode(modeKey);
}
</script>

<style scoped lang="scss">
.mode-switch-container {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px solid #e9ecef;
}

.mode-switch-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

.mode-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.mode-button {
  padding: 0.8rem 1.2rem;
  border: 2px solid #E2592A;
  background: #fceac9;
  color: #E2592A;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  min-width: 120px;
  
  &:hover {
    background: #E2592A;
    color: #fceac9;
    transform: translateY(-2px);
  }
  
  &.active {
    background: #E2592A;
    color: #fceac9;
    box-shadow: 0 4px 12px rgba(226, 89, 42, 0.3);
  }
}

// Responsive design
@media (max-width: 768px) {
  .mode-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .mode-button {
    width: 100%;
    max-width: 200px;
  }
}
</style> 