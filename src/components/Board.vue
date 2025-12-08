<template>
  <header>
    <h1>TODO-BOARD</h1>
  </header>

  <NewTaskInput 
    class="task-input-container"
    :options="statusOptions"
    placeholder="Type the title of your task..."
    @task-creation="CreateNewTask"
  />

  <main class="board-columns">
    <section class="board-column">
      <BoardColumn title="To Do">
        <TaskCard 
          v-for="item in todoItems" 
          :key="item.id" 
          :task="item" 
        />
      </BoardColumn>
    </section>
    <section>
      <BoardColumn title="Done">
        <TaskCard 
          v-for="item in doneItems" 
          :key="item.id" 
          :task="item" 
        />
      </BoardColumn>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue'
import NewTaskInput from './NewTaskInput.vue';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'done', label: 'Done' },
]

const todoItems = ref([]);
const doneItems = ref([]);

const CreateNewTask = (newTask) => {
  newTask.status === "todo" ? todoItems.value.push(newTask) : doneItems.value.push(newTask);
}


</script>

<style scoped>
header {
  text-align: center;
  margin-bottom: 20px;
}

.board-columns {
  display: flex;
  gap: 50px;
  justify-content: center;
  padding: 20px;
}
</style>