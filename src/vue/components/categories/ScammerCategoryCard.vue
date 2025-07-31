<template>
  <div class="category-card scammer-card">
    <h4 class="heading-scammer">{{ scammer?.name || 'Untitled' }}</h4>
    
    <!-- Image Gallery -->
        <ImageGallery 
      :images="scammer?.pictures" 
      :title="scammer?.name || 'Untitled'"
    />
    <div v-if="scammer?.markdown_content" class="scammer-description">
      <MarkdownRenderer :content="scammer.markdown_content" />
    </div>
    
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
import MarkdownRenderer from '../common/MarkdownRenderer.vue';

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

  .scammer-description {
    margin: 1rem 0;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 8px;
    border: 1px solid rgba(231, 76, 60, 0.1);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style> 