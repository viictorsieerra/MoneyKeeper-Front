<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useJWTStore } from '@/stores/JWT';
import { useUsuarioStore } from '@/stores/Usuario';
import LoginDTO from '@/stores/DTO/LoginDTO';
import RegisterDTO from '@/stores/DTO/RegistroDTO';

const store = useJWTStore();
const loginDTO = ref(new LoginDTO());
const registerDTO = ref(new RegisterDTO());
console.log(store)

const user =  computed(() => store.usuario);

const isModalOpen = ref(false);
const modalType = ref<'login' | 'register'>('login');

const openModal = (type: 'login' | 'register') => {
  modalType.value = type;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const submitForm = () => {
  if (modalType.value === 'login') {
    store.loginUser(loginDTO.value);
  } else {
    store.registerUser(registerDTO.value);
  }
  closeModal();
};

// Dibuja el logo en el canvas
onMounted(() => {
  const canvas = document.getElementById('logoCanvas') as HTMLCanvasElement;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = 120;
  canvas.height = 50;

  ctx.fillStyle = '#FF0000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = 'bold 20px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('MiLogo', canvas.width / 2, canvas.height / 2);
});

</script>

<template>
  <header class="header">
    <!-- Logo en canvas -->
    <canvas id="logoCanvas" class="header__logo"></canvas>

    <nav class="header__nav">
      <router-link to="/" class="header__nav-link">Inicio</router-link>
      <router-link to="/como-funciona" class="header__nav-link">Cómo funciona</router-link>
      <router-link to="/consejos" class="header__nav-link">Consejos</router-link>
      <router-link to="/sobre-nosotros" class="header__nav-link">Sobre Nosotros</router-link>
    </nav>

    <div class="header__actions">
      <div v-if="user._nombre === undefined">
        <button @click="openModal('login')" class="header__button">Iniciar sesión</button>
        <button @click="openModal('register')" class="header__button">Registrarse</button>
      </div>
      <div v-if="user && user._nombre">
        <div class="header__actions__usuario-logo">
          <p>{{ user._nombre.charAt(0) }}</p>
        </div>
      </div>
    </div>
  </header>

  <!-- Modal -->
  <div v-if="isModalOpen" class="modal-overlay">
    <div class="modal">
      <h2 class="modal__title">{{ modalType === 'login' ? 'Iniciar sesión' : 'Registrarse' }}</h2>
      <form @submit="submitForm" class="modal__form">

        <!-- L O G I N -->
        <template v-if="modalType === 'login'">
          <input type="email" v-model="loginDTO._correo" class="modal__input" placeholder="Correo electrónico"
            required />
          <input type="password" v-model="loginDTO._contrasena" class="modal__input" placeholder="Contraseña"
            required />
        </template>
        <!-- R E G I S T R O -->
        <template v-if="modalType === 'register'">
          <input type="email" v-model="registerDTO._correo" class="modal__input" placeholder="Correo electrónico"
            required />
          <input type="password" v-model="registerDTO._contrasena" class="modal__input" placeholder="Contraseña"
            required />
          <input type="text" v-model="registerDTO._nombre" class="modal__input" placeholder="Nombre" required />
          <input type="text" v-model="registerDTO._apellido" class="modal__input" placeholder="Apellido" required />
          <input type="date" v-model="registerDTO._fechaNacimiento" class="modal__input" required />
          <input type="text" v-model="registerDTO._dni" class="modal__input" placeholder="DNI" required />
        </template>

        <button type="submit" class="modal__button">
          {{ modalType === 'login' ? 'Iniciar sesión' : 'Registrarse' }}
        </button>
        <button type="button" @click="closeModal" class="modal__button modal__button--close">Cancelar</button>
      </form>

    </div>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;

  &__logo {
    width: 120px;
    height: 50px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &__nav {
    margin-top: 1rem;

    &-link {
      margin: 0.5rem 0;
      text-decoration: none;
      color: #333;
    }
  }

  &__actions {
    margin-top: 1rem;
    &__usuario{
      &-logo{
        height: 40px;
        width: 40px;
        display: flex;
        place-items: center;
        justify-content: center;
        background-color: red;
        border-radius: 100%;
        color: black;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }

  &__button {
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    border: none;
    background-color: #FF0000;
    color: white;
    cursor: pointer;
  }
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    margin-bottom: 1rem;
  }

  &__input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &__button {
    width: 100%;
    padding: 0.5rem;
    margin-top: 0.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;

    &--close {
      background-color: #ccc;
    }

    &--close:hover {
      background-color: #aaa;
    }
  }
}

@media (min-width: 768px) {
  .header {
    flex-direction: row;
    justify-content: space-between;
  }

  .header__nav {
    margin-top: 0;
  }

  .header__nav-link {
    margin: 0 1rem;
  }

  .header__actions {
    margin-top: 0;
  }

  .header__button {
    margin-left: 1rem;
    margin-top: 0;
  }
}
</style>