<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCuentaBancariaStore } from '@/stores/CuentaBancaria'
import { useReciboStore } from '@/stores/Recibos'
import { useTransaccionStore } from '@/stores/Transacciones'
import { useJWTStore } from '@/stores/JWT'
import { useCategoriaStore } from '@/stores/Categoria'
import TransaccionDTO from '@/stores/DTO/TransaccionDTO'
import ReciboDTO from '@/stores/DTO/ReciboDTO'

const showForm = ref(false)
const showFormTrans = ref(false)
const store = useCuentaBancariaStore()
const reciboStore = useReciboStore()
const jwtStore = useJWTStore()
const transaccionStore = useTransaccionStore()
const categoriaStore = useCategoriaStore()
store.findByUser()
categoriaStore.getCategorias()
const categorias = computed(() => categoriaStore.categorias)
const cuentaSeleccionada = ref<any>(null)
const mostrarModal = ref(false)
const mostrarFormulario = ref(false)

const nuevaCuenta = ref({
  _nombreCuenta: '',
  _dineroCuenta: 0,
  _activa: true
})

const newRecibo = ref(new ReciboDTO())
const newTransaction = ref(new TransaccionDTO())



const editarCuenta = (cuenta: any) => {
  cuentaSeleccionada.value = { ...cuenta }
  mostrarModal.value = true
}


const actualizarCuenta = async () => {
  try {
    store.UpdateCuenta(cuentaSeleccionada.value)
    mostrarModal.value = false
    store.findByUser()
    // await store.findByUser()
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
      <button @click="showForm = !showForm" class="btn-add">Añadir Recibo</button>
      <button @click="showFormTrans = !showFormTrans" class="btn-add">Añadir Transaccion</button>
    </div>



    <div v-if="showForm" class="modal">
      <div class="modal-content">
        <h3>Nuevo Recibo</h3>
        <label>
          Nombre del Recibo:
          <input type="text" id="nombreRecibo" v-model="newRecibo._nombreRecibo" required />
        </label>
        <label>
          Dinero del Recibo (€):
          <input type="number" id="dineroRecibo" v-model="newRecibo._dineroRecibo" required />
        </label>
        <label>
          Fecha del Recibo:
          <input type="date" id="fecRecibo" v-model="newRecibo._fecRecibo" required />
        </label>
        <label>
          Selecciona una Cuenta:
          <select v-model="newRecibo._idCuenta" required>
            <option v-for="cuenta in store.cuentas" :key="cuenta._idCuenta" :value="cuenta._idCuenta">
              {{ cuenta._nombreCuenta }} - {{ cuenta._dineroCuenta }}€
            </option>
          </select>
        </label>
        <label>
          Activo:
          <input type="checkbox" id="activo" v-model="newRecibo._activa" />
        </label>
        <div class="modal-buttons">
          <button @click="reciboStore.createRecibo(newRecibo)">Crear Recibo</button>
          <button @click="showForm = false">Cancelar</button>
        </div>
      </div>
    </div>

    <div v-if="showFormTrans" class="modal">
      <div class="modal-content">
        <h3>Nueva Transaccion</h3>
        <label>
          Descripcion de la Transaccion:
          <input type="text" id="descripcionTrans" v-model="newTransaction._descripcionTransaccion" required />
        </label>
        <label>
          Dinero de la Transaccion (€):
          <input type="number" id="dineroTrans" v-model="newTransaction._cantidad" required />
        </label>
        <label>
          Fecha de la Transaccion:
          <input type="date" id="fecTrans" v-model="newTransaction._fecTransaccion" required />
        </label>
        <label>
          Selecciona un tipo de movimiento:
          <select v-model="newTransaction._tipoMovimiento" required>
            <option value="I">
              Ingreso
            </option>
            <option value="G">
              Gasto
            </option>
          </select>
        </label>
        <label>
          Selecciona una Categoria:
          <select v-model="newTransaction._idCategoria" required>
            <option v-for="categoria in categorias" :key="categoria._idCategoria"
              :value="categoria._idCategoria">
              {{ categoria._nombre }}
            </option>
          </select>
        </label>
        <label>
          Selecciona una Cuenta:
          <select v-model="newTransaction._idCuenta" required>
            <option v-for="cuenta in store.cuentas" :key="cuenta._idCuenta" :value="cuenta._idCuenta">
              {{ cuenta._nombreCuenta }} - {{ cuenta._dineroCuenta }}€
            </option>
          </select>
        </label>
        <div class="modal-buttons">
          <button @click="transaccionStore.addTransaccion(newTransaction)">Crear Transaccion</button>
          <button @click="showFormTrans = false">Cancelar</button>
        </div>
      </div>
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
        <div class="cuentas__views-actions">
          <button @click="store.DeleteById(cuenta._idCuenta)">Eliminar</button>
          <button @click="editarCuenta(cuenta)">Editar</button>
        </div>
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
        background-color: #272727;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s;

        &:hover {
          background-color: #000000;
        }
      }

      button+button {
        background-color: #ff4d4d;
        // background-color: #4d79ff;
        margin-left: 10px;

        &:hover {
          background-color: #ff1a1a;
        }
      }
    }
  }

  .cuentas__add-button {

    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
      justify-content: space-evenly;
      flex-direction: row;
      margin-bottom: 20px;
    }

  }

  .btn-add {
    background-color: gray;
    // background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 20px;
    margin: 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: rgb(102, 102, 102);
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

  @media (max-width: 768px) {
    .cuentas {
      width: 100%;
      padding: 10px;
    }

    .cuentas__titulo {
      font-size: 1.5rem;
    }

    .cuentas__views {
      gap: 10px;
    }

    .cuentas__views-card {
      padding: 12px;
    }

    .modal-content {
      width: 100%;
      max-width: 400px;
    }

    .btn-add {
      font-size: 0.9rem;
      padding: 8px 16px;
    }
  }
}
</style>
