<template>
    <div class="how-it-works">
      <h2 class="how-it-works__title">Consejos para ahorrar</h2>
      <p class="how-it-works__description">Sigue estos consejos para mejorar tu salud financiera y alcanzar tus objetivos de ahorro.</p>
      <ul class="how-it-works__list">
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Planifica tu presupuesto:</strong>
            <p>Haz un presupuesto mensual para tener claridad sobre tus gastos y ver cómo puedes recortar en áreas no esenciales.</p>
          </div>
        </li>
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Ahorra primero, gasta después:</strong>
            <p>Configura una transferencia automática a tu cuenta de ahorros cada vez que recibas tu sueldo. Así, ahorrarás sin pensarlo.</p>
          </div>
        </li>
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Reduce tus deudas:</strong>
            <p>Paga tus deudas de manera prioritaria para reducir los intereses que pagas cada mes.</p>
          </div>
        </li>
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Aprovecha las ofertas:</strong>
            <p>Aprovecha las ofertas y descuentos, pero no caigas en la tentación de comprar lo que no necesitas solo porque está en rebajas.</p>
          </div>
        </li>
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Diversifica tus ahorros:</strong>
            <p>No pongas todos tus ahorros en un solo lugar. Considera diferentes formas de inversión, como fondos indexados, cuentas de ahorro de alto rendimiento o incluso planes de pensiones.</p>
          </div>
        </li>
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Haz un seguimiento de tus gastos:</strong>
            <p>Lleva un registro de tus gastos diarios para identificar áreas en las que puedes reducir o eliminar gastos innecesarios. Utiliza aplicaciones móviles o hojas de cálculo para hacerlo fácilmente.</p>
          </div>
        </li>
        <li class="how-it-works__item">
          <div class="advice-bubble">
            <strong>Establece metas de ahorro realistas:</strong>
            <p>Fija metas claras y alcanzables para tu ahorro. Por ejemplo, ahorrar una cantidad específica cada mes o alcanzar un monto en particular en un plazo determinado.</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .how-it-works {
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 10px;
    max-width: 100%;
    margin: 2rem auto;
  }
  
  .how-it-works__title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #1E2A39;
    text-align: center;
  }
  
  .how-it-works__description {
    font-size: 1rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .how-it-works__list {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }
  
  .how-it-works__item {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
  
  .advice-bubble {
    background-color:  #c9c9c9;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }
  
  .advice-bubble strong {
    font-weight: bold;
  }
  
  .advice-bubble p {
    margin-top: 0.5rem;
    font-size: 1rem;
  }
  

  @media (min-width: 600px) {
    .how-it-works {
      padding: 2rem;
      max-width: 800px;
    }
  
    .how-it-works__title {
      font-size: 2rem;
    }
  
    .how-it-works__description {
      font-size: 1.2rem;
    }
  
    .advice-bubble {
      padding: 1.5rem;
    }
  
    .how-it-works__item {
      font-size: 1.1rem;
    }
  }
  
  @media (min-width: 1024px) {
    .how-it-works__title {
      font-size: 2.5rem;
    }
  
    .how-it-works__description {
      font-size: 1.3rem;
    }
  
    .advice-bubble {
      padding: 2rem;
    }
  
    .how-it-works__item {
      font-size: 1.2rem;
    }
  }
  </style>