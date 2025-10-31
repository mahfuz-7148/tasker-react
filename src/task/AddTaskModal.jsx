import { useState } from "react";

export default function AddTaskModal({onSave, taskToUpdate, onCloseClick}) {
    const [task, setTask] = useState(taskToUpdate || {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        tags: [],
        priority: "",
        isFavorite: false,
    });

    const [isAdd, setIsAdd] = useState(Object.is(taskToUpdate, null))

    const handleChange = (evt) => {
        const name = evt.target.name;
        let value = evt.target.value;
        if (name === 'tags') {
            value = value.split(",");
        }
        setTask({
            ...task,
            [name]: value
        })
    }
    return (
      <>
          <div className="bg-gradient-to-br from-black/70 via-indigo-950/50 to-purple-950/50 backdrop-blur-lg h-full w-full z-10 absolute top-0 left-0 animate-in fade-in duration-300"></div>
          <form className="mx-auto my-10 w-full max-w-[740px] rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-slate-900/98 via-indigo-950/98 to-purple-950/98 backdrop-blur-2xl shadow-2xl shadow-indigo-500/30 p-9 max-md:px-4 lg:my-20 lg:p-11 z-10 absolute top-1/4 left-1/3 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent rounded-full blur-sm"></div>
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full"></div>

              <h2 className="mb-9 text-center text-2xl font-bold lg:mb-11 lg:text-[28px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-2xl animate-in fade-in slide-in-from-top-3 duration-700">
                  {isAdd ? "✨ Add New Task" : "📝 Edit Task" }
              </h2>

              <div className="space-y-6 text-white lg:space-y-7">
                  <div className="space-y-2 lg:space-y-3 group">
                      <label htmlFor="title" className="text-sm font-semibold text-slate-200 flex items-center gap-2 group-hover:text-blue-300 transition-colors">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-blue-500/50"></span>
                          Title
                      </label>
                      <input
                        className="block w-full rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white placeholder:text-slate-500 hover:border-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:border-blue-500/60 focus:bg-slate-800/80 transition-all duration-300 shadow-inner hover:shadow-blue-500/10"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Enter task title..."
                        value={task.title}
                        onChange={handleChange}
                        required
                      />
                  </div>

                  <div className="space-y-2 lg:space-y-3 group">
                      <label htmlFor="description" className="text-sm font-semibold text-slate-200 flex items-center gap-2 group-hover:text-indigo-300 transition-colors">
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 shadow-lg shadow-indigo-500/50"></span>
                          Description
                      </label>
                      <textarea
                        className="block min-h-[120px] w-full rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white placeholder:text-slate-500 lg:min-h-[180px] hover:border-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/60 focus:bg-slate-800/80 transition-all duration-300 resize-none shadow-inner hover:shadow-indigo-500/10"
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Describe your task in detail..."
                        value={task.description}
                        onChange={handleChange}
                        required
                      ></textarea>
                  </div>

                  <div className="grid-cols-2 gap-x-4 max-md:space-y-6 md:grid lg:gap-x-6">
                      <div className="space-y-2 lg:space-y-3 group">
                          <label htmlFor="tags" className="text-sm font-semibold text-slate-200 flex items-center gap-2 group-hover:text-purple-300 transition-colors">
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 shadow-lg shadow-purple-500/50"></span>
                              Tags
                          </label>
                          <input
                            className="block w-full rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white placeholder:text-slate-500 hover:border-purple-500/40 focus:outline-none focus:ring-2 focus:ring-purple-500/60 focus:border-purple-500/60 focus:bg-slate-800/80 transition-all duration-300 shadow-inner hover:shadow-purple-500/10"
                            type="text"
                            name="tags"
                            id="tags"
                            placeholder="work, urgent, design"
                            value={task.tags}
                            onChange={handleChange}
                            required
                          />
                      </div>

                      <div className="space-y-2 lg:space-y-3 group">
                          <label htmlFor="priority" className="text-sm font-semibold text-slate-200 flex items-center gap-2 group-hover:text-pink-300 transition-colors">
                              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg shadow-pink-500/50"></span>
                              Priority
                          </label>
                          <select
                            className="block w-full cursor-pointer rounded-xl bg-slate-800/60 border border-slate-600/30 px-4 py-3.5 text-white hover:border-pink-500/40 focus:outline-none focus:ring-2 focus:ring-pink-500/60 focus:border-pink-500/60 focus:bg-slate-800/80 transition-all duration-300 shadow-inner hover:shadow-pink-500/10"
                            name="priority"
                            id="priority"
                            value={task.priority}
                            onChange={handleChange}
                            required
                          >
                              <option value="" className="bg-slate-900">Select Priority</option>
                              <option value="Low" className="bg-slate-900">🟢 Low</option>
                              <option value="Medium" className="bg-slate-900">🟡 Medium</option>
                              <option value="High" className="bg-slate-900">🔴 High</option>
                          </select>
                      </div>
                  </div>
              </div>

              <div className="mt-12 flex justify-between gap-4 lg:mt-16">
                  <button
                    type="button"
                    className="rounded-xl bg-gradient-to-r from-red-600 to-rose-700 px-8 py-3.5 text-white font-semibold transition-all duration-300 hover:from-red-700 hover:to-rose-800 hover:shadow-2xl hover:shadow-red-600/50 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-red-500/30"
                    onClick={onCloseClick}
                  >
                      ✕ Close
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 px-8 py-3.5 text-white font-semibold transition-all duration-300 hover:from-cyan-700 hover:via-blue-700 hover:to-indigo-800 hover:shadow-2xl hover:shadow-blue-600/50 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 border border-blue-500/30"
                    onClick={() => onSave(task, isAdd)}
                  >
                      {isAdd ? "✓ Create Task" : "✓ Update Task"}
                  </button>
              </div>
          </form>
      </>
    );
}