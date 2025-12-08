<template>
  <div class="new-task-container">
    <input 
      type="text" 
      class="task-input" 
      :placeholder="placeholder" 
    />

    <select class="task-select">
      <option 
        v-for="option in options" 
        :key="option.value" 
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <button class="add-button">
      +
    </button>
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: 'Default Placeholder...'
  }
})
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