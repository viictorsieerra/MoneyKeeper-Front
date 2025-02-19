<template>
    <section class="hero">
      <div class="content">
        <h1>Controla tus finanzas de forma fácil</h1>
        <p>La mejor herramienta para gestionar tu dinero.</p>
        <button>Empieza gratis</button>
      </div>
      <img src="../public/images/hero-image.png" alt="Imagen principal">
    </section>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  .hero {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    background-color: #e9ecef;
    margin: 1%;
    border-radius: 10px;
  }
  .hero .content {
    max-width: 50%;
  }
  .hero h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  .hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  .hero button {
    padding: 0.75rem 1.5rem;
    background-color: #FF0000;
    color: white;
    border: none;
    cursor: pointer;
  }
  .hero img {
    max-width: 40%;
  }
  </style>