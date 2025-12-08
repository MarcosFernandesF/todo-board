<template>
  <section 
    class="board-column"
    @dragover.prevent
    @drop="onDrop"
  >
    <h2>{{ title }}</h2>
    <ul class="column-list">
      <slot />
    </ul>
  </section>
</template>

<script setup>
const emit = defineEmits(['task-dropped'])

defineProps({
  title: {
    type: String,
    required: true
  }
})

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
</style>