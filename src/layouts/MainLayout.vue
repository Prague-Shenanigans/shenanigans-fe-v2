<template>
  <div class="default-layout">
    <div class="hamburger-container">
      <button class="hamburger" @click="toggleMenu">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button>
      <div v-if="menuOpen" class="menu-dropdown">
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="layout-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const menuOpen = ref(false);
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  position: relative;
}
.hamburger-container {
  position: fixed;
  top: 12px;
  right: 12px;
  z-index: 1000;
  border-radius: 16px;
  padding: 12px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.122);
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: center;  
}
.hamburger {
  width: 48px;
  height: 48px;
  background: #fff;
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: box-shadow 0.2s;
}
.hamburger:active {
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.bar {
  width: 24px;
  height: 2.5px;
  background: #333333b4;
  margin: 3px 0;
  border-radius: 2px;
  transition: all 0.3s;
}
.menu-dropdown {
  position: absolute;
  top: 56px;
  right: 0;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.12);
  padding: 16px 0;
  min-width: 160px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.menu-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
}
.menu-dropdown li {
  width: 100%;
}
.menu-dropdown a {
  display: block;
  width: 100%;
  padding: 12px 24px;
  color: #333;
  text-decoration: none;
  transition: background 0.2s;
}
.menu-dropdown a:hover {
  background: #f0f0f0;
}
@media (max-width: 1024px) {
  .hamburger {
    width: 44px;
    height: 44px;
  }
  .menu-dropdown {
    min-width: 140px;
  }
}
@media (max-width: 600px) {
  .hamburger {
    width: 40px;
    height: 40px;
  }
  .hamburger-container {
    top: 12px;
    right: 12px;
  }
  .menu-dropdown {
    min-width: 120px;
    top: 44px;
  }
}
</style>
