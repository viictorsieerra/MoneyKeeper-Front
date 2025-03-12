<template>
  <div class="container mx-auto text-center p-8">
    <h2 class="title">Hazte cliente de la manera más fácil y rápida: a través de la web</h2>
    
    <div class="steps-container">
      <div class="step">
        <div class="step-number">1</div>
        <p class="step-description">Pincha en 'Registrase'</p>
      </div>
      <div class="step">
        <div class="step-number">2</div>
        <p class="step-description">Rellena tus datos y carga tus documentos</p>
      </div>
      <div class="step">
        <div class="step-number">3</div>
        <p class="step-description">Haz una transferencia, y listo</p>
      </div>
    </div>
    
    <h2 class="subtitle">¿Quién puede hacerse cliente?</h2>
    
    <div class="client-types">
      <div class="client-type">
        <div class="icon">💎</div>
        <h3 class="client-title">Particulares y Cotitulares</h3>
        <p class="client-description">Para particulares y cotitulares mayores de 18 años.</p>
      </div>
      <div class="client-type">
        <div class="icon">🏠</div>
        <h3 class="client-title">Residentes Fiscales en España</h3>
        <p class="client-description">Los residentes de País Vasco y Navarra, sólo podrán hacerse clientes a través de la web.</p>
      </div>
      <div class="client-type">
        <div class="icon">🌍</div>
        <h3 class="client-title">Cualquier Nacionalidad</h3>
        <p class="client-description">Nacionalidad española y extranjera (excepto de EE.UU.*)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';

.container {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  margin-bottom: 10%;
  @media (min-width: 768px) {
    max-width: 1200px;
  }
}

.title {
  @include responsive-font-size(1.5rem);
  font-weight: bold;
  color: $secondary-color;
}

.steps-container {
  display: grid;
  justify-content: center;
  justify-items: center;
  margin-top: 1.5rem;
  gap: 1.5rem;
  @media (min-width: 768px) {
    display: flex;
  }
}

.step {
  text-align: center;
  padding: 1rem;
  border: 1px solid $border-color;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: $background-color;
  width: 80%;

  @media (min-width: 768px) {
    padding: 2rem;
    width: 35%;
  }
}

.step-number {
  @include responsive-font-size(1.25rem);
  font-weight: bold;
  color: $primary-color;
}

.step-description {
  margin-top: 0.5rem;
  color: $text-color;
}

.button-container {
  text-align: center;
  margin-top: 1.5rem;
}

.start-button {
  padding: 0.5rem 1.5rem;
  border: 1px solid $primary-color;
  color: $primary-color;
  border-radius: 0.5rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: $primary-color;
    color: $background-color;
  }
}

.subtitle {
  @include responsive-font-size(1.5rem);
  margin-top: 3rem;
  font-weight: bold;
  color: $secondary-color;
}

.client-types {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.client-type {
  text-align: center;
  padding: 1rem;
  border: 1px solid $border-color;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: $background-color;

  @media (min-width: 768px) {
    padding: 2rem;
  }
}

.icon {
  font-size: 2rem;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
}

.client-title {
  margin-top: 0.5rem;
  font-weight: bold;
  color: $secondary-color;
}

.client-description {
  margin-top: 0.5rem;
  color: $text-color;
}
</style>