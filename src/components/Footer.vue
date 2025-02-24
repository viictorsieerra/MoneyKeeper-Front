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

<style scoped>
.footer {
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
}
.footer__social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
.footer__social-link {
  color: white;
  text-decoration: none;
}
@media (min-width: 768px) {
  .footer__social-links {
    flex-direction: row;
    justify-content: center;
  }
  .footer__social-link {
    margin: 0 1rem;
  }
}
</style>