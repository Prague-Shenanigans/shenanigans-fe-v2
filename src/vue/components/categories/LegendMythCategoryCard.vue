<template>
  <div class="category-card legend-myth-card">
    <h4>{{ legendMyth.title || legendMyth.name }}</h4>
    <p v-if="legendMyth.description">{{ legendMyth.description }}</p>
    
    <!-- Image Gallery -->
    <ImageGallery 
      :images="legendMyth.pictures" 
      :title="legendMyth.title || legendMyth.name"
    />
    
    <div class="details">
      <span v-if="legendMyth.legend_type">Type: {{ legendMyth.legend_type }}</span>
      <span v-if="legendMyth.origin_period">Origin Period: {{ legendMyth.origin_period }}</span>
      <span v-if="legendMyth.supernatural_elements">Supernatural Elements: {{ legendMyth.supernatural_elements ? 'Yes' : 'No' }}</span>
      <span v-if="legendMyth.historical_basis">Historical Basis: {{ legendMyth.historical_basis ? 'Yes' : 'No' }}</span>
      <span v-if="legendMyth.address">Address: {{ legendMyth.address }}</span>
      <span v-if="legendMyth.website">Website: <a :href="legendMyth.website" target="_blank">{{ legendMyth.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';

defineProps({ legendMyth: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.legend-myth-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-mystic-purple;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  h4 { 
    color: $color-mystic-purple; 
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