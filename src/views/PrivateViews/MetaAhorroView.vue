<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useMetaAhorroStore } from '@/stores/MetaAhorro';
import MetaAhorroDTO from '@/stores/DTO/MetaAhorroDTO';
import MetaProgreso from '@/components/metaProgreso.vue';

const store = useMetaAhorroStore()
const isLoading = ref(true)
const showForm = ref(false)
const showEditForm = ref(false)
const metas = computed(() => store.metas)
const newMeta = ref(new MetaAhorroDTO())

const metaEditada = ref(new MetaAhorroDTO())
store.findByUser()

function actualizarMeta(meta : MetaAhorroDTO)
{
  metaEditada.value = meta
  showEditForm.value = !showEditForm.value
}
</script>

<template>
  <main class="metas">
    <h2 class="metas__titulo">Listado de Metas de Ahorro</h2>

    <button @click="showForm = !showForm" v-if="!showForm" class="btn-add">Añadir Meta de Ahorro</button>


    <div v-if="showForm" class="metas__form">
      <button @click="showForm = false" class="btn-close">×</button>
      <h3>Crear Nueva Meta de Ahorro</h3>
      <form>
        <div>
          <label for="nombremeta">Nombre de la Meta:</label>
          <input type="text" id="nombremeta" v-model="newMeta._nombreMeta" required />
        </div>
        <div>
          <label for="descripcionMeta">Descripción:</label>
          <input type="text" id="descripcionMeta" v-model="newMeta._descripcionMeta" required />
        </div>
        <div>
          <label for="dineroObjetivo">Dinero Objetivo (€):</label>
          <input type="number" id="dineroObjetivo" v-model="newMeta._dineroObjetivo" required />
        </div>
        <div>
          <label for="dineroActual">Dinero Actual (€):</label>
          <input type="number" id="dineroActual" v-model="newMeta._dineroActual" required />
        </div>
        <div>
          <label for="activoMeta">Estado:</label>
          <input type="checkbox" id="activoMeta" v-model="newMeta._activoMeta" />
        </div>
        <div>
          <label for="fechaObjetivoMeta">Fecha Objetivo:</label>
          <input type="date" id="fechaObjetivoMeta" v-model="newMeta._fechaObjetivoMeta" required />
        </div>
        <button type="submit" @click="store.addMetaAhorro(newMeta); showForm = false">Crear Meta</button>
      </form>
    </div>

    <div class="metas__views" v-for="meta in metas" :key="meta._idMeta">
      <div class="metas__views-card">
        <p><span>Nombre de la meta:</span> {{ meta._nombreMeta }}</p>
        <p><span>Descripción:</span> {{ meta._descripcionMeta }}</p>
        <p><span>Dinero objetivo:</span> {{ meta._dineroObjetivo }}€</p>
        <p><span>Dinero actual:</span> {{ meta._dineroActual }}€</p>
        <p><span>Estado:</span> {{ meta._activoMeta ? 'Activa' : 'Inactiva' }}</p>
        <p><span>Fecha de creación:</span> {{ meta._fechaCreacionMeta }}</p>
        <p><span>Fecha objetivo:</span> {{ meta._fechaObjetivoMeta }}</p>
        <MetaProgreso 
          :actual="meta._dineroActual" 
          :objetivo="meta._dineroObjetivo" 
        />
        <button @click="actualizarMeta(meta)">Editar</button>
        <button @click="store.deleteMetaAhorro(meta._idMeta)">Eliminar</button>
      </div>
    </div>

    <div v-if="showEditForm" class="modal">
          <h3>Editar Meta de Ahorro</h3>
      <div class="modal-content">
        <label for="nombremeta">Nombre de la Meta:
          <input type="text" id="nombremeta" v-model="metaEditada._nombreMeta" required />
        </label>
        <label for="descripcionMeta">Descripción:
          <input type="text" id="descripcionMeta" v-model="metaEditada._descripcionMeta" required />
        </label>
        <label for="dineroObjetivo">Dinero Objetivo (€):
          <input type="number" id="dineroObjetivo" v-model="metaEditada._dineroObjetivo" required />
        </label>
        <label for="dineroActual">Dinero Actual (€):
          <input type="number" id="dineroActual" v-model="metaEditada._dineroActual" required />
        </label>
        <label for="activoMeta">Estado:
          <input type="checkbox" id="activoMeta" v-model="metaEditada._activoMeta" />
        </label>
        <label for="fechaObjetivoMeta">Fecha Objetivo:
          <input type="date" id="fechaObjetivoMeta" v-model="metaEditada._fechaObjetivoMeta" required />
        </label>
        <button @click="store.UpdateMetaAhorro(metaEditada); showEditForm = false">Actualizar Meta</button>
        <button @click="showEditForm = false">Cancelar</button>
      </div>
    </div>
  </main>
</template>



<style lang="scss" scoped>
.metas {
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

      button {
        padding: 10px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          background-color: #c82333;
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

  .metas__views-card button {
    padding: 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 1%
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
