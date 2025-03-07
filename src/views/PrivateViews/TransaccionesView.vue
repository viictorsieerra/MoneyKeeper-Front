<script setup lang="ts">
import { useTransaccionStore } from '@/stores/Transacciones'

const store = useTransaccionStore()

console.log(store)

store.findByUser()

console.log(store)
</script>

<template>
    <main class="transacciones">
        <h2 class="transacciones__titulo">Listado de transacciones</h2>
        <div class="transacciones__views" v-for="transaccion in store.transacciones" :key="transaccion.id">
            <div class="transacciones__views-card">
                <p><span>Categoria:</span> {{ transaccion._nombreCategoria }}</p>
                <p><span>Cantidad:</span> {{ transaccion._cantidad }}€</p>
                <p><span>Tipo:</span> {{ transaccion._tipoMovimiento }}</p>
                <p><span>Descripción:</span> {{ transaccion._descripcionTransaccion }}</p>
                <p><span>Fecha:</span> {{ transaccion._fecTransaccion }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.transacciones {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2%;
    margin-bottom: 2%;

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
    }
}
</style>
