<template>
  <canvas id="canvas"></canvas>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "-1";
  canvas.style.pointerEvents = "none"; // Asegúrate de que el canvas no reciba eventos de clic

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const arrows = [];
  const numArrows = Math.floor(canvas.width / 50);
  const arrowSize = 20;
  const arrowHeight = 40; // Altura del cuerpo de la flecha

  for (let i = 0; i < numArrows; i++) {
    arrows.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 0.3 + Math.random() * 0.3 // Velocidad más lenta
    });
  }

  function drawArrow(x, y) {
    ctx.fillStyle = "#FF0000"; // Color rojo
    
    // Dibujar el cuerpo de la flecha (rectángulo)
    ctx.fillRect(x - arrowSize / 4, y + arrowSize, arrowSize / 2, arrowHeight);
    
    // Dibujar la punta de la flecha (triángulo)
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - arrowSize / 2, y + arrowSize);
    ctx.lineTo(x + arrowSize / 2, y + arrowSize);
    ctx.closePath();
    ctx.fill();
  }

  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arrows.forEach(arrow => {
      arrow.y -= arrow.speed;
      if (arrow.y < -arrowSize) {
        arrow.y = canvas.height;
        arrow.x = Math.random() * canvas.width;
      }
      drawArrow(arrow.x, arrow.y);
    });
    requestAnimationFrame(update);
  }

  window.addEventListener("resize", resizeCanvas);

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  update();

  onUnmounted(() => {
    window.removeEventListener("resize", resizeCanvas);
  });
});
</script>

<style scoped>
canvas {
  display: block;
  pointer-events: none;
}
</style>