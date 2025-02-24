<script setup lang="ts">
import { useTransaccionStore } from '@/stores/Transacciones'

const store = useTransaccionStore()

store.findByUser() 

console.log(store)

</script>

<template>
    Listado de transacciones
    <div v-for="transaccion in store.transacciones">
        {{transaccion }}
    </div>
</template>