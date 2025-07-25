<template>
  <div class="category-card view-card">
    <h4>{{ view.title || view.name }}</h4>
    <p v-if="view.description">{{ view.description }}</p>
    <div class="details">
      <span v-if="view.view_type">Type: {{ view.view_type }}</span>
      <span v-if="view.best_time">Best time: {{ view.best_time }}</span>
      <span v-if="view.accessibility">Accessibility: {{ view.accessibility }}</span>
      <span v-if="view.address">Address: {{ view.address }}</span>
      <span v-if="view.website">Website: <a :href="view.website" target="_blank">{{ view.website }}</a></span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ view: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.view-card {
  background: $color-cream;
  border-left: 6px solid $color-muted-teal;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(63, 122, 137, 0.08);
  h4 { color: $color-muted-teal; }
  a { color: $color-slate-blue; text-decoration: underline; }
}
</style> 