<script setup lang="ts">
import { useCuentaBancariaStore } from '@/stores/CuentaBancaria'
import { ref } from 'vue'

const store = useCuentaBancariaStore()

store.findByUser()

const eliminarCuenta = async (id: number) => {
  console.log('Eliminar cuenta con id:', id) 
  try {
    await store.DeleteById(id)
    
    await store.findByUser()
  } catch (error) {
    console.error('Error al eliminar la cuenta:', error)
  }
}
</script>

<template>
    <main class="cuentas">
        <h2 class="cuentas__titulo">Listado de Cuentas Bancarias</h2>
        <div class="cuentas__views" v-for="cuenta in store.cuentas" :key="cuenta.id">
            <div class="cuentas__views-card">
                <p><span>Id de la cuenta:</span>{{ cuenta._idCuenta }}</p>
                <p><span>Nombre de la cuenta:</span> {{ cuenta._nombreCuenta }}</p>
                <p><span>Saldo:</span> {{ cuenta._dineroCuenta }}€</p>
                <p><span>Estado:</span> {{ cuenta._activa ? 'Activa' : 'Inactiva' }}</p>
                <p><span>Fecha de creación:</span> {{ cuenta._fechaCreacion }}</p>
                <button @click="eliminarCuenta(cuenta._idCuenta)">Eliminar</button>
            </div>
            <pre>{{ cuenta }}</pre> <!-- Agrega este pre para mostrar el objeto cuenta -->
        </div>
    </main>
</template>

<style lang="scss" scoped>
.cuentas {
    width: 90%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 5%;
    margin-bottom: 2%;
    height: fit-content;

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

            button {
                background-color: #ff4d4d;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s;

                &:hover {
                    background-color: #ff1a1a;
                }
            }
        }
    }
}
</style>