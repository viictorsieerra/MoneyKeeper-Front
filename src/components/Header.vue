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
      <button id="loginBtn">Iniciar sesión</button>
      <button id="registerBtn">Registrarse</button>
    </div>
  </header>

  <div id="modalOverlay" class="modal-overlay">
    <div class="modal">
      <h2 id="modalTitle">Iniciar sesión</h2>
      <form id="modalForm">
        <input type="email" id="emailInput" placeholder="Correo electrónico" required />
        <input type="password" id="passwordInput" placeholder="Contraseña" required />
        <button type="submit" id="submitBtn">Iniciar sesión</button>
        <button type="button" id="closeModal">Cancelar</button>
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
h2 {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
#submitBtn {
  background-color: #007bff;
  color: white;
}
#submitBtn:hover {
  background-color: #0056b3;
}
#closeModal {
  background-color: #ccc;
}
#closeModal:hover {
  background-color: #aaa;
}
</style>