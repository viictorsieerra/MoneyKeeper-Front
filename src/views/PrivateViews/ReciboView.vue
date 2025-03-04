<script setup lang="ts">
import { useReciboStore } from '@/stores/Recibos'

const store = useReciboStore()

store.findByUser()

console.log(store)
</script>

<template>
    <main class="recibos">
        <h2 class="recibos__titulo">Listado de Recibos</h2>
        <div class="recibos__views" v-for="meta in store.recibos" :key="meta.id">
            <div class="recibos__views-card">
                <p><span>Dinero del recibo:</span> {{ meta._dineroRecibo }}€</p>
                <p><span>Activo:</span> {{ meta._activa ? 'Sí' : 'No' }}</p>
                <p><span>Fecha del recibo:</span> {{ meta._fecRecibo }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.recibos {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

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
