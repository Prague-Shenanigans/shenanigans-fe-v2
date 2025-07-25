<template>
  <DesktopPanel ref="desktopPanelRef" v-if="isDesktop" @closeDesktopPanel="$emit('closeDesktopPanel')">
    <template #default>
      <div v-if="props.selectedPoi">
        <h2>{{ props.selectedPoi.title }}</h2>
        <img v-if="props.selectedPoi.header_image_url" :src="props.selectedPoi.header_image_url" :alt="props.selectedPoi.title" style="max-width: 100%; max-height: 200px; object-fit: cover; margin-bottom: 1rem;" />
        <p>{{ props.selectedPoi.description }}</p>
      </div>
      <div class="category-menu">
        <button
          v-for="cat in availableCategories"
          :key="cat.key"
          :style="{ background: cat.color, color: '#fff', marginRight: '8px' }"
          :class="{ active: selectedCategory === cat.key }"
          @click="selectedCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>
      <div v-if="selectedCategory">
        <div v-if="getCategoryItems(selectedCategory).length > 1">
          <div v-if="selectedCategory === 'events'">
            <button
              v-for="(item, idx) in getCategoryItems('events')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <EventCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :event="getCategoryItems('events')[selectedCategoryElementIndex]"
              :key="getCategoryItems('events')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'restaurants'">
            <button
              v-for="(item, idx) in getCategoryItems('restaurants')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <RestaurantCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :restaurant="getCategoryItems('restaurants')[selectedCategoryElementIndex]"
              :key="getCategoryItems('restaurants')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'pubs'">
            <button
              v-for="(item, idx) in getCategoryItems('pubs')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <PubCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :pub="getCategoryItems('pubs')[selectedCategoryElementIndex]"
              :key="getCategoryItems('pubs')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'bars'">
            <button
              v-for="(item, idx) in getCategoryItems('bars')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <BarCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :bar="getCategoryItems('bars')[selectedCategoryElementIndex]"
              :key="getCategoryItems('bars')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'landmarks'">
            <button
              v-for="(item, idx) in getCategoryItems('landmarks')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <LandmarkCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :landmark="getCategoryItems('landmarks')[selectedCategoryElementIndex]"
              :key="getCategoryItems('landmarks')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'views'">
            <button
              v-for="(item, idx) in getCategoryItems('views')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <ViewCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :view="getCategoryItems('views')[selectedCategoryElementIndex]"
              :key="getCategoryItems('views')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'legends_myths'">
            <button
              v-for="(item, idx) in getCategoryItems('legends_myths')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <LegendMythCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :legend="getCategoryItems('legends_myths')[selectedCategoryElementIndex]"
              :key="getCategoryItems('legends_myths')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'underground'">
            <button
              v-for="(item, idx) in getCategoryItems('underground')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <UndergroundCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :underground="getCategoryItems('underground')[selectedCategoryElementIndex]"
              :key="getCategoryItems('underground')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'scammers'">
            <button
              v-for="(item, idx) in getCategoryItems('scammers')"
              :key="item.id"
              class="category-item-btn"
              :class="{ active: selectedCategoryElementIndex === idx }"
              @click="selectedCategoryElementIndex = idx"
            >
              {{ item.name || item.title }}
            </button>
            <ScammerCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :scammer="getCategoryItems('scammers')[selectedCategoryElementIndex]"
              :key="getCategoryItems('scammers')[selectedCategoryElementIndex]?.id"
            />
          </div>
        </div>
        <div v-else-if="getCategoryItems(selectedCategory).length === 1">
          <EventCategoryCard
            v-if="selectedCategory === 'events'"
            :event="getCategoryItems('events')[0]"
            :key="getCategoryItems('events')[0].id"
          />
          <RestaurantCategoryCard
            v-if="selectedCategory === 'restaurants'"
            :restaurant="getCategoryItems('restaurants')[0]"
            :key="getCategoryItems('restaurants')[0].id"
          />
          <PubCategoryCard
            v-if="selectedCategory === 'pubs'"
            :pub="getCategoryItems('pubs')[0]"
            :key="getCategoryItems('pubs')[0].id"
          />
          <BarCategoryCard
            v-if="selectedCategory === 'bars'"
            :bar="getCategoryItems('bars')[0]"
            :key="getCategoryItems('bars')[0].id"
          />
          <LandmarkCategoryCard
            v-if="selectedCategory === 'landmarks'"
            :landmark="getCategoryItems('landmarks')[0]"
            :key="getCategoryItems('landmarks')[0].id"
          />
          <ViewCategoryCard
            v-if="selectedCategory === 'views'"
            :view="getCategoryItems('views')[0]"
            :key="getCategoryItems('views')[0].id"
          />
          <LegendMythCategoryCard
            v-if="selectedCategory === 'legends_myths'"
            :legend="getCategoryItems('legends_myths')[0]"
            :key="getCategoryItems('legends_myths')[0].id"
          />
          <UndergroundCategoryCard
            v-if="selectedCategory === 'underground'"
            :underground="getCategoryItems('underground')[0]"
            :key="getCategoryItems('underground')[0].id"
          />
          <ScammerCategoryCard
            v-if="selectedCategory === 'scammers'"
            :scammer="getCategoryItems('scammers')[0]"
            :key="getCategoryItems('scammers')[0].id"
          />
        </div>
        <div v-else class="empty-category">No items in this category.</div>
      </div>
    </template>
  </DesktopPanel>
  <MobilePanel v-else>
    <template #default>
      <h3>Selected POI (Mobile)</h3>
      <pre>{{ selectedPoi }}</pre>
    </template>
  </MobilePanel>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';
import DesktopPanel from '../Panels/DesktopPanel.vue';
import MobilePanel from '../Panels/MobilePanel.vue';
import EventCategoryCard from '../categories/EventCategoryCard.vue';
import RestaurantCategoryCard from '../categories/RestaurantCategoryCard.vue';
import PubCategoryCard from '../categories/PubCategoryCard.vue';
import BarCategoryCard from '../categories/BarCategoryCard.vue';
import LandmarkCategoryCard from '../categories/LandmarkCategoryCard.vue';
import ViewCategoryCard from '../categories/ViewCategoryCard.vue';
import LegendMythCategoryCard from '../categories/LegendMythCategoryCard.vue';
import UndergroundCategoryCard from '../categories/UndergroundCategoryCard.vue';
import ScammerCategoryCard from '../categories/ScammerCategoryCard.vue';

const props = defineProps({ pois: { type: Array, required: true }, selectedPoi: { type: Object, default: null } });

const { width } = useWindowSize();
const isDesktop = computed(() => width.value > 1100);
const desktopPanelRef = ref(null);

const categoryMap = [
  { key: 'events', label: 'Events', color: '#d85a28', component: EventCategoryCard, prop: 'event' },
  { key: 'restaurants', label: 'Restaurants', color: '#6b7c2a', component: RestaurantCategoryCard, prop: 'restaurant' },
  { key: 'pubs', label: 'Pubs', color: '#e2a03f', component: PubCategoryCard, prop: 'pub' },
  { key: 'bars', label: 'Bars', color: '#7b2d26', component: BarCategoryCard, prop: 'bar' },
  { key: 'landmarks', label: 'Landmarks', color: '#e2a03f', component: LandmarkCategoryCard, prop: 'landmark' },
  { key: 'views', label: 'Views', color: '#3f7a89', component: ViewCategoryCard, prop: 'view' },
  { key: 'legends_myths', label: 'Legends/Myths', color: '#7b2d26', component: LegendMythCategoryCard, prop: 'legend' },
  { key: 'underground', label: 'Underground', color: '#a6b18c', component: UndergroundCategoryCard, prop: 'underground' },
  { key: 'scammers', label: 'Scammers', color: '#4e6578', component: ScammerCategoryCard, prop: 'scammer' },
];

const availableCategories = computed(() =>
  categoryMap.filter(cat => props.selectedPoi && Array.isArray(props.selectedPoi[cat.key]) && props.selectedPoi[cat.key].length)
);

const selectedCategory = ref(availableCategories.value[0]?.key || null);
const selectedCategoryElementIndex = ref(null);

watch(
  () => props.selectedPoi,
  (newVal) => {
    if (newVal && isDesktop.value && desktopPanelRef.value) {
      desktopPanelRef.value.openDesktopPanel();
    }
    // Reset to first available category when POI changes
    const first = availableCategories.value[0]?.key || null;
    selectedCategory.value = first;
    selectedCategoryElementIndex.value = null;
  }
);

watch(selectedCategory, () => {
  selectedCategoryElementIndex.value = null;
});

function getCategoryItems(key) {
  return props.selectedPoi?.[key] || [];
}
</script>

<style scoped lang="scss">
.category-menu {
  margin-bottom: 1.5rem;
  button {
    border: none;
    border-radius: 8px;
    padding: 0.5rem 1.2rem;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    opacity: 0.85;
    &.active {
      border: 2px solid #fff7e2;
      opacity: 1;
    }
  }
}
.empty-category {
  color: #b08b72;
  font-style: italic;
  margin-top: 1rem;
}
</style>

