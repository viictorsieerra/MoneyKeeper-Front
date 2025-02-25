import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTransaccionStore = defineStore('transaccion', () => {
  const transacciones = ref(new Array())
  function findByUser() {
    fetch("https://localhost:7053/Transaccion/transacciones",
      { headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzIiwiZW1haWwiOiJqdWFuLnBlcmV6QGVtYWlsLmNvbSIsInJvbGUiOiJDbGllbnRlIiwibmJmIjoxNzQwNTA5MTA2LCJleHAiOjE3NDA1OTU1MDYsImlhdCI6MTc0MDUwOTEwNiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwNTMifQ.H9yPd42-_Jb61fgEvCZzuUMzDNI6BHXpG5e8vuYsa5I' } })
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
