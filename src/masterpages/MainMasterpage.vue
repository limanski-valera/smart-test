<template>
  <main class="wrapper">
    <h1 class="title"><slot name="title"></slot></h1>
    <slot></slot>
  </main>
</template>

<script setup></script>

<style lang="scss" scoped>
.wrapper {
  max-width: 900px;
  margin: 0 auto;
}
.title {
  text-align: center;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
}
</style>
