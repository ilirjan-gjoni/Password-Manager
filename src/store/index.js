import { createPinia } from 'pinia'
export const pinia = createPinia()
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const usePasswordStore = defineStore('passwords', () => {
  
    const passwords = ref([]);

    function setPasswords(newPasswords) {
    passwords.value = newPasswords;
    }

    function addPassword(password) {
     passwords.value.push(password);
     }

     function removePassword(id) {
    passwords.value = passwords.value.filter(p => p.id !== id);
    }


  return {
  passwords,
  addPassword,
  setPasswords, 
  removePassword

   };

});
