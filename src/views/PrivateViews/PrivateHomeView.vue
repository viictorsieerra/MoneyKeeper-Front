<template>
  <div class="private-home">
    <FondoCanvas class="private-home__fondo" />
    <div class="private-home__layout">
  
      <aside class="private-home__sidebar">
        <nav class="private-home__navbar">
          <ul class="private-home__nav-list">
            <li class="private-home__nav-item">
              <router-link to="/private/meta-ahorro" class="private-home__nav-link" active-class="active-link">
                Ahorros
              </router-link>
            </li>
            <li class="private-home__nav-item">
              <router-link to="/private/transacciones" class="private-home__nav-link" active-class="active-link">
                Transacciones
              </router-link>
            </li>
            <li class="private-home__nav-item">
              <router-link to="/private/recibos" class="private-home__nav-link" active-class="active-link">
                Recibos
              </router-link>
            </li>
            <li class="private-home__nav-item">
              <router-link to="/private/cuenta-bancaria" class="private-home__nav-link" active-class="active-link">
                Cuentas
              </router-link>
            </li>
            <li class="private-home__nav-item">
              <router-link to="/private/presupuestos" class="private-home__nav-link" active-class="active-link">
                Presupuestos
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="private-home__content">
        <RouterView /> 
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import FondoCanvas from '@/components/FondoCanvas.vue';
import { computed } from 'vue';
// import { useUsersStore } from '@/stores/users.ts';  

/*const usersStore = useUsersStore();
const userName = computed(() => usersStore.user?.name || 'Usuario');*/
const userName = "Benchaa"
</script>

<style scoped lang="scss">
.footer{
  display: none;
}
.private-home {
  display: flex;
  min-height: 100vh;
  flex-direction: column; 
}

.private-home__layout {
  display: flex;
  flex-direction: column; 
  width: 100%;
}

.private-home__sidebar {
  width: 100%; 
  background: #20232a;
  padding: 10px 0; 
  color: white;
  min-height: auto; 
}

.private-home__content {
  width: 100%; 
}

.private-home__nav-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-direction: row;
  overflow-x: auto; 
}

.private-home__nav-item {
  margin-bottom: 0;
  flex: 0 0 auto; 
}

.private-home__nav-link {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px 5px;
}

.active-link {
  background: $primary-color;
  color: black;
}


@media (min-width: 768px) {
  .private-home {
    flex-direction: row;
  }

  .private-home__layout {
    flex-direction: row;
    width: 100%;
  }

  .private-home__sidebar {
    width: 250px; 
    padding: 20px; 
    min-height: 100vh;
  }

  .private-home__content {
    width: 85%; 
  }

  .private-home__nav-list {
    flex-direction: column;
    overflow-x: visible;
  }

  .private-home__nav-item {
    margin-bottom: 10px; 
  }

  .private-home__nav-link {
    padding: 10px; 
  }
}
</style>