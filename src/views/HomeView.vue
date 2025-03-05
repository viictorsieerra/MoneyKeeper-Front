<script setup lang="ts">
import Hero from '../components/Hero.vue';
import Features from '../components/Features.vue';
import NombreDinamico from '@/components/NombreDinamico.vue';
import Registro from '@/components/Registro.vue';
import FondoCanvas from '@/components/FondoCanvas.vue';
</script>

<template>
    <div class="home-view">
      <FondoCanvas /> 
      <Features />
      <Hero />
      <NombreDinamico />
      <Registro />
    </div>
  </template>
  
  <style scoped lang="scss">
  .home-view {
    position: relative;
    z-index: 0;
    min-height: 100vh; 
    overflow: auto; 
  }
  </style>