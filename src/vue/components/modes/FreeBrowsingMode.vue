<template>
  <DesktopPanel ref="desktopPanelRef" v-if="isDesktop" @closeDesktopPanel="$emit('closeDesktopPanel')">
    <template #default>
      <div v-if="props.selectedPoi">
        <h1 class="poi-title">{{ props.selectedPoi.title }}</h1>
        <img
          v-if="props.selectedPoi.header_image_url"
          :src="props.selectedPoi.header_image_url"
          :alt="props.selectedPoi.title"
          class="poi-header-image"
        />
        <p>{{ props.selectedPoi.description }}</p>
        <div v-if="props.selectedPoi.markdown_content" class="poi-markdown">
          <MarkdownRenderer :content="props.selectedPoi.markdown_content" />
        </div>
      </div>
      <div class="category-menu">
        <div v-if="availableCategories.length > 0" class="category-menu-label">
          {{ availableCategories.length === 1 ? 'Category:' : 'How would you like to experience this place?' }}
        </div>
        <button
          v-for="cat in availableCategories"
          :key="cat.key"
          :style="{ background: cat.color, color: '#fff', marginRight: '8px' }"
          :class="{ active: selectedCategory === cat.key, 'category-tag': true }"
          @click="selectedCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>
      <div v-if="selectedCategory">
        <div v-if="getCategoryItems(selectedCategory).length > 1">
          <div class="element-tags-label">Choose one</div>
          <div v-if="selectedCategory === 'events'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('events')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <EventCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :event="getCategoryItems('events')[selectedCategoryElementIndex]"
              :key="getCategoryItems('events')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'restaurants'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('restaurants')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <RestaurantCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :restaurant="getCategoryItems('restaurants')[selectedCategoryElementIndex]"
              :key="getCategoryItems('restaurants')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'pubs'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('pubs')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <PubCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :pub="getCategoryItems('pubs')[selectedCategoryElementIndex]"
              :key="getCategoryItems('pubs')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'bars'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('bars')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <BarCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :bar="getCategoryItems('bars')[selectedCategoryElementIndex]"
              :key="getCategoryItems('bars')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'landmarks'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('landmarks')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <LandmarkCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :landmark="getCategoryItems('landmarks')[selectedCategoryElementIndex]"
              :key="getCategoryItems('landmarks')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'views'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('views')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <ViewCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :view="getCategoryItems('views')[selectedCategoryElementIndex]"
              :key="getCategoryItems('views')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'legends_myths'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('legends_myths')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <LegendMythCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :legend="getCategoryItems('legends_myths')[selectedCategoryElementIndex]"
              :key="getCategoryItems('legends_myths')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'underground'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('underground')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
            <UndergroundCategoryCard
              v-if="selectedCategoryElementIndex !== null"
              :underground="getCategoryItems('underground')[selectedCategoryElementIndex]"
              :key="getCategoryItems('underground')[selectedCategoryElementIndex]?.id"
            />
          </div>
          <div v-else-if="selectedCategory === 'scammers'">
            <div class="category-elements">
              <button
                v-for="(item, idx) in getCategoryItems('scammers')"
                :key="item.id"
                class="category-element-tag"
                :class="{ selected: selectedCategoryElementIndex === idx }"
                @click="selectedCategoryElementIndex = idx"
              >
                {{ item.name || item.title }}
              </button>
            </div>
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
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

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
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');

.category-menu {
  margin-bottom: 1.5rem;
  .category-menu-label {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #7b2d26;
  }
  .category-tag {
    border: none;
    border-radius: 16px;
    padding: 0.4rem 1.1rem;
    font-weight: 600;
    font-size: 1rem;
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
    cursor: pointer;
    opacity: 0.85;
    background: #e2a03f;
    color: #fff;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    &.active {
      border: 2px solid #fff7e2;
      opacity: 1;
      background: #7b2d26;
      color: #fff7e2;
    }
  }
}
.element-tags-label {
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #4e6578;
}
.category-elements {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.category-element-tag {
  display: inline-block;
  border: none;
  border-radius: 16px;
  padding: 0.3rem 1rem;
  font-size: 0.98rem;
  font-weight: 500;
  margin-bottom: 0.7rem;
  margin-right: 0.5rem;
  background: #f3e7d3;
  color: #7b2d26;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  opacity: 0.92;
  &:hover {
    background: #e2a03f;
    color: #fff;
  }
  &.selected {
    background: #7b2d26;
    color: #fff7e2;
    opacity: 1;
    border: 2px solid #fff7e2;
  }
}
.empty-category {
  color: #b08b72;
  font-style: italic;
  margin-top: 1rem;
}
</style>


