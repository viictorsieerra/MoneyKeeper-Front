<template>
    <div class="private-home">
      <nav class="private-home__navbar">
        <ul class="private-home__nav-list">
          <li class="private-home__nav-item">
            <router-link to="/ahorros" class="private-home__nav-link">Ahorros</router-link>
          </li>
          <li class="private-home__nav-item">
            <router-link to="/transacciones" class="private-home__nav-link">Transacciones</router-link>
          </li>
          <li class="private-home__nav-item">
            <router-link to="/gestion-gastos" class="private-home__nav-link">Gestión de gastos</router-link>
          </li>
          <li class="private-home__nav-item">
            <router-link to="/informes" class="private-home__nav-link">Informes</router-link>
          </li>
        </ul>
      </nav>
      <div class="private-home__content">
        <router-view></router-view>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .private-home {
    display: flex;
    height: 100vh;
  }
  
  .private-home__navbar {
    width: 250px;
    background-color: #333;
    color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  
  .private-home__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .private-home__nav-item {
    margin-bottom: 1rem;
  }
  
  .private-home__nav-link {
    color: white;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s;
  }
  
  .private-home__nav-link:hover {
    color: #ff0000;
  }
  
  .private-home__content {
    flex: 1;
    padding: 2rem;
    background-color: #f8f9fa;
  }
  </style>