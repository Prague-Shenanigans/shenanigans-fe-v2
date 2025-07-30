<template>
  <div class="category-card bar-card">
    <h4>{{ bar.title || bar.name }}</h4>
    <p v-if="bar.description">{{ bar.description }}</p>
    
    <!-- Image Gallery -->
    <ImageGallery 
      :images="bar.pictures" 
      :title="bar.title || bar.name"
    />
    
    <div class="details">
      <span v-if="bar.bar_type">Type: {{ bar.bar_type }}</span>
      <span v-if="bar.price_range">Price: {{ bar.price_range }}</span>
      <span v-if="bar.live_music">Live Music: {{ bar.live_music ? 'Yes' : 'No' }}</span>
      <span v-if="bar.dance_floor">Dance Floor: {{ bar.dance_floor ? 'Yes' : 'No' }}</span>
      <span v-if="bar.rooftop">Rooftop: {{ bar.rooftop ? 'Yes' : 'No' }}</span>
      <span v-if="bar.address">Address: {{ bar.address }}</span>
      <span v-if="bar.website">Website: <a :href="bar.website" target="_blank">{{ bar.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';

defineProps({ bar: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.bar-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-deep-burgundy;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  h4 { 
    color: $color-deep-burgundy; 
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  p {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
  
  a { color: $color-warm-gold; text-decoration: underline; }
  
  .details {
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style> 