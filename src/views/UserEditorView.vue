<template>
  <main-masterpage>
    <template #title>Let`s add new user</template>
    <div class="wrapper">
      <user-creator class="form" :user-id="userId" />
      <router-link :to="{ name: 'home' }" class="link">Back to users</router-link>
    </div>
  </main-masterpage>
</template>

<script setup>
import MainMasterpage from '../masterpages/MainMasterpage.vue'
import UserCreator from '@/components/UserCreator.vue'
import { computed } from 'vue'

const props = defineProps({
  userId: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
.form {
  margin: 0 auto;
  width: 100%;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}
.link {
  text-align: center;
  align-self: center;
  text-decoration: underline;
}
</style>
