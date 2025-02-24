import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTransaccionStore = defineStore('transaccion', () => {
  const transacciones = ref(new Array())
  function findByUser() {
    fetch("https://localhost:7053/Transaccion/transacciones",
    {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIzIiwiZW1haWwiOiJqdWFuLnBlcmV6QGVtYWlsLmNvbSIsInJvbGUiOiJDbGllbnRlIiwibmJmIjoxNzQwNDE1MTgyLCJleHAiOjE3NDA1MDE1ODIsImlhdCI6MTc0MDQxNTE4MiwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzA1MyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjcwNTMifQ.BcuUl2t37dmrG_tc8q0iCKlGoWNdIXZjY2wIIiDxp1c'}})
    .then(res => res.json())
    .then(data => {
      console.log(data)
      transacciones.value.push(data)
    })
    .catch(error => console.log(error))
    // fetch()
    // res.json()
    // data
    /*-
    let data = [
        { id: 0, name: 'test', surname: 'test' },
        { id: 1, name: 'test', surname: 'second' }
    ]
    users.value.splice(0, users.value.length, ...data)*/
} 

  return { transacciones, findByUser}
})
