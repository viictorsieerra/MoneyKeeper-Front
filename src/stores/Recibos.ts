import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'
import ReciboDTO from './DTO/ReciboDTO'
import { useRouter } from 'vue-router'

export const useReciboStore = defineStore('recibo', () => {

  const recibos = ref(new Array())
  const jwtStore = useJWTStore()
  const router = useRouter()
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

    fetch("https://moneykeeper-api.retocsv.es/api/Recibo/recibos", {
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


  function createRecibo (nuevoRecibo: ReciboDTO) {
    const strToken = jwtStore.jwt
    nuevoRecibo._idUsuario = jwtStore.usuario._idUsuario
    console.log(nuevoRecibo)
    try {
      
      fetch('https://moneykeeper-api.retocsv.es/api/Recibo', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoRecibo)
      })
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al crear el recibo')
        }
        router.push("/private/recibos")
      })

    } catch (error) {
      console.error('Error al crear el recibo:', error)
    }
  }


  const deleteRecibo = async (idRecibo: number) => {
    const strToken = jwtStore.jwt;
    try {
   
      const response = await fetch(`https://moneykeeper-api.retocsv.es/api/Recibo/${idRecibo}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${strToken}`,
        }
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el recibo');
      }

    findByUser()
      // recibos.value = recibos.value.filter((recibo: any) => recibo._idRecibo !== idRecibo);
    } catch (error) {
      console.error('Error al eliminar el recibo:', error);
      throw error;
    }
  }

  function updateRecibo (recibo : ReciboDTO)
  {
    const token = jwtStore.jwt
    recibo._idUsuario = jwtStore.usuario._idUsuario
    console.log("RECIBO A ACTUALIZAR: ", recibo)
    fetch(`https://moneykeeper-api.retocsv.es/api/Recibo/${recibo._idRecibo}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${token}` },
      body: JSON.stringify(recibo)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        findByUser()

      })
      .catch(error => console.log(error))
  }

  return { recibos, findByUser, createRecibo, deleteRecibo, updateRecibo }
}, { persist: true })
