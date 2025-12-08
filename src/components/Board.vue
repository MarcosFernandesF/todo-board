<template>
  <header>
    <h1>TODO-BOARD</h1>
  </header>

  <NewTaskInput 
    class="task-input-container"
    placeholder="Type the title of your task..."
    @task-creation="createNewTask"
  />

  <main class="board-columns">
    <section class="board-column">
      <BoardColumn title="To Do" @task-dropped="onTaskDrop($event, TASK_STATUS.TODO)">
        <TaskCard 
          v-for="item in todoListSorted" 
          :key="item.id" 
          :task="item"
          @task-deletion="deleteTask"
        />
      </BoardColumn>
    </section>
    <section>
      <BoardColumn title="Done" @task-dropped="onTaskDrop($event, TASK_STATUS.DONE)">
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
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue';
import NewTaskInput from './NewTaskInput.vue';

import { useTaskBoard } from '@/composables/useTaskBoard';
import { TASK_STATUS } from '@/constants/TaskConstants';

const { 
  todoListSorted, 
  doneListSorted, 
  createNewTask, 
  deleteTask, 
  onTaskDrop, 
} = useTaskBoard();
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