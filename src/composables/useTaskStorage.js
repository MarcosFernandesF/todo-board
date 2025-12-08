import { watch, onMounted } from 'vue';
import { STORAGE_KEYS } from '../constants/TaskConstants';

/**
 * Manages the persistence layer (LocalStorage) for the task lists.
 * @param {Array} todoRef - Ref reference for Todo items
 * @param {Array} doneRef - Ref reference for Done items
 */
export function useTaskStorage(todoRef, doneRef) {

  /**
   * Loads data from LocalStorage and hydrates the refs.
   */
  const loadFromStorage = () => {
    const storedTodo = localStorage.getItem(STORAGE_KEYS.TODO);
    const storedDone = localStorage.getItem(STORAGE_KEYS.DONE);

    if (storedTodo) todoRef.value = JSON.parse(storedTodo);
    if (storedDone) doneRef.value = JSON.parse(storedDone);
  };

  /**
   * Sets up a deep watcher to auto-save changes to LocalStorage.
   */
  const setupAutoSave = () => {
    watch([todoRef, doneRef], () => {
      localStorage.setItem(STORAGE_KEYS.TODO, JSON.stringify(todoRef.value));
      localStorage.setItem(STORAGE_KEYS.DONE, JSON.stringify(doneRef.value));
    }, { deep: true });
  };

  onMounted(() => {
    loadFromStorage();
    setupAutoSave();
  });
}