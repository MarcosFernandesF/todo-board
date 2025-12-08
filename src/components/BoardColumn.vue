<template>
  <section 
    class="board-column"
    @dragover.prevent
    @drop="onDrop"
    :aria-labelledby="`column-header-${formattedId}`"
  >
    <h2 :id="`column-header-${formattedId}`">{{ title }}</h2>
    
    <ul class="column-list" role="list">
      <slot />
      <li v-if="!hasTasks" class="empty-state">No tasks yet</li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  hasTasks: { type: Boolean, default: false }
})

const formattedId = computed(() => props.title.toLowerCase().replace(/\s+/g, '-'));

const emit = defineEmits(['task-dropped'])

const onDrop = (event) => {
  const taskID = event.dataTransfer.getData('taskID');
  const originStatus = event.dataTransfer.getData('originStatus');
  emit('task-dropped', { taskID, originStatus });
}
</script>

<style scoped>
.board-column {
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border: 1px solid #767676; 
  border-top: 4px solid #005cbf; 
  height: 100%;
}

h2 {
  text-align: left;
  margin: 0;
  padding: 15px 20px;
  font-size: 1.1rem;
  color: #005cbf;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
}

.column-list {
  padding: 20px;
  margin: 0;
  min-height: 200px;
  height: 100%;
  box-sizing: border-box;
  background-color: #f8f9fa;
}

.empty-state {
    list-style: none;
    color: #a0a0a0;
    text-align: center;
    padding: 30px 0;
    font-style: italic;
    font-size: 0.9rem;
}
</style>