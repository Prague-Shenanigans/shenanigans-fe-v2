<template>
  <div class="category-card bar-card">
    <h4 class="heading-bar">{{ bar?.name || 'Untitled' }}</h4>
    
    <!-- Image Gallery -->
        <ImageGallery 
      :images="bar?.pictures" 
      :title="bar?.name || 'Untitled'"
    />
    <div v-if="bar?.markdown_content" class="bar-description">
      <MarkdownRenderer :content="bar.markdown_content" />
    </div>
    
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
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

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

  .bar-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(123, 45, 38, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 