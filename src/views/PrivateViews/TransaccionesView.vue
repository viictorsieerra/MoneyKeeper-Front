<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTransaccionStore } from '@/stores/Transacciones'
import filtradoDTO from '@/stores/DTO/FiltradoDTO';
import TransaccionDTO from '@/stores/DTO/TransaccionDTO';
import { useCategoriaStore } from '@/stores/Categoria';
import { fa } from 'vuetify/locale';
const store = useTransaccionStore()
const categoriaStore = useCategoriaStore()

const transacciones = computed(() => store.transacciones)
const categorias = computed(() => categoriaStore.categorias)
const mostrarModal = ref(false)
const filtradoTrans = ref(new filtradoDTO())
filtradoTrans.value._idCategoria = 0
const updtTransaccion = ref(new TransaccionDTO())
console.log(store)

categoriaStore.getCategorias()
store.findByUser()
const isLoading = ref(false);
const isFiltrado = ref(false)
function filtrar(filtrado: filtradoDTO) {
    console.log("SE VA A FILTRAR: ", filtrado)
    isLoading.value = true;
    if (filtrado._fechaFin == undefined && filtrado._fechaInicio === undefined && (filtrado._idCategoria === undefined || filtrado._idCategoria === 0)) {
        store.findByUser()
        isFiltrado.value = false
    }
    else {
        store.getTransaccionesFilters(filtrado)
        isFiltrado.value = true
    }
    setTimeout(() => {
        isLoading.value = false;
    }, 1000);
}


console.log(store)

function actualizarTransaccion(transaccion: TransaccionDTO) {
    categoriaStore.getCategorias()
    updtTransaccion.value = transaccion
    mostrarModal.value = !mostrarModal.value
    console.log("TRANSACCION A ACTUALIZAR", transaccion)
}
</script>

<template>
    <main class="transacciones">
        <h2 class="transacciones__titulo">Listado de transacciones</h2>
        <div class="transacciones__filtro">
            <input class="transacciones__filtro-fecha" type="date" v-model="filtradoTrans._fechaInicio" />
            <input class="transacciones__filtro-fecha" type="date" v-model="filtradoTrans._fechaFin" />
            <div class="transacciones__filtro-buscar">
                <label>
                    <select v-model="filtradoTrans._idCategoria" class="transacciones__filtro-categoria" required>
                        <option v-for="categoria in categorias" :key="categoria._idCategoria"
                            :value="categoria._idCategoria">
                            {{ categoria._nombre }}
                        </option>
                        <option :value="0">
                            Todas
                        </option>
                    </select>
                </label>

                <div v-if="isFiltrado">
                    <svg @click="filtrar(filtradoTrans)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                        height="30px" width="30px" class="transacciones__filtro-lupa" :class="{ 'loading': isLoading }">
                        <circle cx="40" cy="40" r="25" stroke="red" stroke-width="5" fill="none" />
                        <line x1="58" y1="58" x2="80" y2="80" stroke="red" stroke-width="7" stroke-linecap="round" />
                    </svg>
                </div>
                <div v-else>
                    <svg @click="filtrar(filtradoTrans)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
                    height="30px" width="30px" class="transacciones__filtro-lupa" :class="{ 'loading': isLoading }">
                    <circle cx="40" cy="40" r="25" stroke="black" stroke-width="5" fill="none" />
                    <line x1="58" y1="58" x2="80" y2="80" stroke="black" stroke-width="7" stroke-linecap="round" />
                </svg>
                </div>
            </div>
        </div>
        <div class="transacciones__views">
            <div class="transacciones__views-card" v-for="transaccion in transacciones"
                :key="transaccion._idTransaccion">
                <p><span>Descripción:</span> {{ transaccion._descripcionTransaccion }}</p>
                <p><span>Categoria:</span> {{ transaccion._nombreCategoria }}</p>
                <p><span>Cantidad:</span> {{ transaccion._cantidad }}€</p>
                <p><span>Tipo:</span> {{ transaccion._tipoMovimiento }}</p>
                <p><span>Fecha:</span> {{ transaccion._fecTransaccion }}</p>
                <button class="transacciones__views-btn-delete"
                    @click="store.deleteTransaccion(transaccion._idTransaccion)">Eliminar</button>
                <button class="transacciones__views-btn-update"
                    @click="actualizarTransaccion(transaccion)">Editar</button>
            </div>
        </div>
        <div v-if="mostrarModal" class="modal">
            <div class="modal-content">
                <h3>Editar Transaccion</h3>
                <label>
                    Descripcion de la transaccion:
                    <input v-model="updtTransaccion._descripcionTransaccion" type="text" />
                </label>
                <label>
                    Cantidad:
                    <input v-model="updtTransaccion._cantidad" type="number" />
                </label>
                <label>
                    Tipo movimiento:
                    <select v-model="updtTransaccion._tipoMovimiento">
                        <option value="I">Ingreso</option>
                        <option value="G">Gasto</option>
                    </select>
                </label>
                <label>
                    Selecciona una Categoria:
                    <select v-model="updtTransaccion._idCategoria" required>
                        <option v-for="categoria in categorias" :key="categoria._idCategoria"
                            :value="categoria._idCategoria">
                            {{ categoria._nombre }} - {{ categoria._descripcion }}
                        </option>
                    </select>
                </label>
                <label>
                    Fecha de la transaccion:
                    <input type="date" v-model="updtTransaccion._fecTransaccion" class="form-campo-input" required />
                </label>

                <div class="modal-buttons">
                    <button @click="store.updateTransaccion(updtTransaccion); mostrarModal = false">Guardar</button>
                    <button @click="mostrarModal = false">Cancelar</button>
                </div>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.loading {
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
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

    &__filtro {
        display: grid;
        justify-content: center;

        &-buscar {
            display: flex;
        }

        input,
        select {
            background-color: #b6b6b6;
            padding: 5px;
            width: 200px;
            border-radius: 10px;
            // color: white;
            // fill: white;
        }

        &-fecha,
        &-categoria,
        &-lupa {
            margin: 15px;
            cursor: pointer;
        }

        &-fecha {
            width: 200px;
        }

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

    @media (min-width: 768px) {
        .transacciones {
            width: 20%;
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
