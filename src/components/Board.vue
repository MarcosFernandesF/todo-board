<template>
  <header>
    <h1>TODO-BOARD</h1>
    <button @click="clearStorage">
       Clear Storage
    </button>
  </header>

  <NewTaskInput 
    class="task-input-container"
    :options="statusOptions"
    placeholder="Type the title of your task..."
    @task-creation="createNewTask"
  />

  <main class="board-columns">
    <section class="board-column">
      <BoardColumn title="To Do" @task-dropped="onTaskDrop($event, 'todo')">
        <TaskCard 
          v-for="item in todoListSorted" 
          :key="item.id" 
          :task="item"
          @task-deletion="deleteTask"
        />
      </BoardColumn>
    </section>
    <section>
      <BoardColumn title="Done" @task-dropped="onTaskDrop($event, 'done')">
        <TaskCard 
          v-for="item in doneListSorted" 
          :key="item.id" 
          :task="item"
          @task-deletion="deleteTask"
        />
      </BoardColumn>
    </section>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue'
import NewTaskInput from './NewTaskInput.vue';

const STORAGE_KEY_TODO = 'todo-items';
const STORAGE_KEY_DONE = 'done-items';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'done', label: 'Done' },
]

const todoItems = ref([]);
const doneItems = ref([]);

const listMap = {
  'todo': todoItems,
  'done': doneItems
};

const todoListSorted = computed(() => {
  return [...todoItems.value].sort((a, b) => b.id - a.id);
});

const doneListSorted = computed(() => {
  return [...doneItems.value].sort((a, b) => b.id - a.id);
});

watch([todoItems, doneItems], () => {
  localStorage.setItem(STORAGE_KEY_TODO, JSON.stringify(todoItems.value));
  localStorage.setItem(STORAGE_KEY_DONE, JSON.stringify(doneItems.value));
}, { deep: true });

onMounted(() => {
  const storedTodo = localStorage.getItem(STORAGE_KEY_TODO);
  const storedDone = localStorage.getItem(STORAGE_KEY_DONE);

  if (storedTodo) todoItems.value = JSON.parse(storedTodo);
  if (storedDone) doneItems.value = JSON.parse(storedDone);
});

const removeTaskFromList = (status, taskId) => {
  const list = listMap[status];
  if (!list) return null;

  const index = list.value.findIndex(t => t.id === taskId);
  if (index !== -1) {
    return list.value.splice(index, 1)[0];
  }
  return null;
}

const addTaskToList = (status, task) => {
  const list = listMap[status];
  if (list && task) {
    task.status = status;
    list.value.push(task);
  }
}

const createNewTask = (newTask) => {
  addTaskToList(newTask.status, newTask);
}

const deleteTask = (task) => {
  if (confirm(`Are you sure that you want to delete "${task.title}"?`)) {
    removeTaskFromList(task.status, task.id);
  }
}

const onTaskDrop = ({ taskID, originStatus }, targetStatus) => {
  if (originStatus === targetStatus) return;

  const id = Number(taskID);
  const taskToMove = removeTaskFromList(originStatus, id);

  if (taskToMove) {
    addTaskToList(targetStatus, taskToMove);
  }
}

const clearStorage = () => {
    localStorage.removeItem(STORAGE_KEY_TODO);
    localStorage.removeItem(STORAGE_KEY_DONE);
    todoItems.value = [];
    doneItems.value = [];
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