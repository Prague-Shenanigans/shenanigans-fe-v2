<template>
  <div class="category-card landmark-card">
    <h4>{{ landmark.title || landmark.name }}</h4>
    <p v-if="landmark.description">{{ landmark.description }}</p>
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
  h4 { color: $color-warm-gold; }
  a { color: $color-muted-teal; text-decoration: underline; }
}
</style> 