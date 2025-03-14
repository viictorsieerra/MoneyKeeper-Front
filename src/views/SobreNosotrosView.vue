<template>
  <div class="container">
    <FondoCanvas />
    <div class="sobre-nosotros">
      <h2>Sobre Nosotros</h2>
      <div class="contenido">
        <div class="texto">
          <p>
            La historia de nuestra plataforma comienza con dos amigos, <strong>Víctor</strong> y <strong>Alfonso</strong>,
            apasionados por la tecnología y la educación financiera. Siempre habían compartido la idea de que el ahorro es
            una habilidad esencial, pero muchas personas no tienen herramientas adecuadas para gestionarlo de manera
            eficiente.
          </p>
          <p>
            En 2024, después de muchas conversaciones y cafés interminables, decidieron unir sus conocimientos en desarrollo
            web y finanzas personales para crear una plataforma accesible, intuitiva y potente que ayudara a las personas a
            gestionar mejor su dinero. Así nació nuestra aplicación de ahorro.
          </p>
          <p>
            Nuestro objetivo es hacer que el ahorro sea sencillo, motivador y transparente para todos. Creemos que con las
            herramientas adecuadas, cualquiera puede mejorar su estabilidad financiera y alcanzar sus metas.
          </p>
          <p class="frase">"Ahorra hoy, disfruta mañana." – Víctor & Alfonso</p>
        </div>
        <img src="/VictorAlfonso.jpg" alt="Víctor y Alfonso" class="imagen-equipo" />
      </div>
    </div>
  </div>
</template>

<script setup>
import FondoCanvas from "@/components/FondoCanvas.vue";
</script>

<style scoped lang="scss">
.sobre-nosotros {
  width: 90%;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
  z-index: 1;
}

h2 {
  text-align: center;
  color: #333;
}

.contenido {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.texto {
  color: #555;
  line-height: 1.6;
  text-align: left;
  width: 100%;
  font-size: 1rem;
}

.frase {
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 20px;
}

.imagen-equipo {
  width: 100%;
  max-width: 300px;
  border-radius: 8px;
  margin: 10px auto;
  display: block;
}

@media (min-width: 1024px) {
  .sobre-nosotros {
    width: 80%;
  }

  .contenido {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .texto {
    width: 60%;
    font-size: 1.2rem;
  }

  .imagen-equipo {
    width: 35%;
    max-width: none;
  }
}
</style>
