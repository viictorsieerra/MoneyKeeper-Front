<template>
  <section class="hero">
    <div class="hero__content">
      <h1 class="hero__title">Controla tus finanzas de forma fácil</h1>
      <p class="hero__description">La mejor herramienta para gestionar tu dinero.</p>
      <div class="hero__div">Empieza gratis</div>
    </div>
    <img src="/FinanzasPersonales.jpg" alt="Imagen principal" class="hero__image">
  </section>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: $hero-background-color;
  margin: 1%;
  border-radius: 10px;
  width: 89%;
  margin-left: 5%;
}

.hero__content {
  max-width: 100%;
  text-align: center;
}

.hero__title {
  @include responsive-font-size(2rem);
  margin-bottom: 1rem;
  color: $secondary-color;
}

.hero__description {
  @include responsive-font-size(1rem);
  margin-bottom: 2rem;
  color: $text-color;
}

.hero__div {
  padding: 20px;
  display: flex;
  width: 220px;
  justify-content: center;
  background-color: $primary-color;
  color: $background-color;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.hero__image {
  max-width: 100%;
  margin-top: 2rem;
  border-radius: 10px;
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