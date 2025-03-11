import { ref } from 'vue'
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
    } else {
      console.log("Token no pillado correctamente")
    }

    fetch("https://localhost:7053/Cuenta/cuentas", {
      headers: { 'Authorization': `Bearer ${strToken}` }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      data.forEach(cuenta => {
        cuenta._fechaCreacion = new Date(cuenta._fechaCreacion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
      })
      cuentas.value.splice(0, cuentas.value.length, ...data)
    })
    .catch(error => console.log(error))
  }

  async function DeleteById(id: number) {
    const strToken = jwtStore.jwt

    try {
      const response = await fetch(`https://localhost:7053/Cuenta/cuenta/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${strToken}` }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la cuenta')
      }

     
      cuentas.value = cuentas.value.filter(cuenta => cuenta._idCuenta !== id)
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error)
      throw error
    }
  }

  return { cuentas, findByUser, DeleteById }
}, { persist: true })