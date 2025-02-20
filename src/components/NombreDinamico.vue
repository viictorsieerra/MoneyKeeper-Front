<template>
  <div class="greeting">
    <h1>{{ greetingMessage }}</h1>
    <p>{{ userDescription }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

const opciones = [
  'Ahorrar para tu primer coche', 
  'Gestiona tus recibos', 
  'Metas ahorro', 
  'Gestiona tus cuentas', 
  'Organiza tus transacciones'
];

const descripcion = [
  'Establece una meta de ahorro y sigue tu progreso hasta alcanzar tu vehículo soñado.',
  'Organiza tus facturas y recibe recordatorios para nunca olvidar un pago.',
  'Define objetivos financieros y monitorea cuánto te falta para lograrlos.',
  'Consulta todas tus cuentas bancarias en un solo lugar para un mejor control.',
  'Visualiza y categoriza tus ingresos y gastos de manera clara y sencilla.'
];

const userOptions = ref(opciones[0]);
const userDescription = ref(descripcion[0]);

const greetingMessage = computed(() => userOptions.value);

let optionInterval = null;

const changeOptions = () => {
  let index = 0;
  optionInterval = setInterval(() => {
    index = (index + 1) % opciones.length;
    userOptions.value = opciones[index];
    userDescription.value = descripcion[index];
  }, 3000);
};

onMounted(() => {
  changeOptions();
});

onUnmounted(() => {
  clearInterval(optionInterval);
});
</script>

<style scoped>
.greeting {
  text-align: center;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  max-width: 100%;
  margin: 75px auto;
}
.greeting h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  transition: opacity 0.5s ease-in-out;
}
.greeting p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}
.greeting button {
  padding: 0.75rem 1.5rem;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.greeting button:hover {
  background-color: #a80404;
}
@media (min-width: 768px) {
  .greeting {
    max-width: 600px;
  }
}
</style>