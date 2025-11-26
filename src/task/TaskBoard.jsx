import NoTasksFound from './NoTasksFound.jsx';
import {TaskList} from './TaskList.jsx';
import {TaskActions} from './TaskActions.jsx';
import {SearchTask} from './SearchTask.jsx';
import {PriorityFilter} from './PriorityFilter.jsx';
import {TagFilter} from './TagFilter.jsx';
import {AddTaskModal} from './AddTaskModal.jsx';
import {useEffect, useState} from 'react';
import localforage from 'localforage';

// Configure localForage
localforage.config({
  driver: localforage.INDEXEDDB,
  name: 'TaskApp',
  version: 1.0,
  storeName: 'tasks',
  description: 'Task management app with persistence'
});

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false
  };

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  // Load tasks from localForage on mount
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to localForage whenever they change
  useEffect(() => {
    if (!loading) {
      saveTasks(allTasks);
    }
  }, [allTasks, loading]);

  // Apply all filters whenever filter criteria change
  useEffect(() => {
    applyAllFilters();
  }, [searchTerm, selectedPriority, selectedTags, allTasks]);

  async function loadTasks() {
    try {
      const savedTasks = await localforage.getItem('taskList');
      if (savedTasks && savedTasks.length > 0) {
        setTasks(savedTasks);
        setAllTasks(savedTasks);
      } else {
        setTasks([defaultTask]);
        setAllTasks([defaultTask]);
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([defaultTask]);
      setAllTasks([defaultTask]);
    } finally {
      setLoading(false);
    }
  }

  async function saveTasks(tasksToSave) {
    try {
      await localforage.setItem('taskList', tasksToSave);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  }

  // Get all unique tags from all tasks
  function getAvailableTags() {
    const tagSet = new Set();
    allTasks.forEach(task => {
      if (task.tags && Array.isArray(task.tags)) {
        task.tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }

  // Apply all filters (search, priority, tags)
  function applyAllFilters() {
    let filtered = [...allTasks];

    // Apply search filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply priority filter
    if (selectedPriority !== "all") {
      filtered = filtered.filter((task) =>
        task.priority.toLowerCase() === selectedPriority.toLowerCase()
      );
    }

    // Apply tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((task) => {
        if (!task.tags || !Array.isArray(task.tags)) return false;
        return selectedTags.some(selectedTag =>
          task.tags.includes(selectedTag)
        );
      });
    }

    setTasks(filtered);
  }

  function handleAddEditTask(newTask, isAdd) {
    let updatedTasks;
    if (isAdd) {
      updatedTasks = [...allTasks, newTask];
    } else {
      updatedTasks = allTasks.map((task) =>
        task.id === newTask.id ? newTask : task
      );
    }
    setAllTasks(updatedTasks);
    handleCloseClick();
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId) {
    const tasksAfterDelete = allTasks.filter((task) => task.id !== taskId);
    setAllTasks(tasksAfterDelete);
  }

  function handleDeleteAllClick() {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setAllTasks([]);
      setTasks([]);
      setSearchTerm("");
      setSelectedPriority("all");
      setSelectedTags([]);
    }
  }

  function handleFavorite(taskId) {
    const updatedTasks = allTasks.map((task) => {
      if (task.id === taskId) {
        return {...task, isFavorite: !task.isFavorite};
      }
      return task;
    });
    setAllTasks(updatedTasks);
  }

  function handleSearch(searchValue) {
    setSearchTerm(searchValue);
  }

  function handlePriorityChange(priority) {
    setSelectedPriority(priority);
  }

  function handleTagToggle(tag) {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  }

  function handleClearTags() {
    setSelectedTags([]);
  }

  function handleCloseClick() {
    setShowAddModal(false);
    setTaskToUpdate(null);
  }

  if (loading) {
    return (
      <section className="mb-20" id="tasks">
        <div className="container">
          <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-16 text-center">
            <div className="text-xl text-gray-400">Loading tasks...</div>
          </div>
        </div>
      </section>
    );
  }

  const availableTags = getAvailableTags();

  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          onCloseClick={handleCloseClick}
          taskToUpdate={taskToUpdate}
        />
      )}
      <div className="container">
        <div className="p-2 flex justify-end mb-4">
          <SearchTask onSearch={handleSearch} />
        </div>

        <div className="mb-4 space-y-4">
          <PriorityFilter
            selectedPriority={selectedPriority}
            onPriorityChange={handlePriorityChange}
          />

          <TagFilter
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={handleTagToggle}
            onClearTags={handleClearTags}
          />
        </div>

        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setShowAddModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTasksFound />
          )}
        </div>
      </div>
    </section>
  );
}