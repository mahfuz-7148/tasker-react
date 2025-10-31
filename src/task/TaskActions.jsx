export default function TaskActions({ onAddClick, onDeleteAllClick }) {
  return (
    <div className="mb-14 items-center justify-between sm:flex">
      {/* Title with subtle gradient */}
      <div className="max-sm:mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
          Your Tasks
        </h2>
        <div className="mt-1 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Add Task Button */}
        <button
          className="
                        group relative overflow-hidden
                        rounded-lg bg-gradient-to-r from-blue-500 to-blue-600
                        px-5 py-2.5
                        text-sm font-semibold text-white
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-blue-500/40
                        hover:scale-105
                        active:scale-95
                        flex items-center gap-2
                    "
          onClick={onAddClick}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Plus Icon */}
          <svg
            className="h-4 w-4 transition-transform group-hover:rotate-90 duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add Task</span>
        </button>

        {/* Delete All Button */}
        <button
          className="
                        group relative overflow-hidden
                        rounded-lg bg-gradient-to-r from-red-500 to-red-600
                        px-5 py-2.5
                        text-sm font-semibold text-white
                        transition-all duration-300
                        hover:shadow-lg hover:shadow-red-500/40
                        hover:scale-105
                        active:scale-95
                        flex items-center gap-2
                        ring-1 ring-red-400/20
                    "
          onClick={onDeleteAllClick}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Trash Icon */}
          <svg
            className="h-4 w-4 transition-transform group-hover:scale-110 duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span>Delete All</span>
        </button>
      </div>
    </div>
  );
}