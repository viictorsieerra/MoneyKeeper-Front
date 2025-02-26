import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import LoginDTO from './DTO/LoginDTO'

export const useJWTStore = defineStore('jwt', () => {
  var token = ref('')
  function LoginUser(loginUser: LoginDTO) {
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
        token.value = data
        console.log(`Token: ${token}`)
      })
      .catch(error => console.log(error))
  }
  return { token, LoginUser }
})
