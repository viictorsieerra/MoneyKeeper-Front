<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__section">
        <h3 class="footer__title">Sobre Nosotros</h3>
        <p class="footer__text">Somos una empresa dedicada a ofrecer las mejores soluciones financieras para ayudarte a gestionar tu dinero de manera eficiente.</p>
      </div>
      <div class="footer__section">
        <h3 class="footer__title">Enlaces Rápidos</h3>
        <ul class="footer__links">
          <li><a href="#" class="footer__link">Inicio</a></li>
          <li><a href="#" class="footer__link">Que ofrecemos</a></li>
          <li><a href="#" class="footer__link">Sobre Nosotros</a></li>
        </ul>
      </div>
      <div class="footer__section">
        <h3 class="footer__title">Contacto</h3>
        <p class="footer__text">Email: moneykeeper@gmail.com</p>
        <p class="footer__text">Teléfono: +34 631 31 32 34</p>
        <div class="footer__social-links">
          <a href="#" class="footer__social-link">Facebook</a>
          <a href="#" class="footer__social-link">Twitter</a>
          <a href="#" class="footer__social-link">Instagram</a>
        </div>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__bottom-text">&copy; 2023 MiPágina. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
@import '@/assets/styles/_variables.scss';
@import '@/assets/styles/_mixins.scss';

.footer {
  background-color: #333;
  color: $footer-text-color;
  padding: 40px 20px;
  text-align: center;
  font-size: 14px;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer__content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer__section {
  flex: 1 1 200px;
  margin: 20px;
}

.footer__title {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: $footer-text-color;
}

.footer__text {
  margin: 0;
  font-size: 1rem;
  color:$footer-text-color;
}

.footer__links {
  list-style: none;
  padding: 0;
}

.footer__link {
  display: block;
  margin: 5px 0;
  color: white;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}

.footer__link:hover {
  color:$primary-color;
}

.footer__social-links {
  margin-top: 10px;
}

.footer__social-link {
  margin: 0 15px;
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  transition: color 0.3s;
}

.footer__social-link:hover {
  color:$primary-color;
}

.footer__form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__input {
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
}

.footer__button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: $primary-color;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.footer__button:hover {
  background-color: darken($primary-color, 10%);
}

.footer__bottom {
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 10px;
}

.footer__bottom-text {
  margin: 0;
  font-size: 0.9rem;
  color: $text-color;
}

@media (min-width: 600px) {
  .footer__text {
    font-size: 1.1rem;
  }

  .footer__social-link {
    font-size: 1.4rem;
  }
}

@media (min-width: 1024px) {
  .footer__text {
    font-size: 1.2rem;
  }

  .footer__social-link {
    font-size: 1.5rem;
  }
}
</style>