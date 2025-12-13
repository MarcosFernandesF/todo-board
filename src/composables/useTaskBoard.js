import { ref, computed, onMounted } from 'vue';
import { STORAGE_KEYS, TASK_STATUS } from '../constants/TaskConstants';

/**
 * Encapsulates the core business logic for the Board.
 * Handles state management, sorting, and task operations (CRUD + Move).
 * * @returns {Object} Public API for the Board Component
 */
export function useTaskBoard() {

  // Single source of truth
  const boardsItems = ref([]);

  onMounted(() => {
    boardsItems.value = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOARDS_ITEMS)) || [];
  });

  const todoList = computed(() => boardsItems.value.filter((item) => item.status === TASK_STATUS.TODO));
  const doneList = computed(() => boardsItems.value.filter((item) => item.status === TASK_STATUS.DONE));

  /**
   * Creates a new task and adds it to the appropriate list.
   * @param {Object} newTask 
   */
  const createNewTask = (newTask) => {
    boardsItems.value.unshift(newTask);
    localStorage.setItem(STORAGE_KEYS.BOARDS_ITEMS, JSON.stringify(boardsItems.value));
  };

  /**
   * Deletes a task permanently after confirmation.
   * @param {Object} task 
   */
  const deleteTask = (task) => {
    if (confirm(`Are you sure that you want to delete "${task.title}"?`)) {
      boardsItems.value = boardsItems.value.filter((item) => item.id !== task.id);
    }
  };

  /**
   * Handles the logic when a task is dropped into a new column.
   * Moves the task from origin to target list.
   * @param {Object} dropData - Contains { taskID, originStatus }
   * @param {string} targetStatus - The status of the column where dropped
   */
  const onTaskDrop = ({ taskID, originStatus }, targetStatus) => {
    if (originStatus === targetStatus) return;

    const taskToMove = boardsItems.value.find((item) => item.id === Number(taskID));

    taskToMove.status = targetStatus;

    localStorage.setItem(STORAGE_KEYS.BOARDS_ITEMS, JSON.stringify(boardsItems.value));
  };

  return {
    todoList,
    doneList,
    createNewTask,
    deleteTask,
    onTaskDrop,
  };
}