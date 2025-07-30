<template>
  <div class="restaurant-card">
    <div class="restaurant-header">
      <h3 class="restaurant-title">{{ restaurant.name }}</h3>
      <div class="restaurant-cuisine-type" v-if="restaurant.cuisine_type"><span class="restaurant-detail-label">Cuisine:</span> {{ restaurant.cuisine_type }}</div>
      <div class="restaurant-details-row">
        <span class="restaurant-detail-label">Price:</span>
        <span>{{ restaurant.price_range || 'N/A' }}</span>
      </div>
      <div class="restaurant-details-row">
        <span class="restaurant-detail-label">Reservation:</span>
        <span>{{ restaurant.reservation_required ? 'Required' : 'Not required' }}</span>
      </div>
      <div class="restaurant-details-row" v-if="restaurant.capacity">
        <span class="restaurant-detail-label">Capacity:</span>
        <span>{{ restaurant.capacity }}</span>
      </div>
      <div class="restaurant-details-row" v-if="restaurant.dress_code">
        <span class="restaurant-detail-label">Dress code:</span>
        <span>{{ restaurant.dress_code }}</span>
      </div>
      <div class="restaurant-details-row" v-if="restaurant.address">
        <span class="restaurant-detail-label">Address:</span>
        <span class="dark-data">{{ restaurant.address }}</span>
      </div>
      <div class="restaurant-details-row" v-if="hasOpeningHours">
        <div class="opening-hours-block">
          <div class="opening-hours-label">Opening hours:</div>
          <div class="opening-hours-list">
            <div v-for="(hours, day) in restaurant.opening_hours" :key="day" class="opening-hour-row">
              <span class="opening-hour-day">{{ capitalize(day) }}:</span> <span>{{ hours }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="restaurant-details-row" v-if="restaurant.phone">
        <span class="restaurant-detail-label">Phone:</span>
        <span>{{ restaurant.phone }}</span>
      </div>
      <div class="restaurant-details-row" v-if="restaurant.email">
        <span class="restaurant-detail-label">Email:</span>
        <span>{{ restaurant.email }}</span>
      </div>
      <div class="restaurant-details-row" v-if="restaurant.website">
        <span class="restaurant-detail-label">Website:</span>
        <a :href="restaurant.website" target="_blank" rel="noopener" class="restaurant-link">{{ restaurant.website }}</a>
      </div>
    </div>
    <div class="restaurant-description" v-if="restaurant.description">
      <div class="dark-data"><MarkdownRenderer :content="restaurant.description" /></div>
    </div>
    
    <!-- Image Gallery -->
    <ImageGallery 
      :images="restaurant.pictures" 
      :title="restaurant.name"
    />
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import MarkdownRenderer from '../common/MarkdownRenderer.vue';
import ImageGallery from '../common/ImageGallery.vue';

const props = defineProps({ restaurant: { type: Object, required: true } });
const restaurant = props.restaurant;

const hasOpeningHours = computed(() => {
  return restaurant.opening_hours && Object.keys(restaurant.opening_hours).length > 0;
});

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
.restaurant-card {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  background: #f9f3e7; /* slightly lighter and more saturated than #fff7e2 */
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 1.2rem 1.5rem 1.2rem 1.5rem;
  margin-bottom: 1.2rem;
  color: #4e6578;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-left: 6px solid #6b7c2a;
}
.restaurant-header {
  margin-bottom: 0.7rem;
}
.restaurant-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #6b7c2a;
  margin: 0 0 0.2rem 0;
}
.restaurant-cuisine-type {
  font-size: 1.05rem;
  color: #000000;
  margin-bottom: 0.2rem;
}
.restaurant-details-row {
  font-size: 0.98rem;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  margin-bottom: 0.1rem;
}
.restaurant-detail-label {
  font-weight: 600;
  color: #7b2d26;
  margin-right: 0.2rem;
}
.restaurant-link {
  color: #e2a03f;
  text-decoration: underline;
  transition: color 0.2s;
}
.restaurant-link:hover {
  color: #7b2d26;
}
.opening-hour-row {
  display: block;
  font-size: 0.97rem;
  color: #000000;
}
.opening-hour-day {
  font-weight: 600;
  color: #7b2d26;
}
.restaurant-description {
  margin-top: 0.7rem;
  font-size: 1.01rem;
  color: #000000;
  line-height: 1.5;
}
.opening-hours-block {
  margin: 1.1rem 0 1.1rem 0;
}
.opening-hours-label {
  font-weight: 600;
  color: #7b2d26;
  font-size: 1.01rem;
  margin-bottom: 0.2rem;
}
.opening-hours-list {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.dark-data {
  color: #000000 !important;
}
</style> 