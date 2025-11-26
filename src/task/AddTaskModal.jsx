import {useState} from 'react';

export const AddTaskModal = ({onSave, taskToUpdate, onCloseClick}) => {
  const [task, setTask] = useState(taskToUpdate || {
    id: crypto.randomUUID(),
    title: "",
    description: "",
    tags: [],
    priority: "",
    isFavorite: false,
  });

  const [isAdd] = useState(Object.is(taskToUpdate, null));

  const handleChange = (evt) => {
    const name = evt.target.name;
    let value = evt.target.value;
    if (name === 'tags') {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task, isAdd);
  };

  return (
    <>
      <div className="bg-gradient-to-br from-black/70 via-indigo-950/50 to-purple-950/50 backdrop-blur-lg h-full w-full z-10 absolute top-0 left-0"></div>
      <div className="mx-auto my-10 w-full max-w-[740px] rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900/98 via-indigo-950/98 to-purple-950/98 backdrop-blur-2xl shadow-2xl shadow-indigo-500/30 p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3">
        <h2 className="mb-9 text-center text-2xl font-bold lg:mb-11 lg:text-[28px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          {isAdd ? "✨ Add New Task" : "📝 Edit Task" }
        </h2>

        <div className="space-y-6 text-white lg:space-y-7">
          <div className="space-y-2 lg:space-y-3 group">
            <label htmlFor="title" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"></span>
              Title
            </label>
            <input className="block w-full rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/60" type="text" name="title" id="title" placeholder="Enter task title..." value={task.title} onChange={handleChange} required />
          </div>

          <div className="space-y-2 lg:space-y-3 group">
            <label htmlFor="description" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500"></span>
              Description
            </label>
            <textarea className="block min-h-[120px] w-full rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white placeholder:text-slate-500 lg:min-h-[180px] focus:outline-none focus:ring-2 focus:ring-indigo-500/60 resize-none" name="description" id="description" placeholder="Describe your task..." value={task.description} onChange={handleChange} required></textarea>
          </div>

          <div className="grid-cols-2 gap-x-4 max-md:space-y-6 md:grid lg:gap-x-6">
            <div className="space-y-2 lg:space-y-3 group">
              <label htmlFor="tags" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"></span>
                Tags
              </label>
              <input className="block w-full rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/60" type="text" name="tags" id="tags" placeholder="work, urgent, design" value={task.tags} onChange={handleChange} required />
            </div>

            <div className="space-y-2 lg:space-y-3 group">
              <label htmlFor="priority" className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></span>
                Priority
              </label>
              <select className="block w-full cursor-pointer rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-pink-500/60" name="priority" id="priority" value={task.priority} onChange={handleChange} required>
                <option value="">Select Priority</option>
                <option value="Low">🟢 Low</option>
                <option value="Medium">🟡 Medium</option>
                <option value="High">🔴 High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-between gap-4 lg:mt-16">
          <button type="button" className="rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-8 py-3.5 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95" onClick={onCloseClick}>
            ✕ Close
          </button>
          <button type="button" className="rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 px-8 py-3.5 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5 active:scale-95" onClick={handleSubmit}>
            {isAdd ? "✓ Create Task" : "✓ Update Task"}
          </button>
        </div>
      </div>
    </>
  );
};