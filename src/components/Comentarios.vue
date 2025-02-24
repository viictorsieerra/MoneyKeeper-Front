<template>
  <section class="comments-section">
    <h2 class="comments-section__title">Dinos como ha sido tu experiencia utilizando tus servicios!</h2>
    <form class="comments-section__form" @submit.prevent="addComment">
      <input class="comments-section__input" v-model="newComment" type="text" placeholder="Escribe tu comentario" required />
      <button class="comments-section__button" type="submit">Enviar</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCommentsStore } from '../stores/commentsStore';

const commentsStore = useCommentsStore();
const newComment = ref('');

const addComment = () => {
  if (newComment.value.trim()) {
    commentsStore.addComment(newComment.value);
    newComment.value = '';
  }
};
</script>

<style scoped>
.comments-section {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  max-width: 100%;
  margin: 2rem auto;
  text-align: center;
}
.comments-section__title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1E2A39;
}
.comments-section__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}
.comments-section__input {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.comments-section__button {
  padding: 0.75rem 1.5rem;
  background-color: #FF0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.comments-section__button:hover {
  background-color: #a80404;
}
@media (min-width: 768px) {
  .comments-section {
    max-width: 600px;
  }
}
</style>