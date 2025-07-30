<template>
  <div v-if="images && images.length > 0" class="image-gallery">
    <div class="gallery-grid">
      <div 
        v-for="(image, index) in images" 
        :key="index" 
        class="gallery-item"
        @click="showLightbox(index)"
      >
        <img 
          :src="getFullImageUrl(image)" 
          :alt="`${title} - Image ${index + 1}`"
          class="gallery-image"
          loading="lazy"
          @error="handleImageError"
        />
      </div>
    </div>
    
    <!-- Vue Easy Lightbox -->
    <ClientOnly>
      <EasyLightbox
        :visible="visible"
        :imgs="fullImageUrls"
        :index="index"
        @hide="visible = false"
      />
    </ClientOnly>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import EasyLightbox from 'vue-easy-lightbox';

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Image'
  }
});

// Backend URL for images
const BACKEND_URL = import.meta.env.VITE_SERVER_DOMAIN || 'https://she-be.nonode.dev';

// Lightbox functionality
const visible = ref(false);
const index = ref(0);

const getFullImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // If it's already a full URL, return as is
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  // If it starts with /media/, it's a relative path
  if (imagePath.startsWith('/media/')) {
    return `${BACKEND_URL}${imagePath}`;
  }
  
  // If it doesn't start with /, assume it's a relative path
  if (!imagePath.startsWith('/')) {
    return `${BACKEND_URL}/media/${imagePath}`;
  }
  
  // Otherwise, assume it's a relative path from the backend
  return `${BACKEND_URL}${imagePath}`;
};

const fullImageUrls = computed(() => {
  return props.images.map(image => getFullImageUrl(image));
});

const showLightbox = (imageIndex) => {
  index.value = imageIndex;
  visible.value = true;
};

const handleImageError = (event) => {
  console.error('Image failed to load:', event.target.src);
  // You could set a fallback image here if needed
};
</script>

<style scoped lang="scss">
// Image Gallery Styles
.image-gallery {
  margin: 1rem 0;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
}

// Grid Layout
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-width: 100%;
}

.gallery-item {
  aspect-ratio: 4/3;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

// Responsive Design
@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.4rem;
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.3rem;
  }
}

@media (max-width: 400px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
    gap: 0.25rem;
  }
}
</style> 