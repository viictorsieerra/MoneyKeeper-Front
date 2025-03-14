<template>
  <canvas ref="canvasRef"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Referencia al canvas
const canvasRef = ref<HTMLCanvasElement | null>(null);

// Tipo para las flechas
interface Arrow {
  x: number;
  y: number;
  speed: number;
}

// Arreglo de flechas
let arrows: Arrow[] = [];
let ctx: CanvasRenderingContext2D | null = null;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Configuración del canvas
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "-1",
    pointerEvents: "none",
  });

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Crear flechas
  const numArrows = Math.floor(canvas.width / 50);
  const arrowSize = 20;
  const arrowHeight = 40;

  arrows = Array.from({ length: numArrows }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 0.3 + Math.random() * 0.3,
  }));

  function drawArrow(x: number, y: number) {
    if (!ctx) return;

    ctx.fillStyle = "rgba(227, 95, 93, 0.1)";

    // Cuerpo de la flecha
    ctx.fillRect(x - arrowSize / 4, y + arrowSize, arrowSize / 2, arrowHeight);

    // Cabeza de la flecha
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - arrowSize / 2, y + arrowSize);
    ctx.lineTo(x + arrowSize / 2, y + arrowSize);
    ctx.closePath();
    ctx.fill();
  }

  function update() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    arrows.forEach((arrow) => {
      arrow.y -= arrow.speed;
      if (arrow.y < -arrowSize) {
        arrow.y = canvas.height;
        arrow.x = Math.random() * canvas.width;
      }
      drawArrow(arrow.x, arrow.y);
    });
    requestAnimationFrame(update);
  }

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  update();

  // Eliminar el evento al desmontar el componente
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
