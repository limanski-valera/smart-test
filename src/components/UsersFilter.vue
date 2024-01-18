<template>
  <div class="filter">
    <custom-input v-model="filterData" placeholder="Find Users" />
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useUsersStore } from '../stores/users'
import CustomInput from './UI/CustomInput.vue'

const usersStore = useUsersStore()
const { getFilterValue } = storeToRefs(usersStore)

const filterData = computed({
  get() {
    return getFilterValue.value
  },
  set(val) {
    usersStore.changeFilterValue(val)
  }
})
</script>

<style lang="scss" scoped>
.filter {
  max-width: 400px;
}
</style>
