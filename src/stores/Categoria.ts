import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import CategoriaDTO from './DTO/CategoriaDTO';
import { useJWTStore } from './JWT';
export const useCategoriaStore = defineStore('categoria', () => {
  const categorias = ref(new Array<CategoriaDTO>)
  const jwtStore = useJWTStore()

  
  function getCategorias(){
    const token = jwtStore.jwt
    categorias.value = []
    fetch("https://moneykeeper-api.retocsv.es/api/Categoria", {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        categorias.value.splice(0, categorias.value.length, ...data)
        console.log("CATEGORIAS : ", categorias.value)
      })
      .catch(error => console.log(error))
  }
  return {categorias, getCategorias}
}, { persist: true })
