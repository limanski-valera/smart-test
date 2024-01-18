<script setup>
import MainMasterpage from '../masterpages/MainMasterpage.vue'
import UsersFilter from '@/components/UsersFilter.vue'
import UsersList from '@/components/UsersList/UsersList.vue'
import { useUsersStore } from '@/stores/users'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const usersStore = useUsersStore()
const { getUsersList, getFilteredUsersList, getFilterValue } = storeToRefs(usersStore)

const isLoading = computed(() => usersStore.isLoading)

const isUsersExists = computed(() => currentUserList?.value?.length)

const currentUserList = computed(() => {
  return getFilterValue.value ? getFilteredUsersList.value : getUsersList.value
})
</script>

<template>
  <main-masterpage>
    <template #title>Users List</template>
    <div class="button-wrapper">
      <router-link class="button" :to="{ name: 'user-editor' }">Add new user</router-link>
    </div>
    <users-filter class="filter" />
    <users-list v-if="isUsersExists" :users-list="currentUserList" />
    <div v-else-if="isLoading">Loading...</div>
    <div v-else>Users not found...</div>
  </main-masterpage>
</template>

<style lang="scss" scoped>
.user-creator {
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.button-wrapper {
  display: flex;
  justify-content: center;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.filter {
  margin: 0 auto;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
