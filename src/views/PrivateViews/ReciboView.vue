<script setup lang="ts">
import { useCuentaBancariaStore } from '@/stores/CuentaBancaria'
import ReciboDTO from '@/stores/DTO/ReciboDTO'
import { useReciboStore } from '@/stores/Recibos'
import { ref, computed } from 'vue'

const showForm = ref(false)

const updtRecibo = ref(new ReciboDTO())

const store = useReciboStore()

const cuentasStore = useCuentaBancariaStore()

const recibos = computed(() => store.recibos)

async function eliminarRecibo(idRecibo: number) {
  try {
    console.log(`ID a eliminar: ${idRecibo}`)
    await store.deleteRecibo(idRecibo)
    console.log('Recibo eliminado')
  } catch (error) {
    console.error('Error al eliminar el recibo:', error)
  }
}

function actualizarRecibo(recibo: ReciboDTO) {
  showForm.value = !showForm.value

  updtRecibo.value = recibo
  console.log("RECIBO A ACTUALIZAR: \t", updtRecibo)
}

store.findByUser() 
</script>

<template>
  <main class="recibos">
    <h2 class="recibos__titulo">Listado de Recibos</h2>


    <div class="recibos__views" v-for="recibo in recibos" :key="recibo._idRecibo">
      <div class="recibos__views-card">
        <p><span>Nombre del recibo:</span> {{ recibo._nombreRecibo }}</p>
        <p><span>Dinero del recibo:</span> {{ recibo._dineroRecibo }}€</p>
        <p><span>Activo:</span> {{ recibo._activa ? 'Sí' : 'No' }}</p>
        <p><span>Fecha del recibo:</span> {{ recibo._fecRecibo }}</p>

        <button @click="eliminarRecibo(recibo._idRecibo)" class="recibos__btn-delete">Eliminar</button>
        <button @click="actualizarRecibo(recibo)" class="recibos__btn-update">Actualizar</button>
      </div>
    </div>

    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>Editar Recibp</h3>
        <label>
          Nombre del recibo:
          <input v-model="updtRecibo._nombreRecibo" required type="text" />
        </label>
        <label>
          Dinero del recibo:
          <input v-model="updtRecibo._dineroRecibo" required type="number" />
        </label>
        <label>
          Fecha Recibo:
          <input v-model="updtRecibo._fecRecibo" class="form-campo-input" required type="date" />
        </label>
        <label>
          Selecciona una Cuenta:
          <select v-model="updtRecibo._idCuenta" required>
            <option v-for="cuenta in cuentasStore.cuentas" :key="cuenta._idCuenta" :value="cuenta._idCuenta">
              {{ cuenta._nombreCuenta }} - {{ cuenta._dineroCuenta }}€
            </option>
          </select>
        </label>
        <label>
          Activo:
          <input type="checkbox" id="activo" required v-model="updtRecibo._activa" />
        </label>
        <div class="modal-buttons">
          <button @click="store.updateRecibo(updtRecibo); showForm = false">Guardar</button>
          <button @click="showForm = false">Cancelar</button>
        </div>
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

      .recibos__btn-delete,
      .recibos__btn-update {
        background-color: #e74c3c;
        color: white;
        margin: 10px;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  &-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 350px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
      margin-bottom: 10px;
      text-align: center;
    }

    label {
      display: flex;
      flex-direction: column;
      font-weight: bold;
      color: #333;

      input,
      select {
        margin-top: 5px;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    .modal-buttons {
      display: flex;
      justify-content: space-between;

      button {
        flex: 1;
        margin: 0 5px;
        padding: 10px;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        transition: background 0.3s;

        &:first-child {
          background-color: #4caf50;

          &:hover {
            background-color: #45a049;
          }
        }

        &:last-child {
          background-color: #f44336;

          &:hover {
            background-color: #da190b;
          }
        }
      }
    }
  }
}
</style>
