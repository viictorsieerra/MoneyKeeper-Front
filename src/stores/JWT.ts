import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import LoginDTO from './DTO/LoginDTO'
import RegistroDTO from './DTO/RegistroDTO'

export const useJWTStore = defineStore('jwt', () => {
  var jwt = ref('')
  
  function loginUser(loginUser: LoginDTO) {
    console.log(loginUser._contrasena)
    fetch("https://localhost:7053/JWT/Login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          _correo: loginUser._correo,
          _contrasena: loginUser._contrasena
        }
      )
    })
      .then(res => res.text())
      .then(data => {
        console.log(data)
        jwt.value = data
        console.log(`Token: ${jwt}`)
      })
      .catch(error => console.log(error))
  }

  function registerUser(registroUser: RegistroDTO) {
    fetch("https://localhost:7053/JWT/Register", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
          _idUsuario: 0,
          _nombre: registroUser._nombre,
          _apellido: registroUser._apellido,
          _correo: registroUser._correo,
          _contrasena: registroUser._contrasena,
          _dni: registroUser._dni,
          _fecNacimiento: registroUser._fecNacimiento
        }
      )
    })
      .then(res => res.text())
      .then(data => {
        console.log(data)
        jwt.value = data
        console.log(`Token: ${jwt}`)
      })
      .catch(error => console.log(error))
  }

  return { jwt, loginUser, registerUser }
}, {persist: true})
