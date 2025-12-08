<template>
  <li class="task-card">
    {{ task.title }}
  </li>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.task-card {
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  list-style: none;
  padding: 10px;
  margin-bottom: 8px;
}
</style>