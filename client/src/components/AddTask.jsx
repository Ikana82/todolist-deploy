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
  date,
  setDate,
  time,
  setTime,
  handleSubmit,
  onCancel,
  editId,
}) {
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-[#12151c] text-[#ebecf2] p-6 rounded shadow-md w-full max-w-md border-gray-300">
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

          {/*  Date */}
          <div className="relative">
            <input
              ref={dateRef}
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-2 pr-4 rounded focus:outline-none"
            />
          </div>

          {/* Time */}
          <div className="relative">
            <input
              ref={timeRef}
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border border-gray-300 p-2 pr-4 rounded focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#060ae2] text-[#ebecf2] px-4 py-2 rounded hover:bg-[#3539fb]"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default AddTask;
