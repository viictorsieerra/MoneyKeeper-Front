import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'
import type PresupuestoDTO from './DTO/PresupuestoDTO'


export const usePresupuestoStore = defineStore('presupuesto', () => {
  const presupuestos = ref(new Array<PresupuestoDTO>())
  const jwtStore = useJWTStore()

  function findByUser() {
    const strToken = jwtStore.jwt;
    presupuestos.value = [];
    if (strToken) {
        fetch("https://localhost:7053/api/Presupuesto/presupuestos", {
            headers: { 'Authorization': `Bearer ${strToken}` }
        })
        .then(res => res.json())
        .then(data => {
          data.forEach(item => {
            if(item._limite-100 < item._dineroActual)
              {
                alert(`CUIDADO: ${item._nombrePresupuesto} está cerca de superar el limite`)
              }
          })
            presupuestos.value.splice(0, presupuestos.value.length, ...data);
            console.log(presupuestos.value)
            if(data._limite-100 < data._dineroActual)
            {
              alert(`CUIDADO: ${data._nombre} está cerca de superar el limite`)
            }
        })
        .catch(error => console.error('Error al obtener los presupuestos:', error));
    } else {
        console.error("Token no encontrado");
    }
  }

function addPresupuesto(presupuestoData: PresupuestoDTO) {

    const strToken = jwtStore.jwt;

    presupuestoData._idUsuario = jwtStore.usuario._idUsuario;

    fetch("https://localhost:7053/api/Presupuesto", {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${strToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(presupuestoData)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Error al crear el presupuesto`);
            findByUser()
        }
        return res.json();
    })
    .then(() => {
        findByUser();
    })
    .catch(error => console.error("Error creando el presupuesto: ", error));
}


  function deletePresupuesto(idPresupuesto: number | undefined) {
    const strToken = jwtStore.jwt;
    fetch(`https://localhost:7053/api/Presupuesto/${idPresupuesto	}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${strToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 204) {
          console.log(`Meta con id ${idPresupuesto} eliminada correctamente.`);
          findByUser()
          window.location.reload()
        }
      })
  }
  

  function updatePresupuesto(updatedPresupuesto: PresupuestoDTO) {
    if(updatedPresupuesto._dineroActual > updatedPresupuesto._limite)
    {
      alert("SE SUPERA EL LIMITE")
      return console.error("ERROR");
      
    }
    const strToken = jwtStore.jwt;
    updatedPresupuesto._idUsuario = jwtStore.usuario._idUsuario
    console.log("PRESUPUESTO A ACTUALIZAR: ", updatedPresupuesto)
    // updatedPresupuesto._fechaCreacionMeta = new Date(updatedPresupuesto._fechaCreacionMeta);
    console.log("META A EDITAR ", updatedPresupuesto)
    fetch(`https://localhost:7053/api/Presupuesto/${updatedPresupuesto._idPresupuesto}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${strToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPresupuesto)
    }).then(res => {
      findByUser()
    })
      .catch(er => console.error("Error creando la meta " + er))
  }

  return { presupuestos, findByUser, addPresupuesto, deletePresupuesto, updatePresupuesto}
})
