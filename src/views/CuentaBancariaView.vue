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
                idCuenta : {{ cuenta.idCuenta }} <br>
                idUsuario: {{ cuenta.idUsuario }}€<br>
                dineroCuenta : {{ cuenta.dineroCuenta }}<br>
                activa: {{cuenta.activa }}<br>
                Fecha de la creacion : {{ cuenta.fechaCreacion }}<br>
                nombreCuenta : {{ cuenta.nombreCuenta }}<br>
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