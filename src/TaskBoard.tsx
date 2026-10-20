import { useEffect, useState } from "react";
import { z } from "zod";
import { TaskSchema } from "./schemas";
import type { Task } from "./schemas";
import TaskList from "./TaskList";
import NewTaskInput from "./NewTaskInput";
import FilterBar from "./FilterBar";
import type { Filter } from "./FilterBar";

const startTasks: Task[] = [
  { id: 1, title: "Read Chapter 3", done: false },
  { id: 2, title: "Build TaskCard", done: true },
  { id: 3, title: "Start TaskList", done: false },
];

function loadTasks(): Task[] {
  const saved = localStorage.getItem("tasks");
  if (saved === null) return startTasks;

  try {
    const result = z.array(TaskSchema).safeParse(JSON.parse(saved));
    return result.success ? result.data : startTasks;
  } catch {
    return startTasks;
  }
}

function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

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

  return (
    <div>
      <NewTaskInput onAddTask={handleAddTask} />
      <FilterBar filter={filter} onFilterChange={setFilter} />
      <TaskList tasks={tasks} filter={filter} onToggleTask={handleToggleTask} />
    </div>
  );
}

export default TaskBoard;
