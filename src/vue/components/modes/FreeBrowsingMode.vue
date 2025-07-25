<template>
  <DesktopPanel v-if="isDesktop && selectedPoi" class="floating-window" @closeDesktopPanel="$emit('closeDesktopPanel')">
    <template #default>
      <h3>Selected POI (Desktop)</h3>
      <pre>{{ selectedPoi }}</pre>
    </template>
  </DesktopPanel>
  <MobilePanel v-else-if="selectedPoi" class="floating-window">
    <template #default>
      <h3>Selected POI (Mobile)</h3>
      <pre>{{ selectedPoi }}</pre>
    </template>
  </MobilePanel>
</template>

<script setup>
import { computed } from 'vue';
import { useWindowSize } from '@vueuse/core';
import DesktopPanel from '../Panels/DesktopPanel.vue';
import MobilePanel from '../Panels/MobilePanel.vue';

defineProps({ pois: { type: Array, required: true }, selectedPoi: { type: Object, default: null } });

const { width } = useWindowSize();
const isDesktop = computed(() => width.value > 1100);
</script>

