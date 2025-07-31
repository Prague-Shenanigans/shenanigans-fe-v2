<template>
  <div class="category-card underground-card">
    <h4 class="heading-underground">{{ underground.title || underground.name }}</h4>
    
    <!-- Image Gallery -->
    <ImageGallery 
    :images="underground.pictures" 
    :title="underground.title || underground.name"
    />
    <div v-if="underground.markdown_content" class="underground-description">
      <MarkdownRenderer :content="underground.markdown_content" />
    </div>
    
    <div class="details">
      <span v-if="underground.underground_type">Type: {{ underground.underground_type }}</span>
      <span v-if="underground.depth">Depth: {{ underground.depth }} m</span>
      <span v-if="underground.length">Length: {{ underground.length }} m</span>
      <span v-if="underground.guided_tours">Guided Tours: {{ underground.guided_tours ? 'Available' : 'Not available' }}</span>
      <span v-if="underground.admission_fee">Admission Fee: {{ underground.admission_fee }}</span>
      <span v-if="underground.safety_equipment">Safety Equipment: {{ underground.safety_equipment ? 'Required' : 'Not required' }}</span>
      <span v-if="underground.address">Address: {{ underground.address }}</span>
      <span v-if="underground.website">Website: <a :href="underground.website" target="_blank">{{ underground.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
import ImageGallery from '../common/ImageGallery.vue';

defineProps({ underground: { type: Object, required: true } });
</script>

<style scoped lang="scss">
.underground-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-dark-slate;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  h4 { 
    color: $color-dark-slate; 
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

  .underground-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(166, 177, 140, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 