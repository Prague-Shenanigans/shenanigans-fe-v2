<template>
  <div ref="panelRef" class="desktop-panel" :class="{ 'is-hidden': !visible }">
    <div class="panel-content">
      <div class="panel-header">
        <button class="close-btn" @click="togglePanel">&times;</button>
      </div>
      <div ref="primaryRef" class="panel-primary">
        <slot>
          <div class="default-primary">Primary Content</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useClickOutsidePanel } from 'src/utils/useClickOutsidePanel';

const emit = defineEmits(['closeDesktopPanel']);
const visible = ref(true);
const panelRef = ref(null);
const primaryRef = ref(null);

function togglePanel() {
  visible.value = !visible.value;
}

function openDesktopPanel() {
  visible.value = true;
}

function closeDesktopPanel() {
  visible.value = false;
  emit('closeDesktopPanel');
}

useClickOutsidePanel(panelRef, closeDesktopPanel);

defineExpose({
  visible,
  openDesktopPanel,
  closeDesktopPanel
});
</script>

<style lang="scss" scoped>
.desktop-panel {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 33vw;
  max-width: 50vw;
  width: 100%;
  height: 100vh;
  background: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  border-top-right-radius: 16px;
  border-bottom-right-radius: 16px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  transform: translateX(0);
}
.desktop-panel.is-hidden {
  transform: translateX(-100%);
}

.panel-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
  flex-shrink: 0;
  padding: 16px 16px 0 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  margin-left: auto;
}
.close-btn:hover {
  color: #333;
}

.panel-primary {
  margin: 0;
  padding: 0 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  height: 100%;
}
</style> 