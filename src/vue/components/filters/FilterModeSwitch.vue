<template>
  <div class="mode-switch-container">
    <!-- Desktop Layout -->
    <div class="mode-buttons desktop-layout">
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

    <!-- Mobile/Tablet Layout -->
    <div class="mobile-layout">
      <div 
        class="mode-selector"
        :class="{ 'expanded': isExpanded }"
        @click="toggleExpanded"
      >
        <div class="selected-mode">
          <span class="dropdown-arrow" :class="{ 'rotated': isExpanded }">▼</span>
          <span class="mode-label">{{ getSelectedModeLabel() }}</span>
        </div>
        
        <div class="mode-dropdown" :class="{ 'show': isExpanded }">
          <button
            v-for="mode in modes"
            :key="mode.key"
            class="mode-option"
            :class="{ 'active': selectedMode === mode.key }"
            @click.stop="selectModeAndClose(mode.key)"
          >
            {{ mode.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
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
const isExpanded = ref(false);

function selectMode(modeKey) {
  modesStore.setMode(modeKey);
}

function selectModeAndClose(modeKey) {
  selectMode(modeKey);
  isExpanded.value = false;
}

function toggleExpanded() {
  isExpanded.value = !isExpanded.value;
}

function getSelectedModeLabel() {
  const selectedModeObj = modes.find(mode => mode.key === selectedMode.value);
  return selectedModeObj ? selectedModeObj.label : 'Select Mode';
}
</script>

<style scoped lang="scss">
.mode-switch-container {
  width: 100%;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: 0;
}

// Desktop Layout
.desktop-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.mode-button {
  padding: 0.6rem 1rem;
  border: 2px solid #fceac9;
  background: #fceac9;
  color: #E2592A;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Amatic SC', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 100px;
  
  &:hover {
    background: rgba(252, 234, 201, 0.9);
    transform: translateY(-1px);
  }
  
  &.active {
    background: #2B1108;
    color: #fceac9;
    border-color: #2B1108;
    box-shadow: 0 2px 8px rgba(43, 17, 8, 0.4);
  }
}

// Mobile/Tablet Layout
.mobile-layout {
  display: none;
}

.mode-selector {
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  background: transparent;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.selected-mode {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background: #2B1108;
  color: #fceac9;
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Amatic SC', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  
  .dropdown-arrow {
    font-size: 0.8rem;
    transition: transform 0.3s ease;
    color: #fceac9;
    
    &.rotated {
      transform: rotate(180deg);
    }
  }
  
  .mode-label {
    flex: 1;
    text-align: center;
  }
}

.mode-dropdown {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: #2B1108;
  
  &.show {
    max-height: 300px;
  }
}

.mode-option {
  width: 100%;
  padding: 0.8rem 1rem;
  border: none;
  background: #fceac9;
  color: #E2592A;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Amatic SC', sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  
  &:hover {
    background: rgba(252, 234, 201, 0.9);
  }
  
  &.active {
    background: #2B1108;
    color: #fceac9;
    font-weight: 700;
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid rgba(252, 234, 201, 0.3);
  }
}

// Responsive design
@media (max-width: 768px) {
  .desktop-layout {
    display: none;
  }
  
  .mobile-layout {
    display: block;
  }
}
</style> 