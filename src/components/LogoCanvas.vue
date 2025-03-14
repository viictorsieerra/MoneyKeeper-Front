<template>
  <canvas id="logocanvas" z-index="1000000"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  var canvas = document.getElementById('logocanvas') as HTMLCanvasElement;

  if(!canvas){
    console.error("No se encontró el canvas")
    return
  }

  var ctx = canvas.getContext('2d')!;

  if(!ctx){
    console.error("No se pudo obtener el contexto")
    return;
  }

  // Calculamos las dimensiones reales que necesita nuestra figura
  // Basado en las coordenadas originales (sin offset)
  const minX = 40;  // Punto más a la izquierda del pentágono
  const maxX = 160; // Punto más a la derecha del pentágono
  const minY = 10;  // Punto más alto del pentágono
  const maxY = 170; // Considerando la posición inicial del texto

  // Añadimos un pequeño margen para evitar cortes
  const margen = 20;
  
  // Establecemos el tamaño del canvas ajustado a la figura
  canvas.width = (maxX - minX) + 2 * margen;
  canvas.height = (maxY - minY) + 2 * margen;

  // Reajustamos el offset para que la figura quede centrada en el canvas redimensionado
  const offsetX = margen - minX;
  const offsetY = margen - minY;

  let raton = { x: 0, y: 0 };

  window.addEventListener('mousemove', function (event) {
    const rect = canvas.getBoundingClientRect();
    raton.x = event.clientX - rect.left;
    raton.y = event.clientY - rect.top;
  });

  // Definir tamaños originales
  let incremento = 0;
  const maxIncremento = 10;
  
  // Coordenadas del pentágono (con nuevo offset)
  const puntosPentagono = [
    { x: 140 + offsetX, y: 10 + offsetY },
    { x: 160 + offsetX, y: 60 + offsetY },
    { x: 130 + offsetX, y: 130 + offsetY },
    { x: 70 + offsetX, y: 130 + offsetY },
    { x: 40 + offsetX, y: 60 + offsetY }
  ];
  
  // Barras del gráfico (con nuevo offset)
  const baseY = 130 + offsetY;
  const barras = [
    { x: 75 + offsetX, height: 40 },
    { x: 95 + offsetX, height: 60 },
    { x: 115 + offsetX, height: 80 }
  ];
  
  // Coordenadas de la flecha (con nuevo offset)
  const startX = puntosPentagono[3].x;
  const startY = puntosPentagono[3].y;
  let endX = puntosPentagono[1].x - 20;
  let endY = puntosPentagono[1].y - 10;
  const arrowSize = 15;

  // Variables para la animación del texto (con nuevo offset)
  const textoInicialX = 100 + offsetX;
  const textoInicialY = 170 + offsetY;
  const textoInicialTamaño = 18;
  const textoFinalTamaño = 14;

  // Calculamos la pendiente para la rotación del texto
  const pendiente = (puntosPentagono[0].y - puntosPentagono[4].y) / (puntosPentagono[0].x - puntosPentagono[4].x);
  const textoDestinoX = 105 + offsetX;
  const textoDestinoY = 52 + offsetY;
  const anguloTexto = Math.atan(pendiente);

  let textoX = textoInicialX;
  let textoY = textoInicialY;
  let tamañoTexto = textoInicialTamaño;
  let rotacionTexto = 0;
  let animacionTexto = 0;
  const velocidadAnimacion = 0.05;

  // Punto de control para la curva
  const puntoCurvaX = 150 + offsetX;
  const puntoCurvaY = 40 + offsetY;

  // Offset para separar "MONEY" y "KEEPER"
  const moneyOffset = -8;
  const keeperOffset = 8;

  function actualiza() {
    // Si el ratón está dentro del pentágono
    let dentroPentagono = raton.x > puntosPentagono[4].x && raton.x < puntosPentagono[1].x && 
                          raton.y > puntosPentagono[0].y && raton.y < puntosPentagono[2].y;
    if (dentroPentagono) {
      if (incremento < maxIncremento) incremento++;
      if (animacionTexto < 1) animacionTexto += velocidadAnimacion;
    } else {
      if (incremento > 0) incremento--;
      if (animacionTexto > 0) animacionTexto -= velocidadAnimacion;
    }

    animacionTexto = Math.max(0, Math.min(1, animacionTexto));

    // Calcular la posición actual del texto usando una curva
    if (animacionTexto < 0.5) {
      const t = animacionTexto * 2;
      textoX = textoInicialX + (puntoCurvaX - textoInicialX) * t;
      textoY = textoInicialY - (textoInicialY - puntoCurvaY) * t;
      rotacionTexto = anguloTexto * t;
      tamañoTexto = textoInicialTamaño - (textoInicialTamaño - textoFinalTamaño) * t;
    } else {
      const t = (animacionTexto - 0.5) * 2;
      textoX = puntoCurvaX - (puntoCurvaX - textoDestinoX) * t;
      textoY = puntoCurvaY + (textoDestinoY - puntoCurvaY) * t;
      rotacionTexto = anguloTexto;
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

    // Dibujar pentágono sin la línea superior derecha
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
      ctx.translate(textoX, textoY);
      ctx.rotate(rotacionTexto);
      ctx.font = `bold ${tamañoTexto + incremento / 2}px Montserrat`;
      ctx.fillStyle = `rgba(0, 0, 0)`;
      ctx.textAlign = "center";
      ctx.fillText("MONEY KEEPER", 0, 0);
    } else {
      // Durante la animación, dibujamos "MONEY" y "KEEPER" por separado
      const moneySize = tamañoTexto - 0.5;

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
#logocanvas {
  height: 120px;
  cursor: pointer;
}
</style>
