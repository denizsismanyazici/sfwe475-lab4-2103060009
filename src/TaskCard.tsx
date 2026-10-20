import { useState } from "react";
import type { Task } from "./schemas";
import TaskCheckbox from "./TaskCheckbox";

type TaskCardProps = Pick<Task, "title" | "done" | "dueDate">;

function TaskCard({ title, done: initialDone, dueDate }: TaskCardProps) {
  const [done, setDone] = useState(initialDone);

  return (
    <div className="task-card">
      <h3>{title}</h3>
      <TaskCheckbox done={done} onToggle={() => setDone(!done)} />
      {dueDate && <p>Due: {dueDate}</p>}
    </div>
  );
}

export default TaskCard;
