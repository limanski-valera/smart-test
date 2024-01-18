<template>
  <label class="custom-input">
    <span class="custom-input__label" v-if="label">{{ label }}</span>
    <input :type="type" :placeholder="placeholder" class="custom-input__input" v-model="model" />
  </label>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: null
  },
  modelValue: {
    required: true
  }
})

const emits = defineEmits(['update:modelValue'])

const model = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  }
})
</script>

<style lang="scss" scoped>
.custom-input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  &__label {
  }
  &__input {
    height: 40px;
    padding: 0 15px;
    border: 1px solid rgb(239, 239, 239);
    border-radius: 10px;
    transition: border-color 0.3s;
    &::placeholder {
      transition: opacity .3s;
    }
    &:focus {
      outline: none;
      border-color: #d01c1f;
      &::placeholder {
        opacity: 0;
      }
    }
  }
}
</style>
