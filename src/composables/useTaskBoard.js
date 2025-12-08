import { ref, computed } from 'vue';
import { TASK_STATUS } from '../constants/TaskConstants';
import { useTaskStorage } from './useTaskStorage';

/**
 * Encapsulates the core business logic for the Board.
 * Handles state management, sorting, and task operations (CRUD + Move).
 * * @returns {Object} Public API for the Board Component
 */
export function useTaskBoard() {

  // State management
  const todoItems = ref([]);
  const doneItems = ref([]);

  const listMap = {
    [TASK_STATUS.TODO]: todoItems,
    [TASK_STATUS.DONE]: doneItems
  };

  // Persistence
  useTaskStorage(todoItems, doneItems);

  /**
   * Helper to sort tasks by creation date (descending).
   * @param {Array} list 
   * @returns {Array} New sorted array
   */
  const sortByDate = (list) => [...list].sort((a, b) => b.id - a.id);
  const todoListSorted = computed(() => sortByDate(todoItems.value));
  const doneListSorted = computed(() => sortByDate(doneItems.value));

  /**
   * Internal helper to add a task to a specific list.
   * @param {string} status - 'todo' or 'done'
   * @param {Object} task - Task object
   */
  const _addTask = (status, task) => {
    const list = listMap[status];
    if (list) {
      task.status = status;
      list.value.push(task);
    }
  };

  /**
   * Internal helper to remove a task from a specific list by ID.
   * @param {string} status - 'todo' or 'done'
   * @param {number} taskId 
   * @returns {Object|null} The removed task object or null
   */
  const _removeTask = (status, taskId) => {
    const list = listMap[status];
    if (!list) return null;

    const index = list.value.findIndex(t => t.id === taskId);
    if (index !== -1) {
      return list.value.splice(index, 1)[0];
    }
    return null;
  };

  /**
   * Creates a new task and adds it to the appropriate list.
   * @param {Object} newTask 
   */
  const createNewTask = (newTask) => {
    _addTask(newTask.status, newTask);
  };

  /**
   * Deletes a task permanently after confirmation.
   * @param {Object} task 
   */
  const deleteTask = (task) => {
    if (confirm(`Are you sure that you want to delete "${task.title}"?`)) {
      _removeTask(task.status, task.id);
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

    const taskToMove = _removeTask(originStatus, Number(taskID));

    if (taskToMove) {
      _addTask(targetStatus, taskToMove);
    }
  };

  return {
    todoListSorted,
    doneListSorted,
    createNewTask,
    deleteTask,
    onTaskDrop,
  };
}