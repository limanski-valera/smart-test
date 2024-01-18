import axios from 'axios'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUsersStore = defineStore('users', () => {
  const usersList = ref([])
  const filterValue = ref(null)
  const isLoading = ref(false)

  const getUsersList = computed(() => usersList?.value)
  const getUserById = computed(
    () => (userId) => usersList?.value?.find((user) => user.id == userId)
  )
  const getFilterValue = computed(() => filterValue.value)
  const getFilteredUsersList = computed(() => {
    if (filterValue.value) {
      return usersList.value.filter((user) => {
        let result = false
        for (const key in user) {
          if (String(user[key]).toLowerCase().includes(filterValue.value.toLowerCase())) {
            result = true
          }
        }
        return result
      })
    } else return []
  })

  function startLoading() {
    isLoading.value = true
  }
  function endLoading() {
    isLoading.value = false
  }

  function changeFilterValue(val) {
    filterValue.value = val
  }

  function loadedUsersList() {
    startLoading()
    axios
      .get(`https://reqres.in/api/users`)
      .then((res) => {
        if (res.status === 200) {
          const usersData = res.data.data
          usersList.value.push(...usersData)
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => endLoading())
  }

  function addNewUser(userData) {
    axios
      .post('https://reqres.in/api/users', userData)
      .then((res) => {
        if (res.status === 201) {
          const userData = res.data
          usersList.value.push(userData)
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.log(err))
  }

  function updateUser(userData) {
    axios
      .patch(`https://reqres.in/api/users/${userData.id}`, userData)
      .then((res) => {
        if (res.status === 200) {
          const newUser = res.data
          const userIndex = usersList.value.findIndex((user) => user.id === newUser.id)
          usersList.value[userIndex] = newUser
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.log(err))
  }
  function deleteUser(userId) {
    axios
      .delete(`https://reqres.in/api/users/${userId}`)
      .then((res) => {
        if (res.status === 204) {
          usersList.value = usersList.value.filter((user) => user.id !== userId)
        } else {
          console.log(res)
        }
      })
      .catch((err) => console.log(err))
  }

  function loadUserByUserId(userId) {
    axios
      .get(`https://reqres.in/api/users/${userId}`)
      .then((res) => {
        let userData = res.data.data
        currentUser.value = JSON.parse(JSON.stringify(userData))
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    isLoading,
    getUsersList,
    getUserById,
    getFilterValue,
    getFilteredUsersList,
    addNewUser,
    updateUser,
    deleteUser,
    loadedUsersList,
    loadUserByUserId,
    changeFilterValue
  }
})
