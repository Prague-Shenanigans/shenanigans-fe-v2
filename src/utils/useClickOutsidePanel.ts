import { onMounted, onBeforeUnmount } from 'vue';

export function useClickOutsidePanel(panelRef, onClose) {
  let mouseDownPos = null;

  function onDocumentMouseDown(e) {
    mouseDownPos = { x: e.clientX, y: e.clientY };
  }

  function onDocumentMouseUp(e) {
    if (!panelRef.value) return;
    if (!panelRef.value.contains(e.target)) {
      if (mouseDownPos) {
        const dx = Math.abs(e.clientX - mouseDownPos.x);
        const dy = Math.abs(e.clientY - mouseDownPos.y);
        if (dx < 5 && dy < 5) {
          onClose();
        }
      }
    }
    mouseDownPos = null;
  }

  onMounted(() => {
    document.addEventListener('mousedown', onDocumentMouseDown);
    document.addEventListener('mouseup', onDocumentMouseUp);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', onDocumentMouseDown);
    document.removeEventListener('mouseup', onDocumentMouseUp);
  });
} 