<template>
  <ul class="users">
    <users-list-item v-for="user in usersList" :key="user.id" :user="user" />
  </ul>
</template>

<script setup>
import UsersListItem from './UsersListItem.vue'

const props = defineProps({
  usersList: {
    type: Array,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.users {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
