<template>
  <div class="new-task-container">
    <input
      v-model="inputValue"
      type="text" 
      class="task-input" 
      :placeholder="placeholder" 
    />

    <button class="add-button" @click="emitTaskCreation">
      +
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['task-creation'])

defineProps({
  placeholder: {
    type: String,
    default: 'Default Placeholder...'
  }
})

const inputValue = ref('')

const emitTaskCreation = () => {
  if (!inputValue.value.trim()) return;

  const now = new Date();

  emit('task-creation', {
    id: now.getTime(),
    title: inputValue.value,
    status: 'todo',
    createdAt: now.toLocaleString('en-US')
  })

  inputValue.value = ''
}

</script>

<style scoped>
.new-task-container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  max-width: 800px;
  width: 100%;
  margin: 0px auto;
}

.task-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-select {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
}

.add-button {
  padding: 7px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.add-button:hover {
  background-color: #0056b3;
}
</style>