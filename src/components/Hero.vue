<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">Controla tus finanzas de forma fácil</h1>
      <p class="hero__description">La mejor herramienta para gestionar tu dinero.</p>
      <button class="hero__button">Empieza gratis</button>
    </div>
    <img src="/FinanzasPersonales.jpg" alt="Imagen principal" class="hero__image">
  </section>
</template>

<script setup>
</script>

<style scoped lang="scss">
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #e9ecef;
  margin: 1%;
  border-radius: 10px;
}
.hero__content {
  max-width: 100%;
  text-align: center;
}
.hero__title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.hero__description {
  font-size: 1rem;
  margin-bottom: 2rem;
}
.hero__button {
  padding: 0.75rem 1.5rem;
  background-color: #FF0000;
  color: white;
  border: none;
  cursor: pointer;
}
.hero__image {
  max-width: 100%;
  margin-top: 2rem;
}
@media (min-width: 768px) {
  .hero {
    flex-direction: row;
    justify-content: space-between;
  }
  .hero__content {
    max-width: 50%;
    text-align: left;
  }
  .hero__image {
    max-width: 40%;
    margin-top: 0;
  }
}
</style>