<template>
  <div class="filter-container">
    <h2 class="filter-title">Filter Places</h2>
    
    <!-- Category Filters -->
    <div class="filter-section">
      <h3 class="section-title">Categories</h3>
      <div class="filter-grid">
        <label v-for="category in categories" :key="category.key" class="filter-checkbox">
          <input 
            type="checkbox" 
            :value="category.key"
            v-model="selectedCategories"
            @change="applyFilters"
          />
          <span class="checkbox-label">{{ category.label }}</span>
        </label>
      </div>
    </div>

    <!-- Price Range Filter -->
    <div class="filter-section">
      <h3 class="section-title">Price Range</h3>
      <div class="price-filters">
        <label v-for="price in priceRanges" :key="price.value" class="filter-checkbox">
          <input 
            type="checkbox" 
            :value="price.value"
            v-model="selectedPriceRanges"
            @change="applyFilters"
          />
          <span class="checkbox-label">{{ price.label }}</span>
        </label>
      </div>
    </div>

    <!-- Distance Filter -->
    <div class="filter-section">
      <h3 class="section-title">Distance</h3>
      <div class="distance-slider">
        <input 
          type="range" 
          min="0" 
          max="10" 
          v-model="distance"
          class="slider"
          @input="applyFilters"
        />
        <div class="slider-labels">
          <span>Near</span>
          <span>{{ distance }}km</span>
          <span>Far</span>
        </div>
      </div>
    </div>

    <!-- Rating Filter -->
    <div class="filter-section">
      <h3 class="section-title">Minimum Rating</h3>
      <div class="rating-filters">
        <label v-for="rating in ratings" :key="rating.value" class="filter-checkbox">
          <input 
            type="radio" 
            :value="rating.value"
            v-model="selectedRating"
            name="rating"
            @change="applyFilters"
          />
          <span class="checkbox-label">{{ rating.label }}</span>
        </label>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="filter-actions">
      <button class="btn btn-secondary" @click="clearFilters">
        Clear All
      </button>
      <button class="btn btn-primary" @click="applyFilters">
        Apply Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['filter-change']);

// Filter state
const selectedCategories = ref([]);
const selectedPriceRanges = ref([]);
const distance = ref(5);
const selectedRating = ref(0);

// Filter options
const categories = [
  { key: 'restaurants', label: 'Restaurants' },
  { key: 'pubs', label: 'Pubs' },
  { key: 'bars', label: 'Bars' },
  { key: 'landmarks', label: 'Landmarks' },
  { key: 'views', label: 'Views' },
  { key: 'events', label: 'Events' },
  { key: 'legends_myths', label: 'Legends & Myths' },
  { key: 'underground', label: 'Underground' },
  { key: 'scammers', label: 'Scammers' }
];

const priceRanges = [
  { value: '$', label: 'Budget ($)' },
  { value: '$$', label: 'Moderate ($$)' },
  { value: '$$$', label: 'Expensive ($$$)' },
  { value: '$$$$', label: 'Luxury ($$$$)' }
];

const ratings = [
  { value: 0, label: 'Any Rating' },
  { value: 3, label: '3+ Stars' },
  { value: 4, label: '4+ Stars' },
  { value: 5, label: '5 Stars' }
];

function applyFilters() {
  const filters = {
    categories: selectedCategories.value,
    priceRanges: selectedPriceRanges.value,
    distance: distance.value,
    rating: selectedRating.value
  };
  
  emit('filter-change', filters);
}

function clearFilters() {
  selectedCategories.value = [];
  selectedPriceRanges.value = [];
  distance.value = 5;
  selectedRating.value = 0;
  applyFilters();
}
</script>

<style scoped lang="scss">
.filter-container {
  max-width: 600px;
  margin: 0 auto;
}

.filter-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

.filter-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

.filter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
  
  input[type="checkbox"],
  input[type="radio"] {
    width: 18px;
    height: 18px;
    accent-color: #2e9000;
  }
}

.checkbox-label {
  font-size: 0.95rem;
  color: #555;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

.price-filters,
.rating-filters {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.distance-slider {
  padding: 1rem 0;
}

.slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #ddd;
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2e9000;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2e9000;
    cursor: pointer;
    border: none;
  }
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
}

.filter-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e9ecef;
}

.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  
  &.btn-primary {
    background: #2e9000;
    color: white;
    
    &:hover {
      background: #237000;
      transform: translateY(-1px);
    }
  }
  
  &.btn-secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }
  }
}

// Responsive design
@media (max-width: 768px) {
  .filter-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style> 