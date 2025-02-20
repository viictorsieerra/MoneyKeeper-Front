<template>
    <section class="comments-section">
      <h2>Dinos como ha sido tu experiencia utilizando nuestros servicios!</h2>
      <form @submit.prevent="addComment">
        <input v-model="newComment" type="text" placeholder="Escribe tu comentario" required />
        <button type="submit">Enviar</button>
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
  .comments-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #1E2A39;
  }
  .comments-section form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2rem;
  }
  .comments-section input {
    width: 100%;
    max-width: 400px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .comments-section button {
    padding: 0.75rem 1.5rem;
    background-color: #FF0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .comments-section button:hover {
    background-color: #a80404;
  }
  @media (min-width: 768px) {
    .comments-section {
      max-width: 600px;
    }
  }
  </style>