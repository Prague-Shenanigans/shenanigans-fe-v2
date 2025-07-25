<template>
  <div class="category-card restaurant-card">
    <h4>{{ restaurant.title || restaurant.name }}</h4>
    <p v-if="restaurant.description">{{ restaurant.description }}</p>
    <div class="details">
      <span v-if="restaurant.cuisine_type">Cuisine: {{ restaurant.cuisine_type }}</span>
      <span v-if="restaurant.price_range">Price: {{ restaurant.price_range }}</span>
      <span v-if="restaurant.opening_hours">Hours: {{ restaurant.opening_hours }}</span>
      <span v-if="restaurant.address">Address: {{ restaurant.address }}</span>
      <span v-if="restaurant.phone">Phone: {{ restaurant.phone }}</span>
      <span v-if="restaurant.website">Website: <a :href="restaurant.website" target="_blank">{{ restaurant.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ restaurant: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.restaurant-card {
  background: $color-warm-beige;
  border-left: 6px solid $color-olive-green;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(107, 124, 42, 0.08);
  h4 { color: $color-olive-green; }
  a { color: $color-muted-teal; text-decoration: underline; }
}
</style> 