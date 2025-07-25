<template>
  <div class="category-card legendmyth-card">
    <h4>{{ legend.title || legend.name }}</h4>
    <p v-if="legend.description">{{ legend.description }}</p>
    <div class="details">
      <span v-if="legend.legend_type">Type: {{ legend.legend_type }}</span>
      <span v-if="legend.origin_period">Origin: {{ legend.origin_period }}</span>
      <span v-if="legend.supernatural_elements">Supernatural: Yes</span>
      <span v-if="legend.historical_basis">Historical: Yes</span>
      <span v-if="legend.local_significance">Significance: {{ legend.local_significance }}</span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ legend: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.legendmyth-card {
  background: $color-warm-beige;
  border-left: 6px solid $color-deep-burgundy;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(123, 45, 38, 0.08);
  h4 { color: $color-deep-burgundy; }
}
</style> 