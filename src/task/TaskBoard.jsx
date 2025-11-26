import NoTasksFound from './NoTasksFound.jsx';
import {TaskList} from './TaskList.jsx';
import {TaskActions} from './TaskActions.jsx';
import {SearchTask} from './SearchTask.jsx';
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
    title: "Learn React Native",
    description: "I want to Learn React such that I can treat it like my slave and make it do whatever I want to do.",
    tags: ["web", "react", "js"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Add this

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

  // ✅ Helper function to apply search filter
  function applySearchFilter(tasksList) {
    if (searchTerm.trim() === "") {
      return tasksList;
    }
    return tasksList.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
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
    setTasks(applySearchFilter(updatedTasks)); // ✅ Apply search filter
    handleCloseClick();
  }

  function handleEditTask(task) {
    setTaskToUpdate(task);
    setShowAddModal(true);
  }

  function handleDeleteTask(taskId) {
    const tasksAfterDelete = allTasks.filter((task) => task.id !== taskId);
    setAllTasks(tasksAfterDelete);
    setTasks(applySearchFilter(tasksAfterDelete)); // ✅ Apply search filter
  }

  function handleDeleteAllClick() {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setAllTasks([]);
      setTasks([]);
      setSearchTerm(""); // ✅ Reset search
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
    setTasks(applySearchFilter(updatedTasks)); // ✅ Apply search filter
  }

  function handleSearch(searchValue) {
    setSearchTerm(searchValue); // ✅ Save search term
    if (searchValue.trim() === "") {
      setTasks([...allTasks]);
    } else {
      const filtered = allTasks.filter((task) =>
        task.title.toLowerCase().includes(searchValue.toLowerCase())
      );
      setTasks([...filtered]);
    }
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
        <div className="p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
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