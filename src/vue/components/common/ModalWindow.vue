<template>
  <Transition name="modal">
    <div v-if="isOpen" class="modal-overlay" @click="closeModal">
      <div class="modal-container" @click.stop>
        <!-- Header -->
        <div class="modal-header">
          <h3 v-if="title" class="modal-title">{{ title }}</h3>
          <button class="close-btn" @click="closeModal">
            <span class="close-icon">×</span>
          </button>
        </div>

        <!-- Content -->
        <div class="modal-content">
          <slot />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['close']);

function closeModal() {
  emit('close');
}

// Use props to avoid linter warning
const { isOpen, title } = props;
</script>

<style scoped lang="scss">
// Transparent overlay covering entire screen
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9993;
  cursor: pointer;
}

// Modal container - won't close when clicked
.modal-container {
  background: #fceac9;
  border: 3px solid #E2592A;
  border-radius: 12px;
  cursor: default;
  position: relative;
  z-index: 9994;
  
  // Desktop: 80vw x 80vh
  @media (min-width: 1024px) {
    width: 80vw;
    height: 80vh;
    max-width: 80vw;
    max-height: 80vh;
  }
  
  // Mobile/Tablet: 100vw x 100vh
  @media (max-width: 1023px) {
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    border-radius: 0;
  }
}

.modal-header {
  background: linear-gradient(135deg, #E2592A 0%, #d44a1f 100%);
  border-bottom: 3px solid #E2592A;
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .modal-title {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 700;
    color: #fceac9;
    font-family: 'Amatic SC', sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #fceac9;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      background: rgba(252, 234, 201, 0.2);
      transform: scale(1.1);
    }
  }
  
  .close-icon {
    line-height: 1;
    font-weight: 300;
  }
}

.modal-content {
  padding: 2rem;
  background: #fceac9;
  overflow-y: auto;
  height: calc(100% - 80px); // Subtract header height
  
  @media (max-width: 1023px) {
    padding: 1.5rem;
  }
}

// Custom scrollbar for modal content
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: rgba(226, 89, 42, 0.1);
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #E2592A;
  border-radius: 4px;
  
  &:hover {
    background: #d44a1f;
  }
}

// Modal animations
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style> 