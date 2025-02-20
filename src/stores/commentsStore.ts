import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<string[]>([]);

  const addComment = (comment: string) => {
    comments.value.push(comment);
  };

  return { comments, addComment };
});