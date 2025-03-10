import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useReciboStore = defineStore('recibo', () => {

  const recibos = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)
  function findByUser() {
    console.log("DDD " +jwtStore.jwt)
    const strToken = jwtStore.jwt
    
    if (strToken != ""){
    console.log("PRUEBA" + jwtStore.jwt)
    }
    else (console.log("Token no pillado correctamente"))

    fetch("https://localhost:7053/Recibo/recibos",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach((recibo:any) => {
          recibo._fecRecibo = new Date(recibo._fecRecibo).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        recibos.value.splice(0, recibos.value.length, ...data)
      })
      .catch(error => console.log(error))
  }

  return { recibos, findByUser }
}, {persist: true})
