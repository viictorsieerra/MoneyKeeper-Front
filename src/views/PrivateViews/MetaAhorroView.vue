<script setup lang="ts">
import { useMetaAhorroStore } from '@/stores/MetaAhorro'

const store = useMetaAhorroStore()

store.findByUser()

console.log(store)
</script>

<template>
    <main class="metas">
        <h2 class="metas__titulo">Listado de Metas de Ahorro</h2>
        <div class="metas__views" v-for="meta in store.metas" :key="meta.id">
            <div class="metas__views-card">
                <p><span>Nombre de la meta:</span> {{ meta._nombremeta }}</p>
                <p><span>Descripción:</span> {{ meta._descripcionMeta }}</p>
                <p><span>Dinero objetivo:</span> {{ meta.dineroObjetivo }}€</p>
                <p><span>Dinero actual:</span> {{ meta._dineroActual }}€</p>
                <p><span>Estado:</span> {{ meta._activoMeta ? 'Activa' : 'Inactiva' }}</p>
                <p><span>Fecha de creación:</span> {{ meta._fechaCreacionMeta }}</p>
                <p><span>Fecha objetivo:</span> {{ meta._fechaObjetivoMeta }}</p>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
.metas {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-top: 2%;
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
        }
    }
}
</style>
