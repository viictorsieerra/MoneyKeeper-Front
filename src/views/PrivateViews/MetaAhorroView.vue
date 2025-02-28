<script setup lang="ts">
import { useMetaAhorroStore } from '@/stores/MetaAhorro'

const store = useMetaAhorroStore()

store.findByUser()

console.log(store)

</script>

<template>
    <main class="Metas">
        Listado de Metas Ahorro
        <div class="Metas__views" v-for="meta in store.metas">
            <div class="Metas__views-card">
                nombre meta : {{ meta._nombremeta }}<br>
                descripcion: {{meta._descripcionMeta }}<br>
                dinero objetivo : {{ meta.dineroObjetivo }}<br>
                dinero actual : {{ meta._dineroActual }}<br>
                Fecha de la creacion : {{ meta._activoMeta }}<br>
                fecha de creacion : {{ meta._fechaCreacionMeta }}<br>
                fecha de objetivo : {{ meta._fechaObjetivoMeta }}<br>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.cuentas__views {
    display: grid;

    &-card {
        padding: 10px;
        margin: 10px;
        border: solid black 1px;
        border-radius: 5px;
    }
}
</style>