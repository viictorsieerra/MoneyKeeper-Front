<template>
  <section class="features">
    <h2 class="features__title">¿Qué ofrecemos?</h2>
    <div class="features__list">
      <div class="features__card" v-for="feature in features" :key="feature.id">
        <img :src="feature.icon" :alt="feature.title" class="features__icon">
        <h3 class="features__card-title">{{ feature.title }}</h3>
        <p class="features__card-description">{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  {
    id: 1,
    icon: "https://www.endalia.com/wp-content/uploads/control-gastos-organizacion.png",
    title: "Gestión de gastos",
    description: "Lleva un control detallado de tus ingresos y egresos. Clasifica tus gastos, identifica patrones y descubre oportunidades para optimizar tu presupuesto.",
  },
  {
    id: 2,
    icon: "https://png.pngtree.com/thumb_back/fw800/background/20230220/pngtree-smart-saving-a-piggy-bank-in-graduation-cap-and-glasses-with-coins-representing-the-importance-of-saving-for-education-photo-image_49381688.jpg",
    title: "Ahorro inteligente",
    description: "Define metas de ahorro y automatiza tus aportes para lograr tus objetivos sin complicaciones. Ya sea para un viaje, un coche o un fondo de emergencia, te ayudamos a hacerlo realidad.",
  },
  {
    id: 3,
    icon: "https://www.groups3.com/wp-content/uploads/2023/12/Como-elaborar-informes-de-compra-detallados.jpg",
    title: "Informes detallados",
    description: "Obtén reportes visuales con gráficos y estadísticas sobre tus finanzas. Analiza tu evolución y toma decisiones basadas en datos para mejorar tu estabilidad económica.",
  },
  {
    id: 4,
    icon: "https://nattia.com/wp-content/uploads/2024/04/drex_usuarios_y_perfiles_custom.png",
    title: "Control de cuentas",
    description: " Conecta todas tus cuentas bancarias y tarjetas en un solo lugar. Visualiza saldos, transacciones y movimientos en tiempo real sin cambiar de aplicación.",
  }
];
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';

.features {
  padding: 1rem;
  text-align: center;
}

.features__title {
  @include responsive-font-size(1.5rem);
  color: $secondary-color;
}

.features__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}

.features__card {
  padding: 1rem;
  background-color: $background-color;
  border-radius: 10px;
  text-align: center;
  border: 1px solid $border-color;

  @media (min-width: 768px) {
    max-width: 45%;
  }

  @media (min-width: 1024px) {
    max-width: 30%;
  }
}

.features__icon {
  width: 170px;
  height: 120px;
  margin-bottom: 1rem;
}

.features__card-title {
  @include responsive-font-size(1.25rem);
  margin-bottom: 0.5rem;
  color: $secondary-color;
}

.features__card-description {
  font-size: 1rem;
  color: $text-color;
}
</style>