<template>
  <canvas id="logocanvas" z-index="1000000"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {

var canvas = document.getElementById('logocanvas') as HTMLCanvasElement;
var ctx = canvas.getContext('2d');
let raton = { x: undefined, y: undefined };
window.addEventListener('mousemove', function (event) {
  const rect = canvas.getBoundingClientRect();
  raton.x = event.clientX - rect.left;
  raton.y = event.clientY - rect.top;
});
// Definir tamaños originales
let incremento = 0;
const maxIncremento = 10;
// Coordenadas del pentágono
const puntosPentagono = [
  { x: 140, y: 10 },
  { x: 160, y: 60 },
  { x: 130, y: 130 },
  { x: 70, y: 130 },
  { x: 40, y: 60 }
];
// Barras del gráfico
const baseY = 130;
const barras = [
  { x: 75, height: 40 },
  { x: 95, height: 60 },
  { x: 115, height: 80 }
];
// Coordenadas de la flecha
const startX = puntosPentagono[3].x;
const startY = puntosPentagono[3].y;
let endX = puntosPentagono[1].x - 20;
let endY = puntosPentagono[1].y - 10;
const arrowSize = 15;

// Variables para la animación del texto
const textoInicialX = 100;  // Posición inicial X del texto (debajo del pentágono)
const textoInicialY = 170;  // Posición inicial Y del texto (debajo del pentágono)
const textoInicialTamaño = 18; // Tamaño inicial del texto
const textoFinalTamaño = 14;   // Tamaño final del texto (más pequeño para caber)

// Posición final del texto - en diagonal paralela a la línea superior izquierda
// Calculamos la pendiente de la línea superior izquierda (entre puntos 4 y 0)
const pendiente = (puntosPentagono[0].y - puntosPentagono[4].y) / (puntosPentagono[0].x - puntosPentagono[4].x);
// Posición final ajustada para que MONEY esté dentro y KEEPER sobresalga
// Movemos más hacia la derecha para que "MO" no sobresalga
const textoDestinoX = 105; // Aumentado desde 95 para mover el texto más adentro del pentágono
const textoDestinoY = 52;  // Ajustado ligeramente para mejor posición
// Ángulo de rotación para el texto (paralelo a la línea superior izquierda)
const anguloTexto = Math.atan(pendiente);

let textoX = textoInicialX;
let textoY = textoInicialY;
let tamañoTexto = textoInicialTamaño;
let rotacionTexto = 0; // Rotación inicial del texto
let animacionTexto = 0;     // Progreso de la animación (0-1)
const velocidadAnimacion = 0.05;  // Velocidad de la animación

// Definir ruta de entrada del texto
// Punto de control para la curva
const puntoCurvaX = 150;
const puntoCurvaY = 40;

// Definir offset para separar "MONEY" y "KEEPER"
const moneyOffset = -8; // Ajustar para mover "MONEY" más dentro
const keeperOffset = 8; // Mantener "KEEPER" en su posición

function actualiza() {
  // Si el ratón está dentro del pentágono
  let dentroPentagono = raton.x > 40 && raton.x < 160 && raton.y > 10 && raton.y < 130;
  if (dentroPentagono) {
    if (incremento < maxIncremento) incremento++;
    // Aumentar la animación del texto
    if (animacionTexto < 1) animacionTexto += velocidadAnimacion;
  } else {
    if (incremento > 0) incremento--;
    // Disminuir la animación del texto
    if (animacionTexto > 0) animacionTexto -= velocidadAnimacion;
  }

  // Asegurar que la animación esté dentro de los límites
  animacionTexto = Math.max(0, Math.min(1, animacionTexto));

  // Calcular la posición actual del texto usando una curva para que entre por el hueco
  if (animacionTexto < 0.5) {
    // Primera mitad: subiendo hacia el hueco (desde abajo hacia arriba-derecha)
    const t = animacionTexto * 2; // Normalizar a 0-1 para esta fase
    textoX = textoInicialX + (puntoCurvaX - textoInicialX) * t;
    textoY = textoInicialY - (textoInicialY - puntoCurvaY) * t;
    // Rotación gradual del texto
    rotacionTexto = anguloTexto * t;
    // Reducción gradual del tamaño del texto
    tamañoTexto = textoInicialTamaño - (textoInicialTamaño - textoFinalTamaño) * t;
  } else {
    // Segunda mitad: entrando y colocándose en diagonal
    const t = (animacionTexto - 0.5) * 2; // Normalizar a 0-1 para esta fase
    textoX = puntoCurvaX - (puntoCurvaX - textoDestinoX) * t;
    textoY = puntoCurvaY + (textoDestinoY - puntoCurvaY) * t;
    // Mantener rotación completa
    rotacionTexto = anguloTexto;
    // Mantener tamaño reducido
    tamañoTexto = textoFinalTamaño;
  }
}

function dibujar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  actualiza();

  // Redibujar elementos con incremento
  ctx.fillStyle = "#a6a6a6";
  barras.forEach(bar => {
    ctx.fillRect(bar.x, baseY - (bar.height + incremento), 10 + incremento / 2, bar.height - incremento);
  });

  // Dibujar flecha
  ctx.strokeStyle = "#f11414";
  ctx.fillStyle = "#f11414";
  ctx.lineWidth = 7 + incremento / 4;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX + incremento, endY - incremento);
  ctx.stroke();

  // Dibujar punta de la flecha
  const angle = Math.atan2(endY - startY, endX - startX);
  ctx.beginPath();
  ctx.moveTo(endX + incremento, endY - incremento);
  ctx.lineTo(
    (endX + incremento) - (arrowSize + incremento) * Math.cos(angle - Math.PI / 6),
    (endY - incremento) - (arrowSize + incremento) * Math.sin(angle - Math.PI / 6)
  );
  ctx.lineTo(
    (endX + incremento) - (arrowSize + incremento) * Math.cos(angle + Math.PI / 6),
    (endY - incremento) - (arrowSize + incremento) * Math.sin(angle + Math.PI / 6)
  );
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Dibujar pentágono sin la línea superior derecha (entre puntos 0 y 1)
  ctx.strokeStyle = "black";
  ctx.lineWidth = 7;

  // Dibujar la línea superior izquierda
  ctx.beginPath();
  ctx.moveTo(puntosPentagono[4].x, puntosPentagono[4].y - incremento);
  ctx.lineTo(puntosPentagono[0].x, puntosPentagono[0].y - incremento);
  ctx.stroke();

  // Dibujar el resto del pentágono excepto la línea superior derecha
  ctx.beginPath();
  ctx.moveTo(puntosPentagono[1].x, puntosPentagono[1].y - incremento);
  ctx.lineTo(puntosPentagono[2].x, puntosPentagono[2].y - incremento);
  ctx.lineTo(puntosPentagono[3].x, puntosPentagono[3].y - incremento);
  ctx.lineTo(puntosPentagono[4].x, puntosPentagono[4].y - incremento);
  ctx.stroke();

  // Guardar el estado actual del contexto
  ctx.save();

  // Si estamos en la animación inicial o final, mostramos todo el texto
  if (animacionTexto < 0.1 || animacionTexto > 0.9) {
    // Dibujar todo el texto "MONEY KEEPER"
    ctx.translate(textoX, textoY);
    ctx.rotate(rotacionTexto);
    ctx.font = `bold ${tamañoTexto + incremento / 2}px Montserrat`;
    ctx.fillStyle = `rgba(0, 0, 0)`;
    ctx.textAlign = "center";
    ctx.fillText("MONEY KEEPER", 0, 0);
  } else {
    // Durante la animación, dibujamos "MONEY" y "KEEPER" por separado
    // Ajustar el tamaño y posición de "MONEY" para asegurarnos de que no sobresalga
    const moneySize = tamañoTexto - 0.5; // Hacer "MONEY" ligeramente más pequeño

    ctx.translate(textoX, textoY);
    ctx.rotate(rotacionTexto);

    // MONEY - con tamaño ligeramente menor y más hacia la derecha
    ctx.font = `bold ${moneySize + incremento / 2}px Montserrat`;
    ctx.fillStyle = `rgba(0, 0, 0)`;
    ctx.textAlign = "right";
    ctx.fillText("MONEY", moneyOffset, 0);

    // KEEPER - tamaño normal
    ctx.font = `bold ${tamañoTexto + incremento / 2}px Montserrat`;
    ctx.textAlign = "left";
    ctx.fillText("KEEPER", keeperOffset, 0);
  }

  // Restaurar el estado del contexto
  ctx.restore();

  requestAnimationFrame(dibujar);
}

dibujar();
});

</script>

<style scoped lang="scss">
#logocanvas{
  display: grid;
  height: 80px;
  &:hover{
    cursor: pointer;
  }
}
</style>
