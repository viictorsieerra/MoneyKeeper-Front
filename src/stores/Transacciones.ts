import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useTransaccionStore = defineStore('transaccion', () => {
  const store = useJWTStore()
  const strToken = computed(() => store.token).value
  const transacciones = ref(new Array())
  function findByUser() {
    console.log("PRUEBA" + strToken)
    fetch("https://localhost:7053/Transaccion/transacciones",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(transaccion => {
          transaccion._fecTransaccion = new Date(transaccion._fecTransaccion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        transacciones.value.splice(0, transacciones.value.length, ...data)
      })
      .catch(error => console.log(error))
  }
  return { transacciones, findByUser }
})
