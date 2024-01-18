<template>
  <popup-masterpage @close="closePopup">
    <template #title>Your shure?</template>
    <div class="popup__buttons">
      <button class="popup__button button" @click="closePopup">cancel</button>
      <button class="popup__button button button--red" @click="onDelete">delete</button>
    </div>
  </popup-masterpage>
</template>

<script setup>
import PopupMasterpage from '../masterpages/PopupMasterpage.vue'
const emits = defineEmits(['close', 'delete'])

function closePopup() {
  emits('close')
}
function onDelete() {
  emits('delete')
}
</script>

<style lang="scss" scoped>
.popup {
  &__buttons {
    display: flex;
    justify-content: flex-end;
    gap: 20px;
    justify-content: center;
  }
  &__button {
  }
}
</style>
