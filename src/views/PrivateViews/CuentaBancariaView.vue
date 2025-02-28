<script setup lang="ts">
import { useCuentaBancariaStore } from '@/stores/CuentaBancaria'

const store = useCuentaBancariaStore()

store.findByUser()

console.log(store)

</script>

<template>
    <main class="CuentasBancarias">
        Listado de cuentas
        <div class="cuentas__views" v-for="cuenta in store.cuentas">
            <div class="cuentas__views-card">
                dineroCuenta : {{ cuenta._dineroCuenta }}<br>
                activa: {{cuenta._activa }}<br>
                Fecha de la creacion : {{ cuenta._fechaCreacion }}<br>
                nombreCuenta : {{ cuenta._nombreCuenta }}<br>
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