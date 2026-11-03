import { useState } from "react";
import { CreateTaskSchema } from "./schemas";
import type { CreateTaskInput } from "./schemas";

type NewTaskFormProps = {
  onAddTask: (input: CreateTaskInput) => void;
};

function NewTaskForm({ onAddTask }: NewTaskFormProps) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = CreateTaskSchema.safeParse({ title, dueDate });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    onAddTask(result.data);
    setTitle("");
    setDueDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {errors.title && <p className="error">{errors.title[0]}</p>}
      </div>
      <div>
        <input value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        {errors.dueDate && <p className="error">{errors.dueDate[0]}</p>}
      </div>
      <button type="submit">Add task</button>
    </form>
  );
}

export default NewTaskForm;
