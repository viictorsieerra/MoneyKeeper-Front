<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { usePresupuestoStore } from '@/stores/Presupuesto';
import { useCategoriaStore } from '@/stores/Categoria'
import MetaAhorroDTO from '@/stores/DTO/MetaAhorroDTO';
import MetaProgreso from '@/components/metaProgreso.vue';
import PresupuestoDTO from '@/stores/DTO/PresupuestoDTO'
const store = usePresupuestoStore()
const categoriaStore = useCategoriaStore()
const isLoading = ref(true)
const showForm = ref(false)
const showEditForm = ref(false)
const presupuestos = computed(() => store.presupuestos)
categoriaStore.getCategorias()
const categorias = computed(() => categoriaStore.categorias)
const newPresupuesto = ref(new PresupuestoDTO())

const editPresupuesto = ref(new PresupuestoDTO())
store.findByUser()

function actualizarPresupuesto(presupuesto: PresupuestoDTO) {
  editPresupuesto.value = presupuesto
  showEditForm.value = !showEditForm.value
  store.findByUser()
}
</script>

<template>
  <main class="presupuestos">
    <h2 class="presupuestos__titulo">Listado de Presupuestos</h2>

    <div class="presupuestos__boton"><button @click="showForm = !showForm" v-if="!showForm" class="btn-add">Añadir
        Presupuesto</button></div>


    <div v-if="showForm" class="presupuestos__form">
      <button @click="showForm = false" class="btn-close">×</button>
      <h3>Crear NuevoPresupuesto</h3>
      <form @submit.prevent="store.addPresupuesto(newPresupuesto); showForm = false">
        
          <label for="nombrePresupuesto">Nombre del Presupuesto:</label>
          <input type="text" id="nombrePresupuesto" v-model="newPresupuesto._nombre" required />        
          <label for="limitePresupuesto">Límite (€):</label>
          <input type="number" id="limitePresupuesto" v-model="newPresupuesto._limite" required />        
          <label for="dineroActualPresupuesto">Dinero Actual (€):</label>
          <input type="number" id="dineroActualPresupuesto" v-model="newPresupuesto._dineroActual" required />        
          <label for="activoPresupuesto">Estado:</label>
          <input type="checkbox" id="activoPresupuesto" v-model="newPresupuesto._activo" />        
          <label>
            Selecciona una Categoria:
            <select v-model="newPresupuesto._idCategoria" required>
              <option v-for="categoria in categorias" :key="categoria._idCategoria" :value="categoria._idCategoria">
                {{ categoria._nombre }}
              </option>
            </select>
          </label>
        <div>
          <label for="fechaCreacionPresupuesto">Fecha de Creación:</label>
          <input type="date" id="fechaCreacionPresupuesto" v-model="newPresupuesto._fecCreacion" required />
        </div>
        <button type="submit">Crear Presupuesto</button>
      </form>

    </div>

    <div class="presupuestos__views" v-for="presupuesto in presupuestos" :key="presupuesto._idPresupuesto">
      <div class="presupuestos__views-card">
        <p><span>Nombre del presupuesto:</span> {{ presupuesto._nombrePresupuesto }}</p>
        <p><span>Categoria del presupuesto:</span> {{ presupuesto._nombreCategoria }}</p>
        <p><span>Límite:</span> {{ presupuesto._limite }}€</p>
        <p><span>Dinero actual:</span> {{ presupuesto._dineroActual }}€</p>
        <p><span>Estado:</span> {{ presupuesto._activo ? 'Activo' : 'Inactivo' }}</p>
        <p><span>Fecha de creación:</span> {{ presupuesto._fecCreacion }}</p>
        <button class="presupuestos__views-btn-delete" @click="store.deletePresupuesto(presupuesto._idPresupuesto)">Eliminar</button>
        <button class="presupuestos__views-btn-update" @click="actualizarPresupuesto(presupuesto)">Editar</button>
      </div>
    </div>

    <div v-if="showEditForm" class="modal">
      <div class="modal-content">
        <div>
          <label for="nombrePresupuesto">Nombre del Presupuesto:</label>
          <input type="text" id="nombrePresupuesto" v-model="editPresupuesto._nombre" required />
        </div>
        <div>
          <label for="limitePresupuesto">Límite (€):</label>
          <input type="number" id="limitePresupuesto" v-model="editPresupuesto._limite" required />
        </div>
        <div>
          <label for="dineroActualPresupuesto">Dinero Actual (€):</label>
          <input type="number" id="dineroActualPresupuesto" v-model="editPresupuesto._dineroActual" required />
        </div>
        <div>
          <label for="activoPresupuesto">Estado:</label>
          <input type="checkbox" id="activoPresupuesto" v-model="editPresupuesto._activo" />
        </div>
        <div>
          <label>
            Selecciona una Categoria:
            <select v-model="editPresupuesto._idCategoria" required>
              <option v-for="categoria in categorias" :key="categoria._idCategoria" :value="categoria._idCategoria">
                {{ categoria._nombre }}
              </option>
            </select>
          </label>
        </div>
        <div class="modal-buttons">
          <button @click="store.updatePresupuesto(editPresupuesto); showEditForm = false">Guardar</button>
          <button @click="showEditForm = false">Cancelar</button>
        </div>
      </div>
    </div>
  </main>
</template>



<style lang="scss" scoped>
.presupuestos {
  width: 90%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-top: 5%;
  height: fit-content;

  &__titulo {
    text-align: center;
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 20px;
    color: #333;
  }

  &__boton {
    display: flex;
    justify-content: center;
  }

  .loading-message {
    text-align: center;
    font-size: 1.2rem;
    color: #007bff;
    font-weight: bold;
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

    &-btn-delete,
    &-btn-update {
      color: white;
      padding: 10px 15px;
      margin: 10px;
      border-radius: 10px;
    }

    &-btn-delete {
      background-color: #272727;

      &:hover {
        background-color: #000000;
      }
    }

    &-btn-update {
      background-color: #ff4d4d;

      &:hover {
        background-color: #ff1a1a;
      }
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

  &__form {
    margin-top: 20px;
    padding: 20px;
    background-color: #e9ecef;
    border-radius: 8px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .btn-add {
    padding: 10px 20px;
    background-color: gray;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;


    &:hover {
      background-color: rgb(102, 102, 102);
      transform: scale(1.05);
    }
  }



  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.5rem;
    color: #333;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
      color: #ff4d4d;
    }
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
}
</style>
