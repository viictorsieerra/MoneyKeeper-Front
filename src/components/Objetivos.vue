<template>
    
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const goals = ref([
  { title: "Reformar mi casa", image: "/images/house.png" },

  { title: "Comprar un coche", image: "https://www.fintonic.com/src/images/objectives/car.png" },
  { title: "Unificar deudas", image: "https://www.fintonic.com/src/images/objectives/debts.png" },
  { title: "El mejor seguro para mí", image: "https://www.fintonic.com/src/images/objectives/insurance.png" },
  { title: "Organizar mis finanzas", image: "https://www.fintonic.com/src/images/objectives/finances.png" },
  { title: "Hacer crecer mi dinero", image: "https://www.fintonic.com/src/images/objectives/grow-money.png" }
]);

  
  const selectGoal = (goal) => {
    console.log(`Seleccionaste: ${goal.title}`);
  };
  </script>
  
  <style scoped>
  .title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #1E2A39;
  }
  
  /* Contenedor de tarjetas alineadas */
  .goal-container {
    display: flex;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }
  
  /* Estilos de las tarjetas */
  .goal-card {
    text-align: center;
    border-radius: 16px;
    background-color: #F8FAFC;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    width: 160px;
  }
  
  .goal-card:hover {
    transform: translateY(-5px);
  }
  
  /* Contenedor de la imagen con borde curvo superior */
  .image-container {
    width: 100%;
    height: 120px;
    overflow: hidden;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  /* Imagen dentro del contenedor */
  .goal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  /* Estilos del texto */
  .goal-text {
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0.75rem;
    color: #1E2A39;
  }
  </style>
  