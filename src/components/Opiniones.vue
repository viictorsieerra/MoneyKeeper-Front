<template>
  <section class="opinions">
    <h2 class="opinions__title">Opiniones</h2>
    <div class="opinions__list">
      <div class="opinions__item" v-for="(comment, index) in comments" :key="index">
        <p class="opinions__text">{{ comment }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useCommentsStore } from '../stores/commentsStore';

const commentsStore = useCommentsStore();
const comments = ref(commentsStore.comments);
</script>

<style scoped>
.opinions {
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  max-width: 100%;
  margin: 2rem auto;
  text-align: center;
}
.opinions__title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #1E2A39;
}
.opinions__list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.opinions__item {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.opinions__text {
  margin: 0;
  color: #333;
}
@media (min-width: 768px) {
  .opinions {
    max-width: 600px;
  }
}
</style>