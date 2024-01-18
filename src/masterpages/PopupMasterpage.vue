<template>
  <div class="popup" @click.self="closePopup">
    <div class="popup__wrapper">
      <button v-if="closeButton" class="popup__close-btn" @click="closePopup"></button>
      <div class="popup__content">
        <h3 class="popup__title"><slot name="title"></slot></h3>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  closeButton: {
    type: Boolean,
    default: false
  }
})
const emits = defineEmits(['close'])

function closePopup() {
  emits('close')
}
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  z-index: 50;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0.5;
  }
  &__wrapper {
    position: relative;
    z-index: 2;
    padding: 30px;
    border-radius: 10px;
    border: 2px solid rgb(239, 239, 239);
    background-color: #fff;
    width: 100%;
    max-width: 500px;
  }
  &__close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      height: 2px;
      width: 100%;
      background-color: #000;
      border-radius: 10px;
    }
    &::before {
      transform: translate(-50%, 0) rotate(45deg);
    }
    &::after {
      transform: translate(-50%, 0) rotate(-45deg);
    }
    &__content {
    }
  }
  &__title {
    font-weight: 700;
    font-size: 24px;
    text-align: center;
    &:not(:last-child) {
      margin-bottom: 30px;
    }
  }
}
</style>
