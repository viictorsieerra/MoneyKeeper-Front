import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<string[]>([]);

  const addComment = (comment: string) => {
    comments.value.push(comment);
  };

  const removeComment = (index: number) => {
    comments.value.splice(index, 1);
  };

  return {
    comments,
    addComment,
    removeComment,
  };
});