<template>
  <div>
    <Header />
    <NombreDinamico />
    <Features />
    <Hero />
    <Objetivos />
    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
import Footer from './components/Footer.vue';
import NombreDinamico from './components/NombreDinamico.vue';
import Objetivos from './components/Objetivos.vue'
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>