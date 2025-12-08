<template>
  <header>
    <h1>TODO-BOARD</h1>
  </header>

  <NewTaskInput 
    class="task-input-container"
    :options="statusOptions"
    placeholder="Type the title of your task..."
  />

  <main class="board-columns">
    <section class="board-column">
      <BoardColumn title="To Do">
        <TaskCard 
          v-for="item in mockTodo" 
          :key="item.id" 
          :task="item" 
        />
      </BoardColumn>
    </section>
    <section>
      <BoardColumn title="Done">
        <TaskCard 
          v-for="item in mockDone" 
          :key="item.id" 
          :task="item" 
        />
      </BoardColumn>
    </section>
  </main>
</template>

<script setup>
import BoardColumn from './BoardColumn.vue';
import TaskCard from './TaskCard.vue'
import NewTaskInput from './NewTaskInput.vue';

const statusOptions = [
  { value: 'todo', label: 'To Do' },
  { value: 'done', label: 'Done' },
]

const mockTodo = [
  { id: 1, title: 'Item 1' },
  { id: 2, title: 'Item 2' },
  { id: 3, title: 'Item 3' }
]

const mockDone = [
  { id: 4, title: 'Item 4' },
  { id: 5, title: 'Item 5' }
]
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