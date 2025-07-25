<template>
  <div class="event-card">
    <div class="event-header">
      <div class="event-title-row">
        <span class="event-type-tag">{{ event.event_type }}</span>
        <h3 class="event-title">{{ event.name }}</h3>
      </div>
      <div class="event-venue">{{ event.venue }}</div>
      <div class="event-dates">
        <span>{{ formatDate(event.start_date) }}</span>
        <span v-if="event.end_date"> - {{ formatDate(event.end_date) }}</span>
      </div>
    </div>
    <div class="event-details">
      <div class="event-detail-row">
        <span class="event-detail-label">Price:</span>
        <span>{{ event.price_range || 'Free' }}</span>
      </div>
      <div class="event-detail-row">
        <span class="event-detail-label">Reservation:</span>
        <span>{{ event.reservation_required ? 'Required' : 'Not required' }}</span>
      </div>
      <div class="event-detail-row" v-if="event.age_restriction">
        <span class="event-detail-label">Age:</span>
        <span>{{ event.age_restriction }}+</span>
      </div>
      <div class="event-detail-row" v-if="event.capacity">
        <span class="event-detail-label">Capacity:</span>
        <span>{{ event.capacity }}</span>
      </div>
      <div class="event-detail-row" v-if="event.dress_code">
        <span class="event-detail-label">Dress code:</span>
        <span>{{ event.dress_code }}</span>
      </div>
      <div class="event-detail-row" v-if="event.contact_person">
        <span class="event-detail-label">Contact:</span>
        <span>{{ event.contact_person }}</span>
      </div>
      <div class="event-detail-row" v-if="event.phone">
        <span class="event-detail-label">Phone:</span>
        <span>{{ event.phone }}</span>
      </div>
      <div class="event-detail-row" v-if="event.email">
        <span class="event-detail-label">Email:</span>
        <span>{{ event.email }}</span>
      </div>
      <div class="event-detail-row" v-if="event.website">
        <span class="event-detail-label">Website:</span>
        <a :href="event.website" target="_blank" rel="noopener" class="event-link">{{ event.website }}</a>
      </div>
    </div>
    <div class="event-description" v-if="event.description">
      <MarkdownRenderer :content="event.description" />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import MarkdownRenderer from '../common/MarkdownRenderer.vue';
const props = defineProps({ event: { type: Object, required: true } });
const event = props.event;

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('cs-CZ', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap');
.event-card {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  background: #fff7e2;
  border-radius: 18px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  padding: 1.2rem 1.5rem 1.2rem 1.5rem;
  margin-bottom: 1.2rem;
  color: #4e6578;
  max-width: 600px;
}
.event-header {
  margin-bottom: 0.7rem;
}
.event-title-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.event-type-tag {
  background: #e2a03f;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 12px;
  padding: 0.2rem 0.8rem;
  margin-right: 0.5rem;
  letter-spacing: 0.02em;
}
.event-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #7b2d26;
  margin: 0;
}
.event-venue {
  font-size: 1.05rem;
  color: #b08b72;
  margin-bottom: 0.2rem;
}
.event-dates {
  font-size: 0.98rem;
  color: #4e6578;
  margin-bottom: 0.2rem;
}
.event-details {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem 2.2rem;
  margin-bottom: 0.7rem;
}
.event-detail-row {
  font-size: 0.98rem;
  display: flex;
  gap: 0.3rem;
  align-items: center;
}
.event-detail-label {
  font-weight: 600;
  color: #7b2d26;
  margin-right: 0.2rem;
}
.event-link {
  color: #e2a03f;
  text-decoration: underline;
  transition: color 0.2s;
}
.event-link:hover {
  color: #7b2d26;
}
.event-description {
  margin-top: 0.7rem;
  font-size: 1.01rem;
  color: #4e6578;
  line-height: 1.5;
}
</style>