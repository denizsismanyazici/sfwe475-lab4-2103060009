# Lab 4 Reflection

## 1. Why can't FilterBar and TaskList share filter state directly? (Strand 3)

FilterBar and TaskList are siblings and in react data only goes down from parent to child. so one cant see the others state. we put filter in TaskBoard (their parent) and it passes it down to both.

## 2. What would go wrong if TaskList used the array index as the key? (Strand 2)

when we filter or add tasks the indexes change, so the same key can point to a different task. react reuses the old card for it, so if the card has its own state (like the checkbox in strand 1) the tick shows on the wrong task.

## 3. "props flow down, requests flow up" in my TaskBoard app (Strand 3)

down: TaskBoard sends tasks and filter to TaskList, and TaskList sends title and done to TaskCard. up: when I click Add, NewTaskInput calls onAddTask, and when I tick a checkbox TaskCard calls onToggle, then TaskBoard changes the state.

Lab 5 reflection

1
empty means it worked but there is 0 tasks, error means it failed. empty shows a friendly message and the form, error shows we couldnt load and a try again button.

2
bcs each box can have its own problem. this way the error shows right under the box that is wrong.

3
aria-live makes the screen reader read the change out loud. a screen reader user cant see the screen change so without it they wouldnt know.
