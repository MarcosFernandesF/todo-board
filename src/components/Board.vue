<template>
  <header class="board-header">
      <h1>TODO-BOARD</h1>
  </header>

  <main class="main-container">
    <NewTaskInput 
      class="task-input-container"
      placeholder="Type the title of your task..."
      @task-creation="createNewTask"
    />

    <div class="board-columns">
      <section class="board-column-wrapper">
        <BoardColumn 
          title="To Do"
          :has-tasks="hasTodoTasks"
          @task-dropped="onTaskDrop($event, TASK_STATUS.TODO)"
        >
          <TaskCard 
            v-for="item in todoList" 
            :key="item.id" 
            :task="item"
            @task-deletion="deleteTask"
          />
        </BoardColumn>
      </section>
      
      <section class="board-column-wrapper">
        <BoardColumn 
          title="Done"
          :has-tasks="hasDoneTasks"
          @task-dropped="onTaskDrop($event, TASK_STATUS.DONE)"
        >
          <TaskCard 
            v-for="item in doneList" 
            :key="item.id" 
            :task="item"
            @task-deletion="deleteTask"
          />
        </BoardColumn>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue';
import NewTaskInput from './NewTaskInput.vue';
import { STORAGE_KEYS, TASK_STATUS } from '@/constants/TaskConstants';

const boardsItems = ref([]);

onMounted(() => {
  const storedString = localStorage.getItem(STORAGE_KEYS.BOARDS_ITEMS);
  boardsItems.value = storedString ? JSON.parse(storedString) : [];
});

const todoList = computed(() => boardsItems.value.filter((item) => item.status === TASK_STATUS.TODO));
const doneList = computed(() => boardsItems.value.filter((item) => item.status === TASK_STATUS.DONE));

const hasTodoTasks = computed(() => todoList.value.length > 0);
const hasDoneTasks = computed(() => doneList.value.length > 0);

const saveItemsOnLocalStorage = () => {
  localStorage.setItem(STORAGE_KEYS.BOARDS_ITEMS, JSON.stringify(boardsItems.value));
};

const createNewTask = (newTask) => {
  boardsItems.value.unshift(newTask);
  saveItemsOnLocalStorage();
};

const deleteTask = (task) => {
  if (confirm(`Are you sure that you want to delete "${task.title}"?`)) {
    boardsItems.value = boardsItems.value.filter((item) => item.id !== task.id);
    saveItemsOnLocalStorage(); // Não esqueça de salvar após deletar!
  }
};

const onTaskDrop = ({ taskID, originStatus }, targetStatus) => {
  if (originStatus === targetStatus) return;

  const taskToMove = boardsItems.value.find((item) => item.id === Number(taskID));

  if (taskToMove) {
    taskToMove.status = targetStatus;
    saveItemsOnLocalStorage();
  }
};
</script>

<style scoped>
.board-header {
  background-color: #005cbf;
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
  padding: 20px;
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.main-container {
  max-width: 1000px;
  margin: 0 auto;
}

.task-input-container {
  margin-bottom: 30px;
}

.board-columns {
  display: flex;
  gap: 30px;
}

.board-column-wrapper {
  flex: 1;
  min-width: 300px;
}
</style>