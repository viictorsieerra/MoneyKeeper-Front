import { defineStore } from "pinia";
import { ref } from "vue";
import LoginDto from "./DTO/LoginDTO";

export const useUsersStore = defineStore('users', () => {
    const users = ref(new Array<LoginDto>())

    function findAll() {
        // fetch()
        // res.json()
        // data
        /*-
        let data = [
            { id: 0, name: 'test', surname: 'test' },
            { id: 1, name: 'test', surname: 'second' }
        ]
        users.value.splice(0, users.value.length, ...data)*/
    }        
    function createUser(user: LoginDto) {
        // fetch(POST)
        // body: JSON.stringify()

        users.value.push(user)
    }
    function RegisterUser(user: LoginDto) {
        fetch("https://localhost:7053/JWT/")
        // fetch(POST)
        // body: JSON.stringify()

        users.value.push(user)
    }
    function deleteUser() {}
    function updateUser() {}

    return {    
        users,
        findAll, 
        createUser, 
        deleteUser, 
        updateUser 
    }
}) 