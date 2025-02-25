<template>
  <footer class="footer">
    <p class="footer__text">&copy; 2023 MiPágina. Todos los derechos reservados.</p>
    <div class="footer__social-links">
      <a href="#" class="footer__social-link">Facebook</a>
      <a href="#" class="footer__social-link">Twitter</a>
      <a href="#" class="footer__social-link">Instagram</a>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
.footer {
  background-color: #333;
  color: white;
  padding: 20px;
  text-align: center;
  font-size: 14px;
  position: relative;
  bottom: 0;
  width: 100%;
}

.footer__text {
  margin: 0;
  font-size: 1rem;
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
  color: #FFD700; 
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
  .footer {
    padding: 30px;
  }

  .footer__text {
    font-size: 1.2rem;
  }

  .footer__social-link {
    font-size: 1.5rem;
  }
}
</style>
