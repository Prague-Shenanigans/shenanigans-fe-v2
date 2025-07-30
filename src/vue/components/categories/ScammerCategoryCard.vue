<template>
  <div class="category-card scammer-card">
    <h4>{{ scammer.title || scammer.name }}</h4>
    <p v-if="scammer.description">{{ scammer.description }}</p>
    
    <!-- Image Gallery -->
    <ImageGallery 
      :images="scammer.pictures" 
      :title="scammer.title || scammer.name"
    />
    
    <div class="details">
      <span v-if="scammer.scam_type">Type: {{ scammer.scam_type }}</span>
      <span v-if="scammer.risk_level">Risk Level: {{ scammer.risk_level }}</span>
      <span v-if="scammer.common_targets">Common Targets: {{ scammer.common_targets }}</span>
      <span v-if="scammer.reported_frequency">Reported Frequency: {{ scammer.reported_frequency }}</span>
      <span v-if="scammer.address">Address: {{ scammer.address }}</span>
      <span v-if="scammer.website">Website: <a :href="scammer.website" target="_blank">{{ scammer.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';

defineProps({ scammer: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.scammer-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-warning-red;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  h4 { 
    color: $color-warning-red; 
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