<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTransaccionStore } from '@/stores/Transacciones'
import filtradoDTO from '@/stores/DTO/FiltradoDTO';
const store = useTransaccionStore()

const transacciones = computed(() => store.transacciones)

const fechasFilter = ref(new filtradoDTO())

console.log(store)

store.findByUser()

function filtrar(filtrado: filtradoDTO) {
    store.getTransaccionesFilters(filtrado)
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
                <button class="transacciones__views-btn-delete" @click ="store.deleteTransaccion(transaccion._idTransaccion)">Eliminar</button>
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
        }
        &-btn-delete{
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
}
</style>
