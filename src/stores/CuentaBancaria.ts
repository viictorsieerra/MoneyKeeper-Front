import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useCuentaBancariaStore = defineStore('Cuenta', () => {
  const store = useJWTStore()
  const strToken = computed(() => store.token).value
  const cuentas = ref(new Array())
  function findByUser() {
    console.log("PRUEBA" + strToken)
    fetch("https://localhost:7053/Cuenta",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(cuenta => {
          cuenta._fechaCreacion = new Date(cuenta._fechaCreacion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        cuentas.value.splice(0, cuentas.value.length, ...data)
      })
      .catch(error => console.log(error))
  }
  return { cuentas, findByUser }
})
