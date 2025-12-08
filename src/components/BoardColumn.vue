<template>
  <section class="board-column">
    <h2>{{ title }}</h2>
    <ul class="column-list">
      <slot />
    </ul>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.board-column {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
}

h2 {
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.column-list {
  padding: 0;
  margin: 0;
}
</style>