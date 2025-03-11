import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useMetaAhorroStore = defineStore('cuenta', () => {

  const metas = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)
  function findByUser() {
    console.log("DDD " +jwtStore.jwt)
    const strToken = jwtStore.jwt
     metas.value = []
    if (strToken != ""){
    console.log("PRUEBA" + jwtStore.jwt)
    }
    else (console.log("Token no pillado correctamente"))

    fetch("https://localhost:7053/MetaAhorro/metas",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach((meta:any) => {
          meta._fechaCreacionMeta = new Date(meta._fechaCreacionMeta).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        metas.value.splice(0, metas.value.length, ...data)
      })
      .catch(error => console.log(error))
  }

  return { metas, findByUser }
}, {persist: true})
