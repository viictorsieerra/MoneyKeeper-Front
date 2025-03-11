<script setup lang="ts">
import { ref } from 'vue'
import { useCuentaBancariaStore } from '@/stores/CuentaBancaria'

const store = useCuentaBancariaStore()
store.findByUser()

const cuentaSeleccionada = ref<any>(null)
const mostrarModal = ref(false)
const mostrarFormulario = ref(false)

const nuevaCuenta = ref({
  _nombreCuenta: '',
  _dineroCuenta: 0,
  _activa: true
})


const eliminarCuenta = async (id: number) => {
  console.log('Eliminar cuenta con id:', id)
  try {
    await store.DeleteById(id)
    await store.findByUser()
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error)
  }
}


const editarCuenta = (cuenta) => {
  cuentaSeleccionada.value = { ...cuenta } 
  mostrarModal.value = true
}


const actualizarCuenta = async () => {
  try {
    await store.UpdateCuenta(cuentaSeleccionada.value)
    mostrarModal.value = false
    await store.findByUser()
  } catch (error) {
    console.error('Error al actualizar la cuenta:', error)
  }
}


const crearCuenta = async () => {
  try {
    await store.crearCuenta(nuevaCuenta.value)
    mostrarFormulario.value = false
    nuevaCuenta.value = { _nombreCuenta: '', _dineroCuenta: 0, _activa: true } 
    await store.findByUser()
  } catch (error) {
    console.error('Error al crear la cuenta:', error)
  }
}
</script>

<template>
  <main class="cuentas">
    <h2 class="cuentas__titulo">Listado de Cuentas Bancarias</h2>

    <div class="cuentas__add-button">
  <button @click="mostrarFormulario = true" class="btn-add">Añadir Cuenta</button>
</div>

    <div v-if="mostrarFormulario" class="modal">
      <div class="modal-content">
        <h3>Añadir Cuenta</h3>
        <label>
          Nombre de la cuenta:
          <input v-model="nuevaCuenta._nombreCuenta" type="text" required />
        </label>
        <label>
          Saldo:
          <input v-model="nuevaCuenta._dineroCuenta" type="number" required />
        </label>
        <label>
          Estado:
          <select v-model="nuevaCuenta._activa">
            <option :value="true">Activa</option>
            <option :value="false">Inactiva</option>
          </select>
        </label>
        <div class="modal-buttons">
          <button @click="crearCuenta">Crear Cuenta</button>
          <button @click="mostrarFormulario = false">Cancelar</button>
        </div>
      </div>
    </div>

    <div class="cuentas__views" v-for="cuenta in store.cuentas" :key="cuenta._idCuenta">
      <div class="cuentas__views-card">
        <p><span>Id de la cuenta:</span> {{ cuenta._idCuenta }}</p>
        <p><span>Nombre de la cuenta:</span> {{ cuenta._nombreCuenta }}</p>
        <p><span>Saldo:</span> {{ cuenta._dineroCuenta }}€</p>
        <p><span>Estado:</span> {{ cuenta._activa ? 'Activa' : 'Inactiva' }}</p>
        <p><span>Fecha de creación:</span> {{ cuenta._fechaCreacion }}</p>
        <button @click="eliminarCuenta(cuenta._idCuenta)">Eliminar</button>
        <button @click="editarCuenta(cuenta)">Editar</button>
      </div>
    </div>


    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h3>Editar Cuenta</h3>
        <label>
          Nombre de la cuenta:
          <input v-model="cuentaSeleccionada._nombreCuenta" type="text" />
        </label>
        <label>
          Saldo:
          <input v-model="cuentaSeleccionada._dineroCuenta" type="number" />
        </label>
        <label>
          Estado:
          <select v-model="cuentaSeleccionada._activa">
            <option :value="true">Activa</option>
            <option :value="false">Inactiva</option>
          </select>
        </label>
        <div class="modal-buttons">
          <button @click="actualizarCuenta">Guardar</button>
          <button @click="mostrarModal = false">Cancelar</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.cuentas {
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

      button {
        background-color: #ff4d4d;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #ff1a1a;
        }
      }

      button + button {
        background-color: #4d79ff;
        margin-left: 10px;

        &:hover {
          background-color: #1a53ff;
        }
      }
    }
  }
  .cuentas__add-button {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; 
}
  .btn-add {
  background-color: #4caf50; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #45a049; 
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
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

        input, select {
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
}
</style>
