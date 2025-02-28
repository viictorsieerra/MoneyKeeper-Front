import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useCuentaBancariaStore = defineStore('cuenta', () => {

  const cuentas = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)
  function findByUser() {

    const strToken = jwtStore.jwt
    
    if (strToken != ""){
    console.log("PRUEBA" + jwtStore.jwt)
    }
    else (console.log("Token no pillado correctamente"))

    fetch("https://localhost:7053/Cuenta/cuentas",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(cuentas => {
          cuentas._fechaCreacion = new Date(cuentas._fechaCreacion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        cuentas.value.splice(0, cuentas.value.length, ...data)
      })
      .catch(error => console.log(error))
  }

  return { cuentas, findByUser }
}, {persist: true})
