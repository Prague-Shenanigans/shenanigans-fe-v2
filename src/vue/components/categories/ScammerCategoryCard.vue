<template>
  <div class="category-card scammer-card">
    <h4>{{ scammer.title || scammer.name }}</h4>
    <p v-if="scammer.description">{{ scammer.description }}</p>
    <div class="details">
      <span v-if="scammer.scam_type">Type: {{ scammer.scam_type }}</span>
      <span v-if="scammer.risk_level">Risk: {{ scammer.risk_level }}</span>
      <span v-if="scammer.common_targets">Targets: {{ scammer.common_targets }}</span>
      <span v-if="scammer.typical_amount">Amount: {{ scammer.typical_amount }}</span>
      <span v-if="scammer.warning_signs">Warning: {{ scammer.warning_signs }}</span>
      <span v-if="scammer.how_to_avoid">How to avoid: {{ scammer.how_to_avoid }}</span>
      <span v-if="scammer.reported_frequency">Frequency: {{ scammer.reported_frequency }}</span>
      <!-- Add more fields as needed -->
    </div>
  </div>
</template>

<script setup>
defineProps({ scammer: { type: Object, required: true } });
</script>

<style scoped lang="scss">
 
.scammer-card {
  background: $color-cream;
  border-left: 6px solid $color-deep-burgundy;
  margin-bottom: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: $color-charcoal-brown;
  box-shadow: 0 2px 8px rgba(123, 45, 38, 0.08);
  h4 { color: $color-deep-burgundy; }
}
</style> 