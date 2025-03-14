import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'
import filtradoDTO from '@/stores/DTO/FiltradoDTO'
import TransaccionDTO from './DTO/TransaccionDTO'

export const useTransaccionStore = defineStore('transaccion', () => {

  var transacciones = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)
  function findByUser() {
    const strToken = jwtStore.jwt

    transacciones.value = []

    if (strToken != "") {
      console.log("Token: " + jwtStore.jwt)
    }
    else (console.log("Token no pillado correctamente"))

    fetch("https://localhost:7053/Transaccion/transacciones",
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
    fetch(`https://localhost:7053/Transaccion/filtro?fechaInicio=${filtrado._fechaInicio}&fechaFin=${filtrado._fechaFin}`,
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
    transaccion._idCategoria = 4
    console.log("TRANSACCION A AÑADIR: ", transaccion)
    fetch("https://localhost:7053/Transaccion", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` },
      body: JSON.stringify(transaccion)
    })
      .then(res => res.text())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
  }

  function deleteTransaccion(id: number)
  {
    const token = jwtStore.jwt
    fetch(`https://localhost:7053/Transaccion/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization' : `Bearer ${token}` }
    }).then(res => {
      if(res.status === 204)
      {
        findByUser()
      }else{
        console.log("ERROR AL ELIMINAR LA TRANSACCION: \t" + id)
      }
    })
    .catch(error => console.error(error))
  }

  function updateTransaccion(transaccion: TransaccionDTO) {
    const token = jwtStore.jwt
    fetch(`https://localhost:7053/Transaccion/${transaccion._idTransaccion}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(transaccion),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log('Transacción actualizada correctamente')
        
          findByUser()
        } else {
          console.log('Error al actualizar la transacción')
        }
      })
      .catch((error) => console.error('Error en la actualización:', error))
  }
  return { transacciones, findByUser, getTransaccionesFilters, addTransaccion, deleteTransaccion, updateTransaccion }
}, { persist: true })