import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useReciboStore = defineStore('recibo', () => {

  const recibos = ref(new Array())
  const jwtStore = useJWTStore()
  console.log(jwtStore)

  function findByUser() {
    console.log("DDD " + jwtStore.jwt)
    const strToken = jwtStore.jwt
    recibos.value = []

    if (strToken != "") {
      console.log("PRUEBA" + jwtStore.jwt)
    } else {
      console.log("Token no pillado correctamente")
    }

    fetch("https://localhost:7053/Recibo/recibos", {
      headers: { 'Authorization': `Bearer ${strToken}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach((recibo: any) => {
          recibo._fecRecibo = new Date(recibo._fecRecibo).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        });
        recibos.value.splice(0, recibos.value.length, ...data)
      })
      .catch(error => console.log(error))
  }

  const createRecibo = async (nuevoRecibo: { _idCuenta: number, _nombreRecibo: string, _dineroRecibo: number, _activa: boolean, _fecRecibo: string }) => {
    const strToken = jwtStore.jwt
    console.log(nuevoRecibo)
    try {
      const response = await fetch('https://localhost:7053/Recibo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _idCuenta: nuevoRecibo._idCuenta,
          _idUsuario: jwtStore.usuario._idUsuario,
          _nombreRecibo: nuevoRecibo._nombreRecibo,
          _dineroRecibo: nuevoRecibo._dineroRecibo,
          _activa: nuevoRecibo._activa,
          _fecRecibo: nuevoRecibo._fecRecibo
        })
      })

      if (!response.ok) {
        throw new Error('Error al crear el recibo')
      }

      const data = await response.json()
      recibos.value.push(data)
      findByUser()
    } catch (error) {
      console.error('Error al crear el recibo:', error)
      throw error
    }
  }

  const deleteRecibo = async (idRecibo: number) => {
    const strToken = jwtStore.jwt;
    try {
   
      const response = await fetch(`https://localhost:7053/Recibo/${idRecibo}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${strToken}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el recibo');
      }

    
      recibos.value = recibos.value.filter((recibo: any) => recibo._idRecibo !== idRecibo);
    } catch (error) {
      console.error('Error al eliminar el recibo:', error);
      throw error;
    }
  }

  return { recibos, findByUser, createRecibo, deleteRecibo }
}, { persist: true })
