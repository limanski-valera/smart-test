<script setup>
import { onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useUsersStore } from './stores/users'

onBeforeMount(() => {
  const usersStore = useUsersStore()
  usersStore.loadedUsersList()
})
</script>

<template>
  <div class="wrapper">
    <RouterView />
  </div>
</template>

<style scoped></style>
