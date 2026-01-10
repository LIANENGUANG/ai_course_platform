<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: #42b983;
}

nav a.router-link-exact-active {
  color: #42b983;
  border-bottom: 2px solid #42b983;
  padding-bottom: 0.25rem;
}

main {
  flex: 1;
  padding: 2rem;
}
</style>
