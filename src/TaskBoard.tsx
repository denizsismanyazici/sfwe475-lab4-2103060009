import { useEffect, useState } from "react";
import type { Task, CreateTaskInput } from "./schemas";
import { simulateFetchTasks } from "./mockApi";
import TaskList from "./TaskList";
import NewTaskForm from "./NewTaskForm";
import FilterBar from "./FilterBar";
import type { Filter } from "./FilterBar";

function TaskBoard() {
  const [status, setStatus] =
    useState<"loading" | "success" | "empty" | "error">("loading");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  function loadTasks() {
    const start = Date.now();

    simulateFetchTasks()
      .then((data) => {
        const wait = Math.max(0, 400 - (Date.now() - start));
        setTimeout(() => {
          setTasks(data);
          setStatus(data.length === 0 ? "empty" : "success");
        }, wait);
      })
      .catch(() => {
        const wait = Math.max(0, 400 - (Date.now() - start));
        setTimeout(() => setStatus("error"), wait);
      });
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleAddTask(input: CreateTaskInput) {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: input.title, dueDate: input.dueDate, done: false },
    ]);
    setStatus("success");
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <div>
      <div aria-live="polite">
        {status === "loading" && <p>Loading tasks...</p>}
        {status === "error" && <p>We couldn't load your tasks.</p>}
        {status === "empty" && <p>No tasks yet. Add your first one below.</p>}
      </div>

      {status === "error" && (
        <button onClick={() => { setStatus("loading"); loadTasks(); }}>
          Try again
        </button>
      )}

      {(status === "success" || status === "empty") && (
        <NewTaskForm onAddTask={handleAddTask} />
      )}

      {status === "success" && (
        <>
          <FilterBar filter={filter} onFilterChange={setFilter} />
          <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
        </>
      )}
    </div>
  );
}

export default TaskBoard;
