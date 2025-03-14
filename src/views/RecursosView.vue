<script setup>
import { ref, onMounted } from "vue";

const recursos = ref([]);
const nuevoRecurso = ref({ nombre: "", descripcion: "", precio: "" });

// Cargar los recursos al iniciar
const cargarRecursos = async () => {
    try {
        const response = await fetch("https://localhost:7053/api/Recursos");
        if (!response.ok) throw new Error("Error al obtener los recursos");
        recursos.value = await response.json();
    } catch (error) {
        console.error("Error:", error);
    }
};

// Añadir un nuevo recurso
const añadirRecurso = async () => {
    try {
        const response = await fetch("https://localhost:7053/api/Recursos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(nuevoRecurso.value)
        });
        if (!response.ok) throw new Error("Error al añadir recurso");
        const recursoAgregado = await response.json();
        recursos.value.push(recursoAgregado);
        nuevoRecurso.value = { nombre: "", descripcion: "", precio: "" };
    } catch (error) {
        console.error("Error:", error);
    }
};

// Eliminar un recurso
const eliminarRecurso = async (id) => {
    try {
        const response = await fetch(`https://localhost:7053/api/Recursos/${id}`, {
            method: "DELETE"
        });
        if (!response.ok) throw new Error("Error al eliminar recurso");
        recursos.value = recursos.value.filter(recurso => recurso.id !== id);
    } catch (error) {
        console.error("Error:", error);
    }
};

onMounted(cargarRecursos);
</script>

<template>
    <div class="recursos-container">
        <h2>Gestión de Recursos</h2>
        
        <form @submit.prevent="añadirRecurso">
            <input v-model="nuevoRecurso.nombre" placeholder="Nombre" required />
            <input v-model="nuevoRecurso.descripcion" placeholder="Descripción" required />
            <input v-model.number="nuevoRecurso.precio" type="number" placeholder="Precio" required />
            <button type="submit">Añadir</button>
        </form>
        
        <ul>
            <li v-for="recurso in recursos" :key="recurso.id">
                <span>{{ recurso.nombre }} - {{ recurso.descripcion }} - {{ recurso.precio }}€</span>
                <button @click="eliminarRecurso(recurso.id)">Eliminar</button>
            </li>
        </ul>
    </div>
</template>

<style scoped>
.recursos-container {
    max-width: 400px;
    margin: auto;
    text-align: center;
}
form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}
input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background-color: #218838;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
}
li button {
    background-color: #dc3545;
}
li button:hover {
    background-color: #c82333;
}
</style>
