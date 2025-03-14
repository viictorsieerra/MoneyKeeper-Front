<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTransaccionStore } from '@/stores/Transacciones'
import filtradoDTO from '@/stores/DTO/FiltradoDTO';
const store = useTransaccionStore()

const transacciones = computed(() => store.transacciones)
const fechasFilter = ref(new filtradoDTO())
const isModalOpen = ref(false)  // Para manejar el estado del modal
const transaccionSeleccionada = ref(null)  // Para manejar la transacción seleccionada para edición

console.log(store)

store.findByUser()

function filtrar(filtrado: filtradoDTO) {
    store.getTransaccionesFilters(filtrado)
}

function editarTransaccion(transaccion: any) {
    console.log('Transacción seleccionada para editar:', transaccion);  // Ver la transacción antes de editarla
    transaccionSeleccionada.value = { ...transaccion };  // Clonamos los datos para editar
    isModalOpen.value = true;  // Abrir el modal
}

function guardarEdicion() {
    if (transaccionSeleccionada.value) {
        console.log('Guardando cambios para transacción:', transaccionSeleccionada.value);  // Ver los cambios antes de guardar
        store.updateTransaccion(transaccionSeleccionada.value);  // Actualiza la transacción en el store
        isModalOpen.value = false;  // Cerrar el modal
    }
}

console.log(store)
</script>

<template>
    <main class="transacciones">
        <h2 class="transacciones__titulo">Listado de transacciones</h2>
        <div class="transacciones__fechas">
            <input type="date" v-model="fechasFilter._fechaInicio" />
            <input type="date" v-model="fechasFilter._fechaFin" />
            <svg @click="filtrar(fechasFilter)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" height="30px"
                width="30px">
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
                <button class="transacciones__views-btn-edit" @click="editarTransaccion(transaccion)">Editar</button>
                <button class="transacciones__views-btn-delete" @click="store.deleteTransaccion(transaccion._idTransaccion)">Eliminar</button>
            </div>
        </div>

        <!-- Modal para editar -->
        <div v-if="isModalOpen" class="modal">
            <div class="modal__content">
                <h3>Editar Transacción</h3>
                <form @submit.prevent="guardarEdicion">
                    <label for="descripcion">Descripción</label>
                    <input type="text" id="descripcion" v-model="transaccionSeleccionada._descripcionTransaccion" required />

                    <label for="categoria">Categoría</label>
                    <input type="text" id="categoria" v-model="transaccionSeleccionada._nombreCategoria" required />

                    <label for="cantidad">Cantidad (€)</label>
                    <input type="number" id="cantidad" v-model="transaccionSeleccionada._cantidad" required />

                    <label for="tipo">Tipo</label>
                    <input type="text" id="tipo" v-model="transaccionSeleccionada._tipoMovimiento" required />

                    <label for="fecha">Fecha</label>
                    <input type="date" id="fecha" v-model="transaccionSeleccionada._fecTransaccion" required />

                    <button type="submit">Guardar Cambios</button>
                    <button type="button" @click="isModalOpen = false">Cancelar</button>
                </form>
            </div>
        </div>
    </main>
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

            .transacciones__views-btn-edit {
                background-color: #4CAF50;
                padding: 8px;
                border-radius: 5px;
                color: white;
                margin-right: 10px;
                cursor: pointer;
                border: none;
                transition: background-color 0.3s ease;
            }

            .transacciones__views-btn-edit:hover {
                background-color: #45a049;
            }
        }

        &-btn-delete {
            padding: 10px;
            background-color: red;
            border-radius: 10px;
        }
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;

        .modal__content {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            width: 400px;

            h3 {
                text-align: center;
                margin-bottom: 20px;
            }

            form {
                display: flex;
                flex-direction: column;

                label {
                    margin-top: 10px;
                    font-weight: bold;
                }

                input {
                    padding: 8px;
                    margin-top: 5px;
                    border-radius: 5px;
                    border: 1px solid #ddd;
                    font-size: 1rem;
                }

                button {
                    margin-top: 20px;
                    padding: 10px;
                    background-color: #007BFF;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                }

                button[type="button"] {
                    background-color: #ccc;
                }
            }
        }
    }
}

@media (min-width: 768px) {
    .transacciones {
        width: 20%;
    }
}
</style>