<template>
  <footer>
    <p>&copy; 2023 MiPágina. Todos los derechos reservados.</p>
    <div class="social-links">
      <a href="#">Facebook</a>
      <a href="#">Twitter</a>
      <a href="#">Instagram</a>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
footer {
  padding: 1rem;
  background-color: #333;
  color: white;
  text-align: center;
}
.social-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}
.social-links a {
  color: white;
  text-decoration: none;
}
@media (min-width: 768px) {
  .social-links {
    flex-direction: row;
    justify-content: center;
  }
  .social-links a {
    margin: 0 1rem;
  }
}
</style>