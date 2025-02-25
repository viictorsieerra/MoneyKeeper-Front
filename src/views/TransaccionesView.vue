<script setup lang="ts">
import { useTransaccionStore } from '@/stores/Transacciones'

const store = useTransaccionStore()

store.findByUser()

console.log(store)

</script>

<template>
    <main class="transacciones">
        Listado de transacciones
        <div class="transacciones__views" v-for="transaccion in store.transacciones">
            <div class="transacciones__views-card">
                Categoria : {{ transaccion._nombreCategoria }} <br>
                Cantidad de la transaccion : {{ transaccion._cantidad }}€<br>
                Tipo de movimiento : {{ transaccion._tipoMovimiento }}<br>
                Descripción de la transaccion : {{ transaccion._descripcionTransaccion }}<br>
                Fecha de la transaccion : {{ transaccion._fecTransaccion }}<br>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.transacciones__views {
    display: grid;

    &-card {
        padding: 10px;
        margin: 10px;
        border: solid black 1px;
        border-radius: 5px;
    }
}
</style>