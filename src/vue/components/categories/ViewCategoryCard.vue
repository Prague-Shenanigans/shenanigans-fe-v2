<template>
  <div class="category-card view-card">
    <h4 class="heading-view">{{ view?.name || 'Untitled' }}</h4>
    
    <!-- Image Gallery -->
        <ImageGallery 
      :images="view?.pictures" 
      :title="view?.name || 'Untitled'"
    />
    <div v-if="view?.markdown_content" class="view-description">
      <MarkdownRenderer :content="view.markdown_content" />
    </div>
    
    <div class="details">
      <span v-if="view.view_type">Type: {{ view.view_type }}</span>
      <span v-if="view.best_time">Best Time: {{ view.best_time }}</span>
      <span v-if="view.accessibility">Accessibility: {{ view.accessibility }}</span>
      <span v-if="view.parking_available">Parking: {{ view.parking_available ? 'Available' : 'Not available' }}</span>
      <span v-if="view.wheelchair_accessible">Wheelchair Accessible: {{ view.wheelchair_accessible ? 'Yes' : 'No' }}</span>
      <span v-if="view.address">Address: {{ view.address }}</span>
      <span v-if="view.website">Website: <a :href="view.website" target="_blank">{{ view.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

defineProps({ view: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.view-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-slate-blue;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  h4 { 
    color: $color-slate-blue; 
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

  .view-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(63, 122, 137, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 