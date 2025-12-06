import React from 'react';

const FaStar = ({ className, size }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export const TaskList = ({ tasks, onEdit, onDelete, onFav }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/30 hover:bg-red-500/20 hover:shadow-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20 hover:shadow-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20 hover:shadow-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30 hover:bg-gray-500/20';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300 mb-2">No tasks yet</h3>
        <p className="text-gray-500 text-sm">Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/50 to-indigo-950/50 backdrop-blur-sm">
      <table className="w-full min-w-[900px]">
        <thead>
        <tr className="border-b border-white/10 bg-gradient-to-r from-slate-900/80 via-indigo-950/80 to-purple-950/80">
          <th className="px-4 py-5 w-12">
            <div className="flex items-center justify-center">
              <FaStar className="text-gray-600" size={16} />
            </div>
          </th>
          <th className="px-4 py-5 text-left">
              <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Title
              </span>
          </th>
          <th className="px-4 py-5 text-left">
              <span className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Description
              </span>
          </th>
          <th className="px-4 py-5 text-center">
              <span className="text-sm font-semibold text-gray-300 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Tags
              </span>
          </th>
          <th className="px-4 py-5 text-center">
              <span className="text-sm font-semibold text-gray-300 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                Priority
              </span>
          </th>
          <th className="px-4 py-5 text-center">
              <span className="text-sm font-semibold text-gray-300 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                Actions
              </span>
          </th>
        </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
        {tasks.map((task, index) => (
          <tr
            key={task.id}
            className="group hover:bg-white/5 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
          >
            {/* Favorite Star */}
            <td className="px-4 py-5">
              <div className="flex items-center justify-center">
                <button
                  onClick={() => onFav(task.id)}
                  className="transition-all duration-300 hover:scale-125 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 rounded-lg p-1"
                  aria-label={task.isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {task.isFavorite ? (
                    <FaStar className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)] animate-pulse" size={20} />
                  ) : (
                    <FaStar className="text-gray-600 hover:text-gray-400 transition-colors" size={20} />
                  )}
                </button>
              </div>
            </td>

            {/* Title */}
            <td className="px-4 py-5">
              <div className="font-semibold text-gray-100 group-hover:text-white transition-colors duration-200 line-clamp-2">
                {task.title}
              </div>
            </td>

            {/* Description */}
            <td className="px-4 py-5">
              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200 line-clamp-2 leading-relaxed max-w-md">
                {task.description}
              </div>
            </td>

            {/* Tags */}
            <td className="px-4 py-5">
              <div className="flex justify-center items-center gap-1.5 flex-wrap">
                {task.tags && Array.isArray(task.tags) && task.tags.length > 0 ? (
                  task.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={`${task.id}-${tag}-${tagIndex}`}
                      className="inline-flex items-center h-7 px-3 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 text-xs font-medium capitalize text-emerald-300 backdrop-blur-sm transition-all duration-200 hover:from-emerald-500/30 hover:to-teal-500/30 hover:border-emerald-400/50 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                    >
                        {tag}
                      </span>
                  ))
                ) : (
                  <span className="text-xs text-gray-500">No tags</span>
                )}
                {task.tags && Array.isArray(task.tags) && task.tags.length > 3 && (
                  <span className="inline-flex items-center h-7 px-2 rounded-lg bg-gray-500/20 border border-gray-500/30 text-xs font-medium text-gray-400">
                      +{task.tags.length - 3}
                    </span>
                )}
              </div>
            </td>

            {/* Priority */}
            <td className="px-4 py-5">
              <div className="flex justify-center">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg ${getPriorityColor(task.priority)}`}>
                    <span className="text-sm">{getPriorityIcon(task.priority)}</span>
                    {task.priority || 'None'}
                  </span>
              </div>
            </td>

            {/* Actions */}
            <td className="px-4 py-5">
              <div className="flex items-center justify-center gap-2">
                <button
                  className="group/btn flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium transition-all duration-200 hover:bg-blue-500/20 hover:border-blue-400/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  onClick={() => onEdit(task)}
                  aria-label="Edit task"
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  className="group/btn flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-medium transition-all duration-200 hover:bg-red-500/20 hover:border-red-400/50 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-500/50"
                  onClick={() => onDelete(task.id, task.title)}
                  aria-label="Delete task"
                >
                  <svg className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};