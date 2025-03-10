import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import LoginDTO from './DTO/LoginDTO'
import RegistroDTO from './DTO/RegistroDTO'
import UsuarioDTO from './DTO/UsuarioDTO'

export const useJWTStore = defineStore('jwt', () => {
  var jwt = ref('')
  var usuario = ref(new UsuarioDTO(0,"","", "", "", "", new Date(), ""))

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
        getUser()
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
        getUser()
      })
      .catch(error => console.log(error))
  }
  function getUser() {

    let token = jwt.value
    console.log(`Token guardado: ${token}`)
    fetch("https://localhost:7053/Usuario/Auth",
      { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        Object.assign(usuario.value, data)
        usuario.value._token = token;
        usuario.value._fecNacimiento = data._fecNacimiento.split('T')[0]
      })
      .catch(error => console.log(error))
  }
  function logOut() {
    usuario.value = new UsuarioDTO(0,"","", "", "", "", new Date(), "")
    jwt.value = ""
  }
  function putUser() {
    let token = jwt.value
    fetch(`https://localhost:7053/Usuario/${usuario.value._idUsuario}`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(
          {
            _nombre: usuario.value._nombre,
            _apellido: usuario.value._apellido,
            _correo: usuario.value._correo,
            _contrasena: usuario.value._contrasena,
            _dni: usuario.value._dni,
            _fecNacimiento: usuario.value._fecNacimiento
          }
        )
      }
    )
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => console.error(error))
  }

  return { jwt, usuario, loginUser, registerUser, getUser, logOut, putUser }
}, { persist: true })
