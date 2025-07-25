<template>
  <div>
    <div class="floating-window">
      <h3>Create Your Own Tour / Itinerary Mode</h3>
      <pre>{{ pois }}</pre>
      <div v-if="selectedPoi">
        <h4>Selected POI:</h4>
        <pre>{{ selectedPoi }}</pre>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({ pois: { type: Array, required: true }, selectedPoi: { type: Object, default: null } });
</script>

