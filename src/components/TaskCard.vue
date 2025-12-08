<template>
  <li 
    class="task-card"
    draggable="true"
    @dragstart="onDragStart"
    aria-roledescription="draggable card"
  >
    <div class="card-header">
      <span class="task-title">{{ task.title }}</span>
      
      <button 
        class="delete-btn" 
        @click="$emit('task-deletion', task)"
        :aria-label="`Delete task: ${task.title}`"
      >
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
  background-color: #fff;
  border: 1px solid #e8ecef;
  border-radius: 4px;
  padding: 12px 15px;
  margin-bottom: 12px;
  cursor: grab;
  list-style: none;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

.task-card:active {
  cursor: grabbing;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  border-color: #005cbf;
}

.task-card:hover {
  box-shadow: 0 2px 5px rgba(0,0,0,0.12);
  border-color: #cfd7df;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 10px;
}

.task-title {
  font-weight: 600;
  color: #2c3e50;
  font-size: 1rem;
  line-height: 1.4;
  word-break: break-word;
}

.task-date {
  display: block;
  color: #95a5a6;
  font-size: 0.75rem;
  margin-top: 8px;
}

.delete-btn {
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.4rem;
  line-height: 0.8;
  cursor: pointer;
  padding: 0 0 4px 4px;
  opacity: 0.5;
}

.delete-btn:hover {
  opacity: 1;
  color: #c0392b;
}
</style>