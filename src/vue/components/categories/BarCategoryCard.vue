<template>
  <div class="category-card bar-card">
    <h4>{{ bar.title || bar.name }}</h4>
    <p v-if="bar.description">{{ bar.description }}</p>
    <div class="details">
      <span v-if="bar.bar_type">Type: {{ bar.bar_type }}</span>
      <span v-if="bar.price_range">Price: {{ bar.price_range }}</span>
      <span v-if="bar.opening_hours">Hours: {{ bar.opening_hours }}</span>
      <span v-if="bar.address">Address: {{ bar.address }}</span>
      <span v-if="bar.phone">Phone: {{ bar.phone }}</span>
      <span v-if="bar.website">Website: <a :href="bar.website" target="_blank">{{ bar.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ bar: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.bar-card {
  background: $color-warm-taupe;
  border-left: 6px solid $color-deep-burgundy;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(123, 45, 38, 0.08);
  h4 { color: $color-deep-burgundy; }
  a { color: $color-slate-blue; text-decoration: underline; }
}
</style> 