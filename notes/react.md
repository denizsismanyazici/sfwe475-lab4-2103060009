# Lab 4 Notes

## 1. title (prop) vs done (state)

title is a prop, so it comes from the parent (App) and TaskCard can only read it. done is state now, the done prop only gives the starting value and after that TaskCard keeps it with useState and changes it with setDone when the checkbox is clicked. TaskCard can't change title bcs it belongs to the parent, but done belongs to TaskCard so it can change it.

## 2. Why key={index} is risky

react uses the key to know which card is which. if we use the index and the list gets reordered or filtered the indexes change, so react mixes up the cards and the wrong card can keep the old state (like a checkbox ticked on the wrong task). task.id always stays with the same task so this doesnt happen.

## 3. Removing onChange

when I removed onChange I couldnt type, nothing showed up in the box. value comes from text but nothing was changing text anymore so it stayed empty. console also gave a warning: value prop without onChange handler, so the field is read-only.

## 4. The round trip of one click

TaskBoard owns the tasks state. NewTaskInput asks for the change. when I click Add it calls onAddTask, which is handleAddTask from TaskBoard. it adds the task with setTasks and the new card shows up.
