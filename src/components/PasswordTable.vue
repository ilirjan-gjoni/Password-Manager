<script setup>
import axios from 'axios';
import { usePasswordStore } from '@/store/index.js'
import { ref } from 'vue';
import { defineProps } from 'vue';
import PasswordForm from '@/components/PasswordForm.vue';
import { computed } from 'vue';

const props = defineProps({
  passwords: {
    type: Array,
    required: true
  }
});


const searchTerm = ref('');

const filteredPasswords = computed(() => {
  return props.passwords.filter(p =>
    p.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.url.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    p.username.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});


const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedPasswords = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPasswords.value.slice(start, end);
});







const selectedPassword = ref(null);

const passwordStore = usePasswordStore();



async function deletePassword(id) {
  //console.log('Delete ID:', id);   testing
   try {
    await axios.delete(
      `${import.meta.env.VITE_SUPABASE_URL}?id=eq.${id}`,
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
        }
      }
    );

     passwordStore.removePassword(id); // ✅ Remove from local store

    console.log('Deleted from Supabase:', id);
  } catch (error) {
    console.error('Failed to delete:', error);
  }
}


function editPassword(item) {
   selectedPassword.value = { ...item }; // make a copy
}

async function handleUpdatePassword(updatedData) {
  try {
    // 1. Send update to Supabase
    await axios.patch(
      `${import.meta.env.VITE_SUPABASE_URL}?id=eq.${updatedData.id}`,
      {
        name: updatedData.name,
        url: updatedData.url,
        username: updatedData.username,
        password: updatedData.password,
      },
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // 2. Update Pinia store
    const index = passwordStore.passwords.findIndex(p => p.id === updatedData.id);
    if (index !== -1) {
      passwordStore.passwords[index] = updatedData;
    }

    // 3. Hide the form
    selectedPassword.value = null;
  } catch (error) {
    console.error('Error updating password:', error);
  }
}

</script>


  
 


<template>
  <div class="mr-[180px]">
    <!-- Page Content Wrapper -->
    <div class="flex justify-center bg-base-10 p-4 pt-4">
      <div class="mx-auto w-full max-w-4xl">

        <!-- Controls: Add New & Search -->
        <div class="mb-4 flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center w-full">
          <router-link to="/add" class="btn btn-primary btn-sm shadow-md w-full sm:w-auto">
            Add New
          </router-link>
          <input
            type="text"
            placeholder="Search passwords…"
            class="input input-bordered input-sm max-w-xs w-full sm:w-auto"
            v-model="searchTerm"
          />
        </div>

        <!-- Responsive Table -->
        <div class="overflow-x-auto rounded-2xl shadow-lg border border-base-300 bg-base-100">
          <table class="table table-fixed w-full text-md sm:text-sm">
            <thead class="bg-base-200 text-base-content">
              <tr>
                <th class="border border-base-300 p-2 w-[22%] min-w-[100px]">🔗 Name</th>
                <th class="border border-base-300 p-2 w-[24%] min-w-[120px]">🌐 Website</th>
                <th class="border border-base-300 p-2 w-[28%] min-w-[90px]">📧 Username</th>
                <th class="border border-base-300 p-2 w-[28%] min-w-[90px]">🔒 Password</th>
                <th class="border border-base-300 p-2 w-[18%] min-w-[80px]" colspan="2">⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in paginatedPasswords"
                :key="item.id"
                class="hover bg-base-100 even:bg-base-200 transition-colors duration-150"
              >
                <td class="border border-base-300 p-2 break-words">{{ item.name }}</td>
                <td
                  class="border border-base-300 p-2 break-all max-w-[130px] truncate"
                  :title="item.url"
                >
                  {{ item.url }}
                </td>
                <td class="border border-base-300 p-2 break-words">{{ item.username }}</td>
                <td class="border border-base-300 p-2">
                  <span class="font-mono tracking-widest break-all">{{ item.password }}</span>
                </td>
                <td class="border border-base-300 p-2">
                  <button class="btn btn-ghost btn-xs" @click="deletePassword(item.id)">
                    🗑️
                  </button>
                </td>
                <td class="border border-base-300 p-2">
                  <label
                    for="edit-modal"
                    class="btn btn-ghost btn-xs"
                    @click="editPassword(item)"
                  >
                    ✏️
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
  
        </div>


        <!-- Pagination Bar -->
<div class="flex justify-end mt-4">
  <div class="join">
    <button
      class="join-item btn btn-sm btn-outline"
      @click="currentPage--"
      :disabled="currentPage === 1"
    >
      &lt;
    </button>
    <span class="join-item btn btn-sm pointer-events-none select-none bg-base-200 border-none">
      Page {{ currentPage }}
    </span>
    <button
      class="join-item btn btn-sm btn-outline"
      @click="currentPage++"
      :disabled="currentPage >= Math.ceil(filteredPasswords.length / itemsPerPage)"
    >
      &gt;
    </button>
  </div>
</div>
       
        <!-- Modal (Edit Form) -->
        <div v-if="selectedPassword">
          <input type="checkbox" id="edit-modal" class="modal-toggle" />
          <div class="modal">
            <div class="modal-box relative">
              <PasswordForm
                :initial-data="selectedPassword"
                @update-password="handleUpdatePassword"
                @cancel-edit="selectedPassword = null"
              />
              <label
                for="edit-modal"
                class="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
 
