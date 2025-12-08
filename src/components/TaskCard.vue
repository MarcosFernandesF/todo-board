<template>
  <li 
    class="task-card"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="card-header">
      <span class="task-title">{{ task.title }}</span>
      <button class="delete-btn" @click="$emit('task-deletion', task)">
        &times;
      </button>
    </div>
    
    <small class="task-date">{{ task.createdAt }}</small>
  </li>
</template>

<script setup>
defineEmits(['task-deletion'])

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
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  padding: 12px;
  margin-bottom: 10px;
  cursor: grab;
  list-style: none;
}

.task-card:active {
  cursor: grabbing;
}

.task-card:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.task-title {
  font-weight: 600;
  color: #333;
  word-break: break-word;
}

.task-date {
  color: #888;
  font-size: 0.8rem;
}

.delete-btn {
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.delete-btn:hover {
  opacity: 1;
  background-color: rgba(255, 0, 0, 0.1);
  border-radius: 4px;
}
</style>