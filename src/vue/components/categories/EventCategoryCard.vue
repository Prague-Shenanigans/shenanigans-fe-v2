<template>
  <div class="category-card event-card">
    <h4>{{ event.title || event.name }}</h4>
    <p v-if="event.description">{{ event.description }}</p>
    <div class="details">
      <span v-if="event.start_date">Start: {{ event.start_date }}</span>
      <span v-if="event.end_date">End: {{ event.end_date }}</span>
      <span v-if="event.venue">Venue: {{ event.venue }}</span>
      <span v-if="event.event_type">Type: {{ event.event_type }}</span>
      <span v-if="event.price_range">Price: {{ event.price_range }}</span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ event: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.event-card {
  background: $color-cream;
  border-left: 6px solid $color-burnt-orange;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(218, 90, 40, 0.08);
  h4 { color: $color-burnt-orange; }
}
</style>