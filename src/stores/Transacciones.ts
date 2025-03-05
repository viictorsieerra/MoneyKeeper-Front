import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useTransaccionStore = defineStore('transaccion', () => {

  var transacciones = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)
  function findByUser() {
    const strToken = jwtStore.jwt

    transacciones.value = []
    
    if (strToken != ""){
    console.log("Token: " + jwtStore.jwt)
    }
    else (console.log("Token no pillado correctamente"))

    fetch("https://localhost:7053/Transaccion/transacciones",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(transaccion => {
          transaccion._fecTransaccion = new Date(transaccion._fecTransaccion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
          transacciones.value.push(transaccion)
        });
        // transacciones.value.splice(0, 1, ...data)
      })
      .catch(error => console.log(error))
  }

  return { transacciones, findByUser }
}, {persist: true})
