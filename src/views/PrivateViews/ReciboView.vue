<script setup lang="ts">
import { useReciboStore } from '@/stores/Recibos'

const store = useReciboStore()

store.findByUser()

console.log(store)

</script>

<template>
    <main class="Recibos">
        Listado de Recibos Ahorro
        <div class="Recibos__views" v-for="meta in store.recibos">
            <div class="Recibos__views-card">
                Dinero del recibo : {{ meta._dineroRecibo }}<br>
                activo: {{meta._activa }}<br>
                fecha del recibo : {{ meta._fecRecibo }}<br>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.Recibos__views {
    display: grid;

    &-card {
        padding: 10px;
        margin: 10px;
        border: solid black 1px;
        border-radius: 5px;
    }
}
</style>