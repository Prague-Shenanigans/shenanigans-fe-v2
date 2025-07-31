<template>
  <div class="default-layout">
    <!-- Top Navigation Bar -->
    <header class="top-bar">
      <!-- Logo and Filter Button -->
      <div class="logo-container">
        <img src="/web_logo_v3.png" alt="Shenanigans Logo" class="logo" />
        <button
          class="filter-button nav-button"
          :class="{ 'active-filter': filterActive }"
          @click="toggleFilter"
        >
          {{ filterButtonText }}
        </button>
      </div>

      <!-- Navigation Buttons -->
      <nav class="nav-actions">
        <a
          href="https://shenanigans.cz/#/mission"
          class="nav-button -rotate-1"
          :class="{ 'active-nav': activeNav === 'mission' }"
          @click.prevent="navigate('mission')"
        >
          Mission
        </a>
        <a
          href="https://shenanigans.cz/#/explore"
          class="nav-button rotate-1"
          :class="{ 'active-nav': activeNav === 'explore' }"
          @click.prevent="navigate('explore')"
        >
          Explore
        </a>
        <a
          href="https://shenanigans.cz/#/meet"
          class="nav-button -rotate-1"
          :class="{ 'active-nav': activeNav === 'meet' }"
          @click.prevent="navigate('meet')"
        >
          Meet the People
        </a>

        <!-- Hamburger -->
        <div ref="hamburgerContainer" class="hamburger-container">
          <button
            class="hamburger hamburger-button rotate-1"
            :class="{ 'active-hamburger': menuOpen }"
            @click="toggleMenu"
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
          <div v-if="menuOpen" class="menu-dropdown">
            <ul>
              <li v-for="mode in modesStore.modes" :key="mode.key">
                <a
                  href="#"
                  class="nav-button"
                  @click.prevent="selectMode(mode.key)"
                >
                  {{ mode.label }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Main Content -->
    <div class="layout-content">
      <slot />
    </div>
    
    <!-- Filter Modal -->
    <div v-if="filterModalOpen" class="modal-overlay" @click="closeFilterModal">
      <div class="modal-container" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h3 class="modal-title">{{ modalTitle }}</h3>
          <button class="close-btn" @click="closeFilterModal">
            <span class="close-icon">×</span>
          </button>
        </div>

                  <!-- Content -->
          <div class="modal-content">
            <FilterModal />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useModesStore } from '../stores/modes.store';
import FilterModal from '../vue/components/filters/FilterModal.vue';

const menuOpen = ref(false);
const activeNav = ref('explore');
const filterActive = ref(false);
const filterModalOpen = ref(false);
const modesStore = useModesStore();
const hamburgerContainer = ref(null);

// Computed property for filter button text based on selected mode
const filterButtonText = computed(() => {
  const modeMap = {
    'free': 'Filter Places',
    'create': 'Update Tour preferences',
    'guide': 'Filter Guides',
    'community': 'Filter Tours',
    'favourites': 'Filter Favourites'
  };
  return modeMap[modesStore.selectedMode] || 'Filter';
});

// Computed property for modal title
const modalTitle = computed(() => {
  return 'Filters & Preferences';
});

function toggleFilter() {
  filterModalOpen.value = true;
  filterActive.value = true;
}

function closeFilterModal() {
  filterModalOpen.value = false;
  filterActive.value = false;
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
function selectMode(modeKey) {
  modesStore.setMode(modeKey);
  menuOpen.value = false;
}
function navigate(section) {
  activeNav.value = section;
  window.location.href = `https://shenanigans.cz/#/${section}`;
}

// Close dropdown on outside click
function handleClickOutside(event) {
  if (
    menuOpen.value &&
    hamburgerContainer.value &&
    !hamburgerContainer.value.contains(event.target)
  ) {
    menuOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* Top Bar */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(to bottom, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

/* Logo */
.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo-container .logo {
  height: 80px;
  width: auto;
  rotate: -2deg;
}

/* Filter Button */
.filter-button {
  background-color: #fceac9 !important;
  border-color: #2e9000 !important;
  color: #2e9000 !important;
  font-size: 1.2rem !important;
  padding: 0.4rem 1.2rem !important;
}

.filter-button:hover {
  background-color: #2e9000 !important;
  color: #fceac9 !important;
  transform: scale(1.05);
}

.active-filter {
  background-color: #2e9000 !important;
  color: #fceac9 !important;
}

/* Navigation Buttons */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-button {
  position: relative;
  padding: 0.5rem 1.5rem;
  font-size: 1.4rem;
  font-family: 'Amatic SC', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  color: #E2592A;
  background-color: #fceac9;
  border: 3px solid #E2592A;
  border-radius: 10px;
  clip-path: polygon(
    0% 15%,
    5% 15%,
    5% 0%,
    95% 0%,
    95% 15%,
    100% 15%,
    100% 85%,
    95% 85%,
    95% 100%,
    5% 100%,
    5% 85%,
    0% 85%
  );
  transition: transform 0.2s ease-in-out;
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  text-align: center;
}
.nav-button:hover {
  transform: scale(1.05);
}
.active-nav {
  background-color: #E2592A;
  color: #fceac9;
}

/* Rotation */
.-rotate-1 {
  transform: rotate(-1deg);
}
.rotate-1 {
  transform: rotate(1deg);
}

/* Hamburger button */
.hamburger-button {
  background-color: #fceac9;
  border: 3px solid #E2592A;
  border-radius: 10px;
  clip-path: polygon(
    0% 20%,
    10% 20%,
    10% 0%,
    90% 0%,
    90% 20%,
    100% 20%,
    100% 80%,
    90% 80%,
    90% 100%,
    10% 100%,
    10% 80%,
    0% 80%
  );
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.hamburger-button:hover {
  transform: scale(1.05);
}

/* Hamburger bars */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 18px;
}
.active-hamburger {
  background-color: #E2592A !important;
  color: #fceac9;
  border-color: #E2592A;
}
.active-hamburger .bar {
  background: #fceac9;
}

.hamburger .bar {
  width: 25px;
  height: 3px;
  background: #E2592A;
  margin: 3px 0;
  border-radius: 2px;
}
.active-hamburger {
  background-color: #E2592A !important;
  border-color: #E2592A;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.active-hamburger .bar {
  background-color: #fceac9 !important; /* Lighter color for contrast */
  transition: background-color 0.3s ease;
}


/* Dropdown Menu */
.menu-dropdown {
  position: absolute;
  top: 106px;
  right: 20px; /* moved 10px to the right */
  background: #fceac9;
  border: 3px solid #E2592A;
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 160px;
}
.menu-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.menu-dropdown li {
  width: 100%;
}
.menu-dropdown a {
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: center;
  color: #E2592A;
  text-decoration: none;
  border: 3px solid #E2592A;
  background-color: #fceac9;
  border-radius: 8px;
  clip-path: polygon(
    0% 15%,
    5% 15%,
    5% 0%,
    95% 0%,
    95% 15%,
    100% 15%,
    100% 85%,
    95% 85%,
    95% 100%,
    5% 100%,
    5% 85%,
    0% 85%
  );
  transition: transform 0.2s ease-in-out;
}
.menu-dropdown a:hover {
  transform: scale(1.05);
  background-color: #E2592A;
  color: #fceac9;
}

/* Responsive */
@media (max-width: 600px) {
  .nav-button {
    display: none;
  }
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9993;
  cursor: pointer;
}

.modal-container {
  background: #fceac9;
  border: 3px solid #E2592A;
  border-radius: 12px;
  cursor: default;
  position: relative;
  z-index: 9994;
  
  /* Desktop: 80vw x 80vh */
  @media (min-width: 1024px) {
    width: 80vw;
    height: 80vh;
    max-width: 80vw;
    max-height: 80vh;
  }
  
  /* Mobile/Tablet: 100vw x 100vh */
  @media (max-width: 1023px) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
}

.modal-header {
  background: linear-gradient(135deg, #E2592A 0%, #d44a1f 100%);
  border-bottom: 3px solid #E2592A;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .modal-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: #fceac9;
    font-family: 'Amatic SC', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #fceac9;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(252, 234, 201, 0.2);
      transform: scale(1.1);
    }
  }
  
  .close-icon {
    line-height: 1;
    font-weight: 300;
  }
}

.modal-content {
  padding: 2rem;
  background: #fceac9;
  overflow-y: auto;
  height: calc(100% - 80px);
  
  @media (max-width: 1023px) {
    padding: 1.5rem;
  }
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
