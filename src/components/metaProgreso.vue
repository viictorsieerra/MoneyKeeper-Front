<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  actual?: number;
  objetivo?: number;
}>();

const porcentaje = computed(() => {
  if (!props.objetivo || props.objetivo <= 0) return 100; // Si objetivo es 0 o undefined, retorna 100
  const porcentajeCalculado = (props.actual ?? 0) / props.objetivo * 100;
  return Math.min(100, Math.max(0, Math.round(porcentajeCalculado)));
});

const faltante = computed(() => {
  if (props.objetivo && props.actual !== undefined) {
    return Math.max(0, props.objetivo - props.actual);
  }
  return 0;
});


const estiloProgreso = computed(() => {
  return {
    width: `${porcentaje.value}%`
  };
});

const estiloMarcador = computed(() => {
  return {
    left: `${porcentaje.value}%`
  };
});

function formatearDinero(valor: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(valor);
}
</script>

<template>
    <div class="meta-progreso">
      <div class="medidor">
        <div class="medidor__barra">
          <div class="medidor__progreso" :style="estiloProgreso"></div>
          <div class="medidor__marcador" :style="estiloMarcador"></div>
        </div>
        <div class="medidor__etiquetas">
          <span class="medidor__etiqueta">0€</span>
          <span class="medidor__etiqueta">{{ formatearDinero(objetivo ?? 0) }}</span>
        </div>
      </div>
      <div class="meta-detalles">
        <div class="meta-detalle">
          <span class="meta-detalle__porcentaje">{{ porcentaje }}%</span>
          <span class="meta-detalle__completado">completado</span>
        </div>
        <div class="meta-detalle">
          <span class="meta-detalle__restante">{{ formatearDinero(faltante) }}</span>
          <span class="meta-detalle__texto">restantes</span>
        </div>
      </div>
    </div>
  </template>
  
  
  <style lang="scss" scoped>
  .meta-progreso {
    width: 100%;
    margin: 15px 0;
  }
  
  .medidor {
    margin-bottom: 10px;
  
    &__barra {
      height: 16px;
      background-color: #e9ecef;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
      margin-bottom: 5px;
    }
  
    &__progreso {
      height: 100%;
      background: linear-gradient(90deg, #28a745, #5cb85c);
      border-radius: 8px;
      transition: width 0.5s ease;
    }
  
    &__marcador {
      position: absolute;
      top: -4px;
      display: none;
      width: 3px;
      height: 24px;
      background-color: #007bff;
      transform: translateX(-50%);
      transition: left 0.5s ease;
    }
  
    &__etiquetas {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #6c757d;
    }
  }
  
  .meta-detalles {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .meta-detalle {
    display: flex;
    flex-direction: column;
    
    &__porcentaje {
      font-size: 16px;
      font-weight: bold;
      color: #28a745;
    }
    
    &__completado {
      font-size: 12px;
      color: #6c757d;
    }
    
    &__restante {
      font-size: 16px;
      font-weight: bold;
      color: #007bff;
    }
    
    &__texto {
      font-size: 12px;
      color: #6c757d;
    }
  }
  </style>