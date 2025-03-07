<script setup lang="ts">
import { useCuentaBancariaStore } from '@/stores/CuentaBancaria'

const store = useCuentaBancariaStore()

store.findByUser()

console.log(store)
</script>

<template>
    <main class="cuentas">
        <h2 class="cuentas__titulo">Listado de Cuentas Bancarias</h2>
        <div class="cuentas__views" v-for="cuenta in store.cuentas" :key="cuenta.id">
            <div class="cuentas__views-card">
                <p><span>Nombre de la cuenta:</span> {{ cuenta._nombreCuenta }}</p>
                <p><span>Saldo:</span> {{ cuenta._dineroCuenta }}€</p>
                <p><span>Estado:</span> {{ cuenta._activa ? 'Activa' : 'Inactiva' }}</p>
                <p><span>Fecha de creación:</span> {{ cuenta._fechaCreacion }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.cuentas {
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
