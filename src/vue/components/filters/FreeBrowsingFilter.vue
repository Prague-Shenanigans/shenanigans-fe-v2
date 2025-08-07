<template>
  <div class="filter-container">
    <!-- Categories Section -->
    <div class="filter-section categories-section">
      <h3 class="section-title">Categories</h3>
      <div class="categories-grid">
        <button
          v-for="category in categories"
          :key="category.key"
          class="category-btn"
          :class="{ 'active': selectedCategories.includes(category.key) }"
          @click="toggleCategory(category.key)"
        >
          <q-icon :name="category.icon" class="category-icon" />
          <span class="category-label">{{ category.label }}</span>
        </button>
      </div>
    </div>

    <!-- Price Range Section -->
    <div class="filter-section controls-section">
      <div class="controls-grid">
        <!-- Price Range -->
        <div class="control-group">
          <h3 class="section-title">Price Range</h3>
          <div class="price-buttons">
            <button
              v-for="price in priceRanges"
              :key="price.value"
              class="price-btn"
              :class="{ 'active': selectedPriceRanges.includes(price.value) }"
              @click="togglePrice(price.value)"
            >
              {{ price.label }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="filter-actions">
      <button class="action-btn clear-btn" @click="clearFilters">
        Clear All
      </button>
      <button class="action-btn apply-btn" @click="applyFilters">
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { QIcon } from 'quasar';

const emit = defineEmits(['filter-change']);

// Filter state
const selectedCategories = ref([]);
const selectedPriceRanges = ref([]);

// Filter options
const categories = [
  { key: 'restaurants', label: 'Restaurants', icon: 'restaurant' },
  { key: 'pubs', label: 'Pubs', icon: 'sports_bar' },
  { key: 'bars', label: 'Bars', icon: 'local_bar' },
  { key: 'landmarks', label: 'Landmarks', icon: 'place' },
  { key: 'views', label: 'Views', icon: 'visibility' },
  { key: 'events', label: 'Events', icon: 'event' },
  { key: 'legends_myths', label: 'Legends & Myths', icon: 'auto_stories' },
  { key: 'underground', label: 'Underground', icon: 'explore_off' },
  { key: 'scammers', label: 'Scammers', icon: 'warning' }
];

const priceRanges = [
  { value: '$', label: 'Budget ($)' },
  { value: '$$', label: 'Moderate ($$)' },
  { value: '$$$', label: 'Expensive ($$$)' },
  { value: '$$$$', label: 'Luxury ($$$$)' }
];

function toggleCategory(categoryKey) {
  const index = selectedCategories.value.indexOf(categoryKey);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(categoryKey);
  }
  applyFilters();
}

function togglePrice(priceValue) {
  const index = selectedPriceRanges.value.indexOf(priceValue);
  if (index > -1) {
    selectedPriceRanges.value.splice(index, 1);
  } else {
    selectedPriceRanges.value.push(priceValue);
  }
  applyFilters();
}

function applyFilters() {
  const filters = {
    categories: selectedCategories.value,
    priceRanges: selectedPriceRanges.value
  };
  
  emit('filter-change', filters);
}

function clearFilters() {
  selectedCategories.value = [];
  selectedPriceRanges.value = [];
  applyFilters();
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

.filter-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

.filter-section {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Amatic SC', sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-align: center;
}

.control-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.8rem;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

// Categories Section
.categories-section {
  flex: 1;
  min-height: 0;
}

.categories-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  justify-content: center;
}

.category-btn {
  padding: 0.8rem 1rem;
  border: 2px solid #E2592A;
  background: #fceac9;
  color: #E2592A;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 0 0 auto;
  min-width: 140px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #E2592A;
    color: #fceac9;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(226, 89, 42, 0.3);
  }
  
  &.active {
    background: #E2592A;
    color: #fceac9;
    box-shadow: 0 4px 12px rgba(226, 89, 42, 0.4);
  }
  
  .category-icon {
    font-size: 1.2rem;
  }
  
  .category-label {
    flex: 1;
    text-align: center;
  }
}

// Controls Section
.controls-section {
  flex: 0 0 auto;
}

.controls-grid {
  display: flex;
  justify-content: center;
}

.control-group {
  display: flex;
  flex-direction: column;
}



.price-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: center;
}

.price-btn {
  padding: 0.6rem 1.2rem;
  border: 2px solid #2e9000;
  background: #fceac9;
  color: #2e9000;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  min-width: 100px;
  flex: 0 0 auto;
  
  &:hover {
    background: #2e9000;
    color: #fceac9;
    transform: translateY(-1px);
  }
  
  &.active {
    background: #2e9000;
    color: #fceac9;
    box-shadow: 0 2px 8px rgba(46, 144, 0, 0.3);
  }
}



// Action Buttons
.filter-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding-top: 1rem;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: 2px solid;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  min-width: 120px;
  
  &:hover {
    transform: translateY(-2px);
  }
}

.clear-btn {
  background: #6c757d;
  color: white;
  border-color: #6c757d;
  
  &:hover {
    background: #5a6268;
    border-color: #5a6268;
    box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
  }
}

.apply-btn {
  background: #2e9000;
  color: white;
  border-color: #2e9000;
  
  &:hover {
    background: #237000;
    border-color: #237000;
    box-shadow: 0 4px 12px rgba(46, 144, 0, 0.3);
  }
}

// Responsive design
@media (max-width: 768px) {
  .filter-container {
    padding: 0.8rem;
    gap: 1rem;
  }
  
  .categories-grid {
    gap: 0.6rem;
    justify-content: center;
  }
  
  .category-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
    min-width: 120px;
  }
  
  .controls-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .price-buttons {
    flex-direction: column;
    align-items: center;
    flex-wrap: nowrap;
  }
  
  .price-btn {
    width: 100%;
    max-width: 200px;
  }
  
  .filter-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>
