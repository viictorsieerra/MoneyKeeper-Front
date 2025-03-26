import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'
import filtradoDTO from '@/stores/DTO/FiltradoDTO'
import TransaccionDTO from './DTO/TransaccionDTO'
import { useRouter } from 'vue-router'

export const useTransaccionStore = defineStore('transaccion', () => {

  var transacciones = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)
  const router = useRouter()
  function findByUser() {
    const strToken = jwtStore.jwt

    transacciones.value = []

    if (strToken != "") {
      console.log("Token: " + jwtStore.jwt)
    }
    else (console.log("Token no pillado correctamente"))

    fetch("https://moneykeeper-api.retocsv.es/api/Transaccion/transacciones",
      { headers: { 'Authorization': `Bearer ${strToken}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach((transaccion: any) => {
          transaccion._fecTransaccion = new Date(transaccion._fecTransaccion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
          transacciones.value.push(transaccion)
        });
        // transacciones.value.splice(0, 1, ...data)
      })
      .catch(error => console.log(error))
  }

  function getTransaccionesFilters(filtrado: filtradoDTO) {
    const token = jwtStore.jwt
    transacciones.value = []
    fetch(`https://moneykeeper-api.retocsv.es/api/Transaccion/filtro?fechaInicio=${filtrado._fechaInicio}&fechaFin=${filtrado._fechaFin}&idCategoria=${filtrado._idCategoria}`,
      { headers: { 'Authorization': `Bearer ${token}` } }
    )
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach((transaccion: any) => {
          transaccion._fecTransaccion = new Date(transaccion._fecTransaccion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
          transacciones.value.push(transaccion)
        });
      })
  }


  function addTransaccion (transaccion : TransaccionDTO)
  {
    const token = jwtStore.jwt
    transaccion._idUsuario = jwtStore.usuario._idUsuario
    console.log("TRANSACCION A AÑADIR: ", transaccion)
    fetch("https://moneykeeper-api.retocsv.es/api/Transaccion", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` },
      body: JSON.stringify(transaccion)
    })
      .then(res => res.text())
      .then(data => {
        router.push("/private/transacciones")
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  function updateTransaccion (transaccion : TransaccionDTO)
  {
    const token = jwtStore.jwt
    transaccion._idUsuario = jwtStore.usuario._idUsuario
    console.log("TRANSACCION A ACTUALIZAR: ", transaccion)
    fetch(`https://moneykeeper-api.retocsv.es/api/Transaccion/${transaccion._idTransaccion}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` },
      body: JSON.stringify(transaccion)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        findByUser()

      })
      .catch(error => console.log(error))
  }
  function deleteTransaccion(id: number)
  {
    const token = jwtStore.jwt
    fetch(`https://moneykeeper-api.retocsv.es/api/Transaccion/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization' : `Bearer ${token}` }
    }).then(res => {
      if(res.status != 204)
      {
        console.log("ERROR AL ELIMINAR LA TRANSACCION: \t" + id)
      }
        findByUser
    })
    .catch(error => console.error(error))
  }

  return { transacciones, findByUser, getTransaccionesFilters, addTransaccion, deleteTransaccion, updateTransaccion }
}, { persist: true })
