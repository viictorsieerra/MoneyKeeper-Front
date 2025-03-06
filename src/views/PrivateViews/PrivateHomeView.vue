<template>
  <div class="private-home">
    <nav class="private-home__navbar">
      <ul class="private-home__nav-list">
        <li class="private-home__nav-item">
          <router-link to="/meta-ahorro" class="private-home__nav-link">Ahorros</router-link>
        </li>
        <li class="private-home__nav-item">
          <router-link to="/transacciones" class="private-home__nav-link">Transacciones</router-link>
        </li>
        <li class="private-home__nav-item">
          <router-link to="/recibos" class="private-home__nav-link">Recibos</router-link>
        </li>
        <li class="private-home__nav-item">
          <router-link to="/cuenta-bancaria" class="private-home__nav-link">Cuentas</router-link>
        </li>
      </ul>
    </nav>
    <div class="private-home__content">
      <router-view v-slot="{ Component }">
        <component :is="Component" v-if="Component" />
        <div v-else class="private-home__welcome">
          <h1>Bienvenido a tu zona privada, {{ userName }}!</h1>
        </div>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
// import { useUsersStore } from '@/stores/users.ts';  

/*const usersStore = useUsersStore();
const userName = computed(() => usersStore.user?.name || 'Usuario');*/
const userName = "Benchaa"
</script>

<style scoped>
.private-home {
  display: flex;
  height: 100vh;
  font-family: 'Roboto', sans-serif;
}

.private-home__navbar {
  width: 250px;
  background-color: #FF0000;;
  color: white;
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
}

.private-home__navbar:hover {
  background: linear-gradient(135deg, #FF0000);
}

.private-home__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.private-home__nav-item {
  margin-bottom: 1.2rem;
}

.private-home__nav-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s, transform 0.2s ease;
}

.private-home__nav-link:hover {
  color: black;
  transform: scale(1.1);
}

.private-home__content {
  flex: 1;
  padding: 2rem;
  background-color: #f1f3f5;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.private-home__welcome {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  transition: all 0.3s ease-in-out;
}

.private-home__welcome h1 {
  margin: 0;
  font-size: 2.5rem;
  color:#FF0000;
  text-transform: uppercase;
}

.private-home__welcome:hover {
  transform: translateY(-10px);
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
}
</style>
