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
      <li v-if="isEmpty" class="empty-state">No tasks here</li>
    </ul>
  </section>
</template>

<script setup>
import { computed, useSlots } from 'vue';

const props = defineProps({
  title: { type: String, required: true }
})

// Generates a secure id (ex: "To Do" -> "todo")
const formattedId = computed(() => props.title.toLowerCase().replace(/\s+/g, '-'));

const slots = useSlots();
const isEmpty = computed(() => !slots.default); 

const emit = defineEmits(['task-dropped'])

const onDrop = (event) => {
  const taskID = event.dataTransfer.getData('taskID');
  const originStatus = event.dataTransfer.getData('originStatus');
  emit('task-dropped', { taskID, originStatus });
}
</script>

<style scoped>
.board-column {
  border: 1px solid grey;
  border-radius: 5px;
  padding: 10px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
}

h2 {
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.column-list {
  padding: 0;
  margin: 0;
  min-height: 100px;
  height: 100%;
}

.empty-state {
    list-style: none;
    color: #888;
    text-align: center;
    padding: 20px 0;
    font-style: italic;
}
</style>