<template>
  <div>
    <header class="header">
      <Header />
    </header>
<RouterView />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
.header {
 z-index: 1;
}
</style>