<template>
  <div class="category-card legend-myth-card">
    <h4 class="heading-legend-myth">{{ legendMyth?.name || 'Untitled' }}</h4>
    
    <!-- Image Gallery -->
    <ImageGallery 
    :images="legendMyth?.pictures" 
    :title="legendMyth?.name || 'Untitled'"
    />
    <div v-if="legendMyth?.markdown_content" class="legend-description">
      <MarkdownRenderer :content="legendMyth.markdown_content" />
    </div>
    
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
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

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

  .legend-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(107, 78, 113, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 