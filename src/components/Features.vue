<template>
    <section class="features">
      <h2>¿Qué ofrecemos?</h2>
      <div class="feature-list">
        <div class="feature-card" v-for="feature in features" :key="feature.id">
          <img :src="feature.icon" :alt="feature.title">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  const features = [
    {
      id: 1,
      icon: "../public/images/icon1.png",
      title: "Gestión de gastos",
      description: "Lleva un control detallado de tus ingresos y egresos. Clasifica tus gastos, identifica patrones y descubre oportunidades para optimizar tu presupuesto.",
    },
    {
      id: 2,
      icon: "../public/images/icon2.png",
      title: "Ahorro inteligente",
      description: "Define metas de ahorro y automatiza tus aportes para lograr tus objetivos sin complicaciones. Ya sea para un viaje, un coche o un fondo de emergencia, te ayudamos a hacerlo realidad.",
    },
    {
      id: 3,
      icon: "../public/images/icon3.png",
      title: "Informes detallados",
      description: "Obtén reportes visuales con gráficos y estadísticas sobre tus finanzas. Analiza tu evolución y toma decisiones basadas en datos para mejorar tu estabilidad económica.",
    },
    {
      id: 4,
      icon: "../public/images/icon3.png",
      title: "Control de cuentas",
      description: " Conecta todas tus cuentas bancarias y tarjetas en un solo lugar. Visualiza saldos, transacciones y movimientos en tiempo real sin cambiar de aplicación.",
    }
  ];
  </script>
  
  <style scoped lang="scss">
  .features {
    padding: 2rem;
    text-align: center;
  }
  .feature-list {
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
  }
  .feature-card {
    max-width: 30%;
    text-align: center;
    padding: 2rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    max-width: 600px;
    margin: 45px auto;
    margin-left: 20px;
  }
  .feature-card img {
    width: 50px;
    height: 50px;
  }
  </style>