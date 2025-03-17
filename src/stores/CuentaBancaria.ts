import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useJWTStore } from '@/stores/JWT'
import type { Cuenta } from './DTO/CuentaBancariaDTO';
export const useCuentaBancariaStore = defineStore('cuenta', () => {

  const cuentas = ref(new Array())
  const jwtStore = useJWTStore()

  function findByUser() {
    const strToken = jwtStore.jwt
    cuentas.value = []

    fetch("https://localhost:7053/api/Cuenta/cuentas", {
      headers: { 'Authorization': `Bearer ${strToken}` }
    })
      .then(res => res.json())
      .then(data => {
        data.forEach((cuenta: any) => {
          cuenta._fechaCreacion = new Date(cuenta._fechaCreacion).toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
        })
        cuentas.value.splice(0, cuentas.value.length, ...data)
      })
      .catch(error => console.log(error))
  }

  async function DeleteById(id: number) {
    const strToken = jwtStore.jwt

    try {
      const response = await fetch(`https://localhost:7053/api/Cuenta/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${strToken}` }
      })

      if (!response.ok) {
        throw new Error('Error al eliminar la cuenta')
      }

      cuentas.value = cuentas.value.filter(cuenta => cuenta._idCuenta !== id)
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error)
      throw error
    }
  }
  const UpdateCuenta = async (cuenta: any) => {
    const strToken = jwtStore.jwt;
    console.log("CUENTA A ENVIAR: ", cuenta);



    try {
      const response = await fetch(`https://localhost:7053/api/Cuenta/${cuenta._idCuenta}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${strToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _idCuenta: cuenta._idCuenta,
          _idUsuario: cuenta._idUsuario,
          _dineroCuenta: cuenta._dineroCuenta,
          _activa: cuenta._activa,
          _fechaCreacion: new Date(cuenta._fechaCreacion).toISOString(),
          _nombreCuenta: cuenta._nombreCuenta
        })
      });

      if (!response.ok) {
        if (response.status === 404) {
          location.reload();
        }
        // throw new Error('Error al actualizar la cuenta');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al actualizar la cuenta:', error);
      throw error;
    }
  };


  const crearCuenta = async (nuevaCuenta: { _nombreCuenta: string, _dineroCuenta: number, _activa: boolean }) => {
    const strToken = jwtStore.jwt
    try {
      const response = await fetch('https://localhost:7053/api/Cuenta', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${strToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          _idUsuario: jwtStore.usuario._idUsuario,
          _nombreCuenta: nuevaCuenta._nombreCuenta,
          _dineroCuenta: nuevaCuenta._dineroCuenta,
          _activa: nuevaCuenta._activa
        })
      })

      if (!response.ok) {
        throw new Error('Error al crear la cuenta')
      }

      const data = await response.json()
      cuentas.value.push(data)
    } catch (error) {
      console.error('Error al crear la cuenta:', error)
      throw error
    }
  }
  return { cuentas, findByUser, DeleteById, UpdateCuenta, crearCuenta };
}, { persist: true });