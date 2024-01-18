<template>
  <div class="creator">
    <form class="form" @submit.prevent="onNewUserFormSubmit">
      <custom-input label="First Name" v-model="newUserObj.first_name" />
      <custom-input label="Last Name" v-model="newUserObj.last_name" />
      <custom-input label="User Email" v-model="newUserObj.email" />
      <template v-if="userId">
        <custom-input label="Phone Number" type="tel" v-model="newUserObj.phone" />
        <custom-input label="User Address" v-model="newUserObj.address" />
      </template>
      <button class="button" type="submit">{{ buttonText }}</button>
      <span v-if="isError" class="error">{{ errorMessage }}</span>
    </form>
  </div>
</template>

<script setup>
import CustomInput from '@/components/UI/CustomInput.vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { isEmail } from '@/helpers/helpers.js'
import { useUsersStore } from '@/stores/users.js'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()

const usersStore = useUsersStore()
const { getUserById } = storeToRefs(usersStore)

const props = defineProps({
  userId: {
    type: String,
    default: ''
  }
})

const errorMessage = computed(() => {
  let message = null
  if (!newUserObj.value.first_name) {
    message = 'Entry First Name'
  } else if (!newUserObj.value.last_name) {
    message = 'Entry Last Name'
  } else if (!newUserObj.value.email) {
    message = 'Entry Email'
  } else if (newUserObj.value.email && !isEmail(newUserObj.value.email)) {
    message = 'Email not valid'
  }
  return message
})

const isError = ref(false)

const buttonText = computed(() => (props.userId ? 'Save Changes' : 'Create'))

const newUserObj = ref({})

const isFormCorrect = computed(() => {
  return (
    newUserObj.value.first_name && newUserObj.value.last_name && isEmail(newUserObj.value.email)
  )
})

function onNewUserFormSubmit() {
  if (isFormCorrect.value) {
    const userObj = { ...newUserObj.value }
    if (props.userId) {
      usersStore.updateUser(userObj)
    } else {
      usersStore.addNewUser(userObj)
    }
    for (const key in newUserObj.value) {
      newUserObj.value[key] = null
    }
    router.push({ name: 'home' })
  } else {
    isError.value = true
  }
}

watch(
  () => newUserObj.value,
  () => {
    isError.value = false
  },
  {
    deep: true
  }
)

onBeforeMount(() => {
  if (props.userId) {
    newUserObj.value = { ...getUserById.value(props.userId) }
      ? { ...getUserById.value(props.userId) }
      : {}
  }
})
</script>

<style lang="scss" scoped>
.creator {
  max-width: 700px;
  margin: 0 auto;
}
.form {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.error {
  color: #d01c1f;
  text-align: center;
}
</style>
