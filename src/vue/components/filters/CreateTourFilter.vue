<template>
  <div class="filter-container">
    <h2 class="filter-title">Update Tour Preferences</h2>
    
    <div class="under-development">
      <div class="development-icon">🚧</div>
      <h3>Under Development</h3>
      <p>This feature is currently being developed. Check back soon!</p>
    </div>
  </div>
</template>

<script setup>
// Component under development
</script>

<style scoped lang="scss">
.filter-container {
  max-width: 600px;
  margin: 0 auto;
}

.filter-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif;
}

.under-development {
  text-align: center;
  padding: 3rem 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  border: 2px dashed #dee2e6;
  
  .development-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #495057;
    margin-bottom: 1rem;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  }
  
  p {
    font-size: 1rem;
    color: #6c757d;
    line-height: 1.6;
    font-family: 'Montserrat', Arial, Helvetica, sans-serif;
  }
}
</style> 