<template>
  <DesktopPanel ref="desktopPanelRef" v-if="isDesktop" @closeDesktopPanel="$emit('closeDesktopPanel')">
    <template #default>
      <h3>Selected POI (Desktop)</h3>
      <pre>{{ selectedPoi }}</pre>
    </template>
  </DesktopPanel>
  <MobilePanel v-else>
    <template #default>
      <h3>Selected POI (Mobile)</h3>
      <pre>{{ selectedPoi }}</pre>
    </template>
  </MobilePanel>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useWindowSize } from '@vueuse/core';
import DesktopPanel from '../Panels/DesktopPanel.vue';
import MobilePanel from '../Panels/MobilePanel.vue';

const props = defineProps({ pois: { type: Array, required: true }, selectedPoi: { type: Object, default: null } });

const { width } = useWindowSize();
const isDesktop = computed(() => width.value > 1100);

const desktopPanelRef = ref(null);

watch(() => props.selectedPoi, (newVal) => {
  if (isDesktop.value && desktopPanelRef.value) {
    if (newVal) {
      desktopPanelRef.value.openDesktopPanel();
    } else {
      desktopPanelRef.value.closeDesktopPanel();
    }
  }
});
</script>

