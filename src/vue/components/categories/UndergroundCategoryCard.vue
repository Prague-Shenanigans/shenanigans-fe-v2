<template>
  <div class="category-card underground-card">
    <h4>{{ underground.title || underground.name }}</h4>
    <p v-if="underground.description">{{ underground.description }}</p>
    <div class="details">
      <span v-if="underground.underground_type">Type: {{ underground.underground_type }}</span>
      <span v-if="underground.depth">Depth: {{ underground.depth }} m</span>
      <span v-if="underground.length">Length: {{ underground.length }} m</span>
      <span v-if="underground.address">Address: {{ underground.address }}</span>
      <span v-if="underground.website">Website: <a :href="underground.website" target="_blank">{{ underground.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ underground: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.underground-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-muted-sage;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(166, 177, 140, 0.08);
  h4 { color: $color-muted-sage; }
  a { color: $color-muted-teal; text-decoration: underline; }
}
</style> 