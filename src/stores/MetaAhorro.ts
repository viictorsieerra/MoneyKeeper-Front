import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'
import type MetaAhorroDTO from './DTO/MetaAhorroDTO'


export const useMetaAhorroStore = defineStore('metaAhorro', () => {
  const metas = ref(new Array<MetaAhorroDTO>())
  const jwtStore = useJWTStore()

  function findByUser() {
    const strToken = jwtStore.jwt

    if (strToken) {
      fetch("https://localhost:7053/api/MetaAhorro/metas", {
        headers: { 'Authorization': `Bearer ${strToken}` }
      })
        .then(res => res.json())
        .then(data => {
          data.forEach((meta: any) => {
            meta._fechaCreacionMeta =meta._fechaCreacionMeta.split('T')[0]
            meta._fechaObjetivoMeta = meta._fechaObjetivoMeta.split('T')[0]
          })
          console.log(data)
          metas.value.splice(0, metas.value.length, ...data)
        })
        .catch(error => console.error('Error al obtener las metas:', error))
    } else {
      console.error("Token no encontrado")
    }
  }

  function addMetaAhorro(metaData: MetaAhorroDTO) {

    const strToken = jwtStore.jwt

    metaData._idUsuario = jwtStore.usuario._idUsuario

    fetch("https://localhost:7053/api/MetaAhorro", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${strToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metaData)
    }).then(res => {
      findByUser()
    })
      .catch(er => console.error("Error creando la meta " + er))
  }

  function deleteMetaAhorro(idMeta: number | undefined) {
    const strToken = jwtStore.jwt;
    fetch(`https://localhost:7053/api/MetaAhorro/${idMeta}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${strToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 204) {
          console.log(`Meta con id ${idMeta} eliminada correctamente.`);
          findByUser()
        }
      })
  }

  function UpdateMetaAhorro(updatedMeta: MetaAhorroDTO) {
    const strToken = jwtStore.jwt;
    updatedMeta._idUsuario = jwtStore.usuario._idUsuario
    // updatedMeta._fechaCreacionMeta = new Date(updatedMeta._fechaCreacionMeta);
    console.log("META A EDITAR ", updatedMeta)
    fetch(`https://localhost:7053/api/MetaAhorro/${updatedMeta._idMeta}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${strToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMeta)
    }).then(res => {
      findByUser()
    })
      .catch(er => console.error("Error creando la meta " + er))
  }

  return { metas, findByUser, addMetaAhorro, deleteMetaAhorro, UpdateMetaAhorro }
})
