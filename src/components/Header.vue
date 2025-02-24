<template>
  <header class="header">
    <div class="header__logo">MiLogo</div>
    <nav class="header__nav">
      <router-link to="/" class="header__nav-link">Inicio</router-link>
      <router-link to="/como-funciona" class="header__nav-link">Cómo funciona</router-link>
      <router-link to="/precios" class="header__nav-link">Precios</router-link>
      <router-link to="/ayuda" class="header__nav-link">Ayuda</router-link>
    </nav>
    <div class="header__actions">
      <button id="loginBtn" class="header__button">Iniciar sesión</button>
      <button id="registerBtn" class="header__button">Registrarse</button>
    </div>
  </header>

  <div id="modalOverlay" class="modal-overlay">
    <div class="modal">
      <h2 id="modalTitle" class="modal__title">Iniciar sesión</h2>
      <form id="modalForm" class="modal__form">
        <input type="email" id="emailInput" class="modal__input" placeholder="Correo electrónico" required />
        <input type="password" id="passwordInput" class="modal__input" placeholder="Contraseña" required />
        <button type="submit" id="submitBtn" class="modal__button">Iniciar sesión</button>
        <button type="button" id="closeModal" class="modal__button modal__button--close">Cancelar</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  const modalOverlay = document.getElementById('modalOverlay');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');
  const closeModalBtn = document.getElementById('closeModal');
  const modalTitle = document.getElementById('modalTitle');
  const submitBtn = document.getElementById('submitBtn');
  const modalForm = document.getElementById('modalForm');

  modalOverlay.style.display = 'none';

  function openModal(type) {
    modalTitle.textContent = type === 'login' ? 'Iniciar sesión' : 'Registrarse';
    submitBtn.textContent = type === 'login' ? 'Iniciar sesión' : 'Registrarse';
    submitBtn.dataset.action = type;
    modalOverlay.style.display = 'flex';
  }

  function closeModal() {
    modalOverlay.style.display = 'none';
  }

  loginBtn.addEventListener('click', () => openModal('login'));
  registerBtn.addEventListener('click', () => openModal('register'));
  closeModalBtn.addEventListener('click', closeModal);

  modalForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = (document.getElementById('emailInput') as HTMLInputElement).value;
    const password = (document.getElementById('passwordInput') as HTMLInputElement).value;
    const action = submitBtn.dataset.action;

    console.log(`${action === 'login' ? 'Iniciando sesión' : 'Registrando'} con`, email, password);
    closeModal();
  });
});
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
}
.header__logo {
  font-size: 1.5rem;
  font-weight: bold;
}
.header__nav {
  margin-top: 1rem;
}
.header__nav-link {
  margin: 0.5rem 0;
  text-decoration: none;
  color: #333;
}
.header__actions {
  margin-top: 1rem;
}
.header__button {
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  border: none;
  background-color: #FF0000;
  color: white;
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
}
.modal {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}
.modal__title {
  margin-bottom: 1rem;
}
.modal__input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.modal__button {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.modal__button--submit {
  background-color: #007bff;
  color: white;
}
.modal__button--submit:hover {
  background-color: #0056b3;
}
.modal__button--close {
  background-color: #ccc;
}
.modal__button--close:hover {
  background-color: #aaa;
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