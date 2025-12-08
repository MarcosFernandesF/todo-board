<template>
  <div class="new-task-container">
    <input
      v-model="inputValue"
      type="text" 
      class="task-input" 
      :placeholder="placeholder"
      aria-label="Create a new task" 
    />

    <button 
      class="add-button" 
      @click="emitTaskCreation"
      aria-label="Add new task"
    >
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
  gap: 12px;
  background-color: #fff;
  padding: 15px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.task-input {
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #dde2e5;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
  outline: none;
}

.task-input:focus {
  border-color: #005cbf;
}

.add-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  padding: 0;
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1;
}

.add-button:hover {
  background-color: #e65c00;
}
</style>