<template>
  <div class="category-card pub-card">
    <h4>{{ pub.title || pub.name }}</h4>
    <p v-if="pub.description">{{ pub.description }}</p>
    <div class="details">
      <span v-if="pub.pub_type">Type: {{ pub.pub_type }}</span>
      <span v-if="pub.price_range">Price: {{ pub.price_range }}</span>
      <span v-if="pub.opening_hours">Hours: {{ pub.opening_hours }}</span>
      <span v-if="pub.address">Address: {{ pub.address }}</span>
      <span v-if="pub.phone">Phone: {{ pub.phone }}</span>
      <span v-if="pub.website">Website: <a :href="pub.website" target="_blank">{{ pub.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ pub: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.pub-card {
  background: $color-soft-sand;
  border-left: 6px solid $color-warm-gold;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(226, 160, 63, 0.08);
  h4 { color: $color-warm-gold; }
  a { color: $color-deep-burgundy; text-decoration: underline; }
}
</style> 