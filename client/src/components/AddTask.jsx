import { faTasks } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function AddTask() {
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
    editId;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex item-center justify-center">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
          <h2 className="text-xl font-bold mb-2">
            {editId ? "Edit Task" : "Add New List"}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Fill in the form below to {editId ? "update" : "create"} your task.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Task Name*"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="9:00 AM - 10:00 AM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2"
            ></textarea>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {editId ? "Update" : "Add New"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTask;
