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
    simulateFetchTasks()
      .then((data) => {
        setTasks(data);
        setStatus(data.length === 0 ? "empty" : "success");
      })
      .catch(() => setStatus("error"));
  }

  useEffect(() => {
    loadTasks();
  }, []);

  function handleAddTask(input: CreateTaskInput) {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, title: input.title, dueDate: input.dueDate, done: false },
    ]);
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
      <NewTaskForm onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
    </div>
  );
}

export default TaskBoard;
