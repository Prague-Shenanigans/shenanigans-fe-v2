<template>
  <div class="category-card landmark-card">
    <h4 class="heading-landmark">{{ landmark?.name || 'Untitled' }}</h4>
    <!-- Image Gallery -->
    <ImageGallery 
    :images="landmark?.pictures" 
    :title="landmark?.name || 'Untitled'"
    />
    <div v-if="landmark?.markdown_content" class="landmark-description">
      <MarkdownRenderer :content="landmark.markdown_content" />
    </div>
    
    <div class="details">
      <span v-if="landmark.landmark_type">Type: {{ landmark.landmark_type }}</span>
      <span v-if="landmark.built_year">Built: {{ landmark.built_year }}</span>
      <span v-if="landmark.architect">Architect: {{ landmark.architect }}</span>
      <span v-if="landmark.height">Height: {{ landmark.height }} m</span>
      <span v-if="landmark.address">Address: {{ landmark.address }}</span>
      <span v-if="landmark.website">Website: <a :href="landmark.website" target="_blank">{{ landmark.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

defineProps({ landmark: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.landmark-card {
  background: $color-warm-beige;
  border-left: 6px solid $color-warm-gold;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(226, 160, 63, 0.08);
  max-width: 100%;
  min-width: 0; // Allow shrinking
  overflow: hidden; // Prevent content from overflowing
  
  h4 { 
    color: $color-warm-gold; 
    margin-bottom: 0.5rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: clamp(0.9rem, 2.5vw, 1.1rem); // Responsive font size
  }
  
  p {
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: clamp(0.8rem, 2vw, 0.9rem); // Responsive font size
  }
  
  a { 
    color: $color-muted-teal; 
    text-decoration: underline; 
  }
  
  .details {
    word-wrap: break-word;
    overflow-wrap: break-word;
    font-size: clamp(0.75rem, 1.8vw, 0.85rem); // Responsive font size
  }

  .landmark-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(226, 160, 63, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 