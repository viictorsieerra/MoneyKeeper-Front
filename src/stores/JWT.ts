import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import LoginDTO from './DTO/LoginDTO'

export const useJWTStore = defineStore('jwt', () => {
  const token = ref('')
  function LoginUser(loginUser : LoginDTO) {
    fetch("https://localhost:7053/JWT/Login", {
        method : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginUser)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
      })
      .catch(error => console.log(error))
  }
  return { token, LoginUser }
})
