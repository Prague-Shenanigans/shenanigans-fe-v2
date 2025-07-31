<template>
  <div class="category-card pub-card">
    <h4 class="heading-pub">{{ pub?.name || 'Untitled' }}</h4>
    
    <!-- Image Gallery -->
        <ImageGallery 
      :images="pub?.pictures" 
      :title="pub?.name || 'Untitled'"
    />
    <div v-if="pub?.markdown_content" class="pub-description">
      <MarkdownRenderer :content="pub.markdown_content" />
    </div>
    
    <div class="details">
      <span v-if="pub.pub_type">Type: {{ pub.pub_type }}</span>
      <span v-if="pub.price_range">Price: {{ pub.price_range }}</span>
      <span v-if="pub.live_music">Live Music: {{ pub.live_music ? 'Yes' : 'No' }}</span>
      <span v-if="pub.sports_tv">Sports TV: {{ pub.sports_tv ? 'Yes' : 'No' }}</span>
      <span v-if="pub.outdoor_seating">Outdoor Seating: {{ pub.outdoor_seating ? 'Yes' : 'No' }}</span>
      <span v-if="pub.address">Address: {{ pub.address }}</span>
      <span v-if="pub.website">Website: <a :href="pub.website" target="_blank">{{ pub.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

defineProps({ pub: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.pub-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-muted-teal;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  h4 { 
    color: $color-muted-teal; 
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

  .pub-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(63, 122, 137, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 