import { useEffect, useState } from "react";
import type { Task } from "./schemas";
import { simulateFetchTasks } from "./mockApi";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
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

  function handleAddTask(title: string) {
    setTasks([...tasks, { id: tasks.length + 1, title, done: false }]);
  }

  function handleToggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  if (status === "loading") return <p>Loading tasks...</p>;
  if (status === "error") {
    return (
      <div>
        <p>We couldn't load your tasks.</p>
        <button onClick={() => { setStatus("loading"); loadTasks(); }}>
          Try again
        </button>
      </div>
    );
  }
  if (status === "empty") return <p>No tasks yet. Add your first one below.</p>;

  return (
    <div>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
    </div>
  );
}

export default TaskBoard;
