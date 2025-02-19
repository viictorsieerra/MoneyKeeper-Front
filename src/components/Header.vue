<template>
    <header>
      <div class="logo">MiLogo</div>
      <nav>
        <a href="#">Inicio</a>
        <a href="#">Cómo funciona</a>
        <a href="#">Precios</a>
        <a href="#">Ayuda</a>
      </nav>
      <div class="actions">
        <button>Iniciar sesión</button>
        <button>Registrarse</button>
      </div>
    </header>
  </template>
  
  <script setup>
  
  </script>
  
  <style scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #f8f9fa;
  }
  .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  nav a {
    margin: 0 1rem;
    text-decoration: none;
    color: #333;
  }
  .actions button {
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color:#FF0000;
    color: white;
    cursor: pointer;
  }
  </style>