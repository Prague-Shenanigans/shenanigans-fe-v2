<template>
  <transition name="slide-panel">
    <div v-if="visible" ref="panelRef" class="desktop-panel">
      <button class="close-btn" @click="closeDesktopPanel">&times;</button>
      <div class="panel-content">
        <div class="panel-primary">
          <slot>
            <div class="default-primary">Primary Content</div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { useClickOutsidePanel } from 'src/utils/useClickOutsidePanel';

const emit = defineEmits(['closeDesktopPanel']);
const visible = ref(false);
const panelRef = ref(null);

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
  padding-top: 100px;
  position: fixed;
  top: 0;
  left: 0;
  min-width: 30vw;
  max-width: 40vw;
  height: 100vh;
  background: #fff7e2;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 9900;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.slide-panel-enter-active,
.slide-panel-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-panel-enter-from,
.slide-panel-leave-to {
  transform: translateX(-100%);
}
.slide-panel-enter-to,
.slide-panel-leave-from {
  transform: translateX(0);
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
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  z-index: 9990; /* higher than panel content */
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
  /* Custom scrollbar styles */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: rgba(0,0,0,0.15) rgba(0,0,0,0.03); /* Firefox */
}
.panel-primary::-webkit-scrollbar {
  width: 6px;
  background: transparent;
}
.panel-primary::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 4px;
  transition: background 0.2s;
}
.panel-primary:hover::-webkit-scrollbar-thumb,
.panel-primary:active::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.25);
}
.panel-primary::-webkit-scrollbar-track {
  background: transparent;
}
</style> 