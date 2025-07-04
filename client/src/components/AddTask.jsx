import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

function AddTask({
  task,
  setTask,
  description,
  setDescription,
  dueDate,
  setDueDate,
  time,
  setTime,
  handleSubmit,
  onCancel,
  editId,
}) {
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-gray-700 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Task" : "Add New Task"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <input
            type="text"
            placeholder="Task title"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-2 rounded"
          ></textarea>

          {/* Due Date */}
          <div className="relative">
            <input
              ref={dateRef}
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border border-gray-300 p-2 pr-12 rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={() => dateRef.current?.showPicker()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
            </button>
          </div>

          {/* Time */}
          <div className="relative">
            <input
              ref={timeRef}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 p-2 pr-12 rounded focus:outline-none"
            />
            <button
              type="button"
              onClick={() => timeRef.current?.showPicker()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={faClock} />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTask;
