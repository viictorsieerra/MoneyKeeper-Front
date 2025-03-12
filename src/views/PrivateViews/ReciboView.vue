<script setup lang="ts">
import { useReciboStore } from '@/stores/Recibos'
import { ref, computed } from 'vue'

const showForm = ref(false)

const newRecibo = ref({
  _nombreRecibo: '',
  _idUsuario: 1, 
  _idCuenta: 1,  
  _dineroRecibo: 0,
  _activa: true,
  _fecRecibo: new Date().toISOString().split('T')[0] 
})

const store = useReciboStore()

const recibos = computed(() => store.recibos)

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

async function eliminarRecibo(idRecibo: number) {
  try {
    console.log(`ID a eliminar: ${idRecibo}`)
    await store.deleteRecibo(idRecibo)
    console.log('Recibo eliminado')
  } catch (error) {
    console.error('Error al eliminar el recibo:', error)
  }
}

store.findByUser() 
</script>

<template>
  <main class="recibos">
    <h2 class="recibos__titulo">Listado de Recibos</h2>
  
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

    
    <div class="recibos__views" v-for="recibo in recibos" :key="recibo._idRecibo">
      <div class="recibos__views-card">
        <p><span>Nombre del recibo:</span> {{ recibo._nombreRecibo }}</p>
        <p><span>Dinero del recibo:</span> {{ recibo._dineroRecibo }}€</p>
        <p><span>Activo:</span> {{ recibo._activa ? 'Sí' : 'No' }}</p>
        <p><span>Fecha del recibo:</span> {{ recibo._fecRecibo }}</p>
        
        <button @click="eliminarRecibo(recibo._idRecibo)" class="recibos__btn-delete">Eliminar</button>
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

      .recibos__btn-delete {
        background-color: #e74c3c;
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 10px;

        &:hover {
          background-color: #c0392b;
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
