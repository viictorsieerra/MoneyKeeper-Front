import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'


export const useMetaAhorroStore = defineStore('metaAhorro', () => {
  const metas = ref(new Array())
  const jwtStore = useJWTStore()  

  function findByUser() {
    const strToken = jwtStore.jwt 

    if (strToken) {
      fetch("https://moneykeeper-api.retocsv.es/MetaAhorro/metas", {
        headers: { 'Authorization': `Bearer ${strToken}` }
      })
        .then(res => res.json())
        .then(data => {
          data.forEach((meta: any) => {
            meta._fechaCreacionMeta = new Date(meta._fechaCreacionMeta).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
          })
          console.log(data)
          metas.value.splice(0, metas.value.length, ...data) 
        })
        .catch(error => console.error('Error al obtener las metas:', error))
    } else {
      console.error("Token no encontrado")
    }
  }

  async function createMetaAhorro(metaData: any) {
    const strToken = jwtStore.jwt
    const usuarioId = jwtStore.usuario._idUsuario  
  
    metaData._idUsuario = usuarioId
  
    try {
      const response = await fetch("https://moneykeeper-api.retocsv.es/MetaAhorro", {
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

  async function deleteMetaAhorro(idMeta: number) {
    const strToken = jwtStore.jwt;
    const index = metas.value.findIndex(meta => meta._idMeta === idMeta); 
    if (index !== -1) {
      metas.value.splice(index, 1); 
    }
  
    if (strToken) {
      try {
        const response = await fetch(`https://moneykeeper-api.retocsv.es/MetaAhorro/${idMeta}`, {
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
  
      

  
        console.log(`Meta con id ${idMeta} eliminada correctamente.`);
      } catch (error) {
        console.error('Error al eliminar la meta de ahorro:', error);
        throw error;
      }
    } else {
      console.error('Token no encontrado');
    }
  }
  
  async function UpdateMetaAhorro(_idMeta: number, updatedMeta: any) {
    const strToken = jwtStore.jwt;
  console.log("META A EDITAR ", updatedMeta)
    if (strToken) {
      try {
        // Aquí añadimos el campo `updatedMetaAhorro` (si es requerido por el backend)
        const metaData = {
          updatedMetaAhorro: updatedMeta.updatedMetaAhorro, // Asegúrate de incluir esto
          _fechaCreacionMeta: updatedMeta._fechaCreacionMeta, // Mantén la fecha (si es necesario)
          // Puedes añadir otros campos que sean necesarios para la actualización
          ...updatedMeta
        };
        console.log('Datos que se enviarán al backend:', metaData);
        const response = await fetch(`https://moneykeeper-api.retocsv.es/${metaData._idMeta}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${strToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(metaData) // Asegúrate de enviar `metaData` que incluye `updatedMetaAhorro` y `_fechaCreacionMeta`
        });
  
        if (!response.ok) {
          const errorData = await response.text();
          console.error(`Error al editar la meta de ahorro: ${errorData}`);
          throw new Error(`Error al editar la meta de ahorro: ${errorData}`);
        }
  
        // Aquí actualizas la meta localmente si la actualización fue exitosa
        const index = metas.value.findIndex(meta => meta._idMeta === _idMeta);
        if (index !== -1) {
          metas.value[index] = { ...metas.value[index], ...updatedMeta };
        }
  
        console.log(`Meta con id ${_idMeta} actualizada correctamente.`);
      } catch (error) {
        console.error('Error al editar la meta de ahorro:', error);
        throw error;
      }
    } else {
      console.error('Token no encontrado');
    }
    const metaData = {
      updatedMetaAhorro: updatedMeta.updatedMetaAhorro, 
      _fechaCreacionMeta: new Date(updatedMeta._fechaCreacionMeta).toISOString(), // Convertir la fecha a formato ISO
      ...updatedMeta // Añadir otros campos si es necesario
    };
  }

  return { metas, findByUser, createMetaAhorro, deleteMetaAhorro, UpdateMetaAhorro}
})
