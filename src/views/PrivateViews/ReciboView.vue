<script setup lang="ts">
import { useReciboStore } from '@/stores/Recibos'
import { ref } from 'vue'

const showForm = ref(false)

const newRecibo = ref({
  _nombreRecibo: '',
  _idUsuario: 1, // Puedes obtenerlo de la tienda o algún contexto si es necesario
  _idCuenta: 1,  // Lo mismo para esto
  _dineroRecibo: 0,
  _activa: true,
  _fecRecibo: new Date().toISOString().split('T')[0] 
})

const store = useReciboStore()

async function crearRecibo() {
  try {
    await store.createRecibo(newRecibo.value) 
    showForm.value = false 
    newRecibo.value = { _nombreRecibo: '', _dineroRecibo: 0, _activa: true, _fecRecibo: new Date().toISOString().split('T')[0] } // Limpiar formulario
    await store.findByUser() 
    console.log('Recibo agregado')
  } catch (error) {
    console.error('Error al agregar el recibo:', error)
  }
}

store.findByUser() 
</script>

<template>
  <main class="recibos">
    <h2 class="recibos__titulo">Listado de Recibos</h2>

    <!-- Botón para mostrar el formulario de añadir recibo -->
    <button @click="showForm = !showForm" class="btn-add">Añadir Recibo</button>

    <!-- Formulario para añadir un nuevo recibo -->
    <div v-if="showForm" class="recibos__form">
      <h3>Nuevo Recibo</h3>
      <form @submit.prevent="crearRecibo">
        <div>
          <label for="nombreRecibo">Nombre del Recibo:</label>
          <input type="text" id="nombreRecibo" v-model="newRecibo._nombreRecibo" required />
        </div>
        <div>
          <label for="dineroRecibo">Dinero del Recibo (€):</label>
          <input type="number" id="dineroRecibo" v-model="newRecibo._dineroRecibo" required />
        </div>
        <div>
          <label for="fecRecibo">Fecha del Recibo:</label>
          <input type="date" id="fecRecibo" v-model="newRecibo._fecRecibo" required />
        </div>
        <div>
          <label for="activo">Activo:</label>
          <input type="checkbox" id="activo" v-model="newRecibo._activa" />
        </div>
        <button type="submit">Crear Recibo</button>
      </form>
    </div>

    <!-- Listado de recibos -->
    <div class="recibos__views" v-for="meta in store.recibos" :key="meta._idRecibo">
      <div class="recibos__views-card">
        <p><span>Nombre del recibo:</span> {{ meta._nombreRecibo }}</p>
        <p><span>Dinero del recibo:</span> {{ meta._dineroRecibo }}€</p>
        <p><span>Activo:</span> {{ meta._activa ? 'Sí' : 'No' }}</p>
        <p><span>Fecha del recibo:</span> {{ meta._fecRecibo }}</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.recibos {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 5%;
  margin-bottom: 2%;
  height: fit-content;

  &__titulo {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  &__views {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-card {
      background: white;
      padding: 15px;
      border-radius: 8px;
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease-in-out;
      margin-top: 2%;
      margin-bottom: 2%;

      &:hover {
        transform: translateY(-3px);
      }

      p {
        margin: 5px 0;
        font-size: 1rem;
        color: #555;

        span {
          font-weight: bold;
          color: #222;
        }
      }
    }
  }

  &__form {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #e9ecef;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;

    h3 {
      text-align: center;
      margin-bottom: 15px;
      font-size: 1.6rem;
      color: #333;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 15px;

      div {
        display: flex;
        flex-direction: column;
        gap: 5px;

        label {
          font-weight: bold;
          color: #333;
        }

        input[type="text"],
        input[type="number"],
        input[type="date"] {
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ddd;
        }

        input[type="checkbox"] {
          width: 20px;
          height: 20px;
        }
      }

      button {
        padding: 10px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #218838;
        }
      }
    }
  }

  .btn-add {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
