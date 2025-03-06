<script setup lang="ts">
import { computed } from 'vue';
import { useJWTStore } from '@/stores/JWT';

const store = useJWTStore();
store.getUser()
const usuario = computed(() => store.usuario);
console.log("Fecha Nacimiento "+ usuario._fecNacimiento)
var contrasena = ""
const submitForm = () => {
  usuario._contrasena = contrasena
};
</script>

<template>
  <div class="usuario">
    <form @submit.prevent="submitForm" class="form">
      <div class="form-campo">
        <label for="nombre">Nombre</label>
        <input type="text" v-model="usuario._nombre" class="form-campo-input" />
      </div>
      <div class="form-campo">
        <label for="apellido">Apellido</label>
        <input type="text" v-model="usuario._apellido" class="form-campo-input" />
      </div>
      <div class="form-campo">
        <label for="correo">Correo</label>
        <input type="email" v-model="usuario._correo" readonly class="form-campo-input" />
      </div>
      <div class="form-campo">
        <label for="contrasena">Nueva Contraseña</label>
        <input type="password" v-model="contrasena" placeholder="" class="form-campo-input" />
      </div>
      <div class="form-campo">
        <label for="dni">DNI</label>
        <input type="text" v-model="usuario._dni" class="form-campo-input" readonly />
      </div>
      <div class="form-campo">
        <label for="fecNacimiento">Fecha de Nacimiento</label>
        <input type="date" v-model="usuario._fecNacimiento" readonly class="form-campo-input" />
      </div>
      <button type="submit" class="form-enviar">Actualizar Datos</button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.usuario {
  margin: 0 auto;
  padding: 20px;
  max-width: 100%; // Ajuste para dispositivos móviles
  display: flex;
  justify-content: center;
  align-items: center;
}

.form {
  background-color: #f8f9fa;
  max-width: 500px; // Limita el tamaño en pantallas más grandes
  padding: 20px; // Tamaño ajustado para pantallas pequeñas
  margin: 0 15px; // Añadir margen lateral para evitar bordes duros en móviles
  display: flex;
  flex-direction: column;

  &-campo {
    margin-bottom: 15px;

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    &-input {
      width: 100%; // Asegura que los campos llenen el ancho disponible
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
}

.form-enviar {
  padding: 10px 15px;
  background-color: $primary-color;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: $secondary-color;
  }
}

// Añadir consulta para pantallas más grandes
@media (min-width: 768px) {
  .usuario {
    max-width: 700px; // Ampliar el contenedor en pantallas más grandes
  }

  .form {
    padding: 30px; // Añadir más espacio interno
    margin: 30px auto; // Centrar formulario
  }
}
</style>
