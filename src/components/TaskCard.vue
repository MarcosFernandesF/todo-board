<template>
  <li 
    class="task-card"
    draggable="true"
    @dragstart="onDragStart"
  >
    <p>Title: {{ task.title }}</p>
    <p>CreatedAt: {{ task.createdAt }}</p>
  </li>
</template>

<script setup>
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const onDragStart = (event) => {
  event.dataTransfer.effectAllowed = 'move';
  event.dataTransfer.dropEffect = 'move';
  
  event.dataTransfer.setData('taskID', props.task.id);
  event.dataTransfer.setData('originStatus', props.task.status);
}
</script>

<style scoped>
.task-card {
  border-radius: 4px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  list-style: none;
  padding: 10px;
  margin-bottom: 8px;
  cursor: grab;
}

.task-card:active {
  cursor: grabbing;
}
</style>