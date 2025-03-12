import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'

export const useMetaAhorroStore = defineStore('metaAhorro', () => {
  const metas = ref(new Array())
  const jwtStore = useJWTStore()  

  function findByUser() {
    const strToken = jwtStore.jwt 

    if (strToken) {
      fetch("https://localhost:7053/MetaAhorro/metas", {
        headers: { 'Authorization': `Bearer ${strToken}` }
      })
        .then(res => res.json())
        .then(data => {
          data.forEach((meta: any) => {
            meta._fechaCreacionMeta = new Date(meta._fechaCreacionMeta).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
          })
          metas.value.splice(0, metas.value.length, ...data) 
        })
        .catch(error => console.error('Error al obtener las metas:', error))
    } else {
      console.error("Token no encontrado")
    }
  }

  async function createMetaAhorro(metaData) {
    const strToken = jwtStore.jwt
    const usuarioId = jwtStore.usuario._idUsuario  
  
    metaData._idUsuario = usuarioId
  
    try {
      const response = await fetch("https://localhost:7053/MetaAhorro", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(metaData)
      })
  
      if (!response.ok) {
        const errorData = await response.text() 
        throw new Error(`Error al crear la meta de ahorro: ${errorData}`)
      }
  
      const newMeta = await response.json()
      metas.value.push(newMeta)
    } catch (error) {
      console.error('Error al crear la meta de ahorro:', error)
      throw error
    }
  }

  async function deleteMetaAhorro(metaId: number) {
    const strToken = jwtStore.jwt;
  
    if (strToken) {
      try {
        const response = await fetch(`https://localhost:7053/MetaAhorro/${metaId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${strToken}`,
            'Content-Type': 'application/json'
          }
        });
  
        console.log('Respuesta del backend al eliminar:', response);
  
        if (!response.ok) {
          const errorData = await response.text();
          console.error(`Error al eliminar la meta de ahorro: ${errorData}`);
          throw new Error(`Error al eliminar la meta de ahorro: ${errorData}`);
        }
  
        // ✅ Mostrar mensaje si todo fue bien
        console.log(`Meta con id ${metaId} eliminada correctamente.`);
  
        // Eliminar la meta localmente
        metas.value = metas.value.filter(meta => meta._idMeta !== metaId);
      } catch (error) {
        console.error('Error al eliminar la meta de ahorro:', error);
        throw error;
      }
    } else {
      console.error('Token no encontrado');
    }
  }

  return { metas, findByUser, createMetaAhorro, deleteMetaAhorro }
}, { persist: true })
