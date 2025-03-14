<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransaccionStore } from '@/stores/Transacciones'
import filtradoDTO from '@/stores/DTO/FiltradoDTO';
import TransaccionDTO from '@/stores/DTO/TransaccionDTO';

const store = useTransaccionStore()
const transacciones = computed(() => store.transacciones)
const fechasFilter = ref(new filtradoDTO())

const showModal = ref(false)
const transaccionEdit = ref(new TransaccionDTO())

store.findByUser()

function filtrar(filtrado: filtradoDTO) {
    store.getTransaccionesFilters(filtrado)
}

function openEditModal(transaccion: any) {
    // Aquí asignamos los valores de la transacción a transaccionEdit
    transaccionEdit.value = { ...transaccion }
    showModal.value = true // Establecemos showModal en true para mostrar el modal
}

function updateTransaccion() {
    store.updateTransaccion(transaccionEdit.value)
    showModal.value = false // Cerramos el modal después de actualizar la transacción
}
</script>

<template>
    <main class="transacciones">
        <h2 class="transacciones__titulo">Listado de transacciones</h2>
        <div class="transacciones__fechas">
            <input type="date" v-model="fechasFilter._fechaInicio" />
            <input type="date" v-model="fechasFilter._fechaFin" />
            <svg @click="filtrar(fechasFilter)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="30px" width="30px">
                <circle cx="40" cy="40" r="25" stroke="black" stroke-width="3" fill="none" />
                <line x1="58" y1="58" x2="80" y2="80" stroke="black" stroke-width="5" stroke-linecap="round" />
            </svg>
        </div>
        <div class="transacciones__views">
            <div class="transacciones__views-card" v-for="transaccion in transacciones" :key="transaccion._idTransaccion">
                <p><span>Descripción:</span> {{ transaccion._descripcionTransaccion }}</p>
                <p><span>Categoria:</span> {{ transaccion._nombreCategoria }}</p>
                <p><span>Cantidad:</span> {{ transaccion._cantidad }}€</p>
                <p><span>Tipo:</span> {{ transaccion._tipoMovimiento }}</p>
                <p><span>Fecha:</span> {{ transaccion._fecTransaccion }}</p>
                <button class="transacciones__views-btn-delete" @click="store.deleteTransaccion(transaccion._idTransaccion)">Eliminar</button>
                <button class="transacciones__views-btn-edit" @click="openEditModal(transaccion)">Editar</button>
            </div>
        </div>
    </main>

    <!-- Modal de Edición -->
    <div v-if="showModal" class="modal">
        <div class="modal__content">
            <h3>Editar Transacción</h3>
            <label>Descripción:</label>
            <input type="text" v-model="transaccionEdit._descripcionTransaccion" />
            <label>Cantidad:</label>
            <input type="number" v-model="transaccionEdit._cantidad" />
            <label>Fecha:</label>
            <input type="date" v-model="transaccionEdit._fecTransaccion" />
            <div class="modal__actions">
                <button @click="updateTransaccion">Guardar</button>
                <button @click="showModal = false">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.transacciones__fechas--input {
    .v-picker-title {
        display: none;
    }
}

.v-picker-title {
    display: none;
}

.transacciones {
    width: 85%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 5%;
    margin-bottom: 2%;
    margin-left: 7%;
    height: fit-content;

    &__fechas {
        display: grid;
        justify-content: center;

        @media (min-width: 992px) {
            display: flex;
            justify-content: space-between;
        }

        &--input {
            margin: 15px;
        }
    }

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

        &-btn-delete {
            padding: 10px;
            background-color: red;
            border-radius: 10px;
        }
    }

    @media (min-width: 768px) {
        .transacciones {
            width: 20%;
        }
    }

    .transacciones__views-btn-edit {
        padding: 10px;
        background-color: blue;
        color: white;
        border-radius: 10px;
        margin-left: 10px;
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
            background-color: darkblue;
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
        align-items: center;
        justify-content: center;
        z-index: 1000;

        &__content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            width: 90%;
            max-width: 500px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
        }

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;

            h3 {
                margin: 0;
                color: #333;
            }

            button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
            }
        }

        &__form {
            display: flex;
            flex-direction: column;
            gap: 10px;

            label {
                font-weight: bold;
                color: #222;
            }

            input {
                padding: 8px;
                border-radius: 5px;
                border: 1px solid #ccc;
                font-size: 1rem;
            }

            &-btn {
                padding: 10px;
                background-color: green;
                color: white;
                border-radius: 10px;
                cursor: pointer;
                transition: background 0.3s;

                &:hover {
                    background-color: darkgreen;
                }
            }
        }
    }
}
</style>
